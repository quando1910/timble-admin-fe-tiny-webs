import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import { CommonService } from 'app/core/services/common.service';

export interface Budget {
  content: string;
  type: any;
  quantity: number;
  id: number;
  price: number;
  note: string;
  total: number;
}

export interface Billing {
  deposit: number;
  paymentStatus: number;
  info: any;
  budgets: Array<Budget>;
}

export class PaymentContract {
  constructor(obj, status, paid_at = null) {
    const temp = {};
    if (obj) {
      temp['budgets_attributes'] = obj;
    }
    if (status) {
      temp['payment_status'] = status;
    }
    if (paid_at) {
      temp['paid_at'] = paid_at;
    }
    return temp;
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {

  billingInfo: Billing = {
    budgets: [],
    deposit: 0,
    paymentStatus: 0,
    info: {}
  };
  packages: any;
  // 0: Lock, 1: Verified, 2: , 3: success
  status: Number = 0;
  discount = 0;
  currentDate = new Date();

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.api.get(['contracts', this.route.snapshot.params.id]).subscribe((data: any) => {
      this.billingInfo.deposit = data.contract.deposit;
      this.billingInfo.paymentStatus = data.contract.payment_status;
      this.billingInfo.info = data.contract;
      data.contract.budgets.forEach(x => {
        if (x.budgetable.kind_package !== 4) {
          const obj: Budget = {
            content: x.budgetable.name,
            type: x.budgetable_type,
            quantity: x.quantity,
            id: x.id,
            price: x.price,
            note: x.note,
            total: x.quantity * x.price,
          };
          this.status = data.contract.payment_status;
          this.billingInfo.budgets.push(obj);
        }
      });
    });
  }

  filterBugets(type) {
    return this.billingInfo.budgets.filter(x => x.type === type);
  }

  calcTotal() {
    return this.billingInfo.budgets.reduce((x, y) => (x + y.price * y.quantity), 0);
  }

  verifyContract() {
    this.api.put(
      `contracts/${this.route.snapshot.params.id}`,
      new PaymentContract(this.billingInfo.budgets, 1)).subscribe(
      data => {
        this.status = 1;
        this.toastr.success('Xác thực thông tin thanh toán thành công!', undefined, {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      },
      err => {
        this.toastr.error('Lỗi xác nhận!', undefined, {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }
    );
  }

  lockContract() {
    this.api.put(
      `contracts/${this.route.snapshot.params.id}`,
      new PaymentContract(null, 0)).subscribe(
      data => {
        this.status = 0;
        this.toastr.success('Khóa thanh toán thành công!', undefined, {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      },
      err => {
        this.toastr.error('Lỗi khóa!', undefined, {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }
    );
  }

  paymentContract() {
    const r = confirm(`Bạn có muốn thanh toán hợp đồng này không?`);
    if (r) {
      this.api.put(
        `contracts/${this.route.snapshot.params.id}`,
        new PaymentContract(this.billingInfo.budgets, 3, new Date())).subscribe(
        data => {
          this.toastr.success('Thanh toán thành công!', undefined, {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        },
        err => {
          this.toastr.error('Lỗi Thanh toán!', undefined, {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        }
      );
    }
  }

  createHeaders(keys) {
    const result = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push({
        'id' : keys[i],
        'name': keys[i],
        'prompt': keys[i],
        'width': 65,
        'align': 'center',
        'padding': 0
      });
    }
    return result;
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = url;
    });
  }

  print() {
    console.log(this.billingInfo.budgets);
    this.loadImage('../../../../../../assets/img/logo-main-black_400.png').then((logo) => {
      const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });
      doc.addImage(logo, 'PNG', 10, 10, 50, 7);
      doc.setFontSize(10);
      // Left Header
      doc.text('Address: 42-43 Tong Phuoc Pho - Hai Chau Dist. - Da Nang', 10, 20);
      doc.text('Tel: (+84)773.420.210', 10, 25);
      doc.text('FB: https://fb.com/classic.yearbook', 10, 30);
      doc.text('Web: http://theclassic.studio', 10, 35);
      // Right Header
      doc.setFontSize(25);
      doc.text('eBilling', 140, 20);
      doc.setFontSize(10);
      doc.text('HOA DON THANH TOAN', 135, 25);
      doc.setFontSize(15);
      doc.text(`#${this.billingInfo.info.id}`, 280, 15, null, null, 'right');
      doc.setFontSize(10);
      doc.text(`${this.billingInfo.info.code}`, 280, 22, null, null, 'right');
      doc.setFont('LovestorySERIF');
      doc.text(`${this.billingInfo.info.member.name}`, 280, 29, null, null, 'right');
      doc.text(`${this.billingInfo.info.member.phone_number}`, 280, 36, null, null, 'right');
      doc.setFontSize(15);
      doc.text(`${this.billingInfo.info.group} - ${this.billingInfo.info.school.name}`, 145, 50, null, null, 'center');
      // Draw table
      // const headers = this.createHeaders(['id', 'content', 'note', 'quantity', 'price', 'total']);
      // doc.table(10, 40, this.generateData(), headers, { autoSize: true });
      doc.setFontSize(10);
      doc.autoTable({
        startY: 60,
        theme: 'grid',
        styles: {
          font: 'LovestorySERIF'
        },
        head: [['id', 'content', 'note', 'quantity', 'price', 'total']],
        body: this.generateData()
      });
      doc.text(`Chữ ký khách hàng`, 20, 160);
      doc.text(`Chữ ký đại diện studio`, 90, 160);
      doc.text(`Tổng tiền: ${this.calcTotal()}`, 280, 160, null, null, 'right');
      doc.text(`Đặt cọc: ${this.billingInfo.deposit}`, 280, 165, null, null, 'right');
      doc.setFontSize(15);
      doc.text(`Còn lại: ${this.calcTotal() - this.billingInfo.deposit}`, 280, 175, null, null, 'right');
      doc.save('report.pdf');
    });
  }

  generateData() {
    return this.billingInfo.budgets.map((x, i) => ([
      (i + 1).toString(),
      x.content.toString(),
      x.note,
      x.quantity.toString(),
      x.price.toString(),
      (+x.quantity * +x.price).toString()
    ]));
  }

}
