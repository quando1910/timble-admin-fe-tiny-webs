import { Component,
         OnDestroy,
         OnInit,
         Input,
         EventEmitter,
         Output,
         ElementRef,
         ViewChild,
         ChangeDetectorRef,
        } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
})

export class NewFormComponent implements OnInit {
  @Input() title: string;
  @Input() inputForm: FormGroup;
  @Input() renderView: any;
  @Output('submitForm') submitEmitter = new EventEmitter();
  // @Output('selectFile') selectFiletEmitter = new EventEmitter();

  dataForm: FormGroup;
  submitted = false;
  shop: any;
  dateTime: any;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.dataForm = this.inputForm;
  }

  get f() { return this.dataForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }
    this.submitEmitter.emit(this.dataForm.value);
  }


  // selectedFile(event) {
  //   this.linkInput.nativeElement.value = null;
  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     this.selectFiletEmitter.emit(file);
  //   }
  // }

}
