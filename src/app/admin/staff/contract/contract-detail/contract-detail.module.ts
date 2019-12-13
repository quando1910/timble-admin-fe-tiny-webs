import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/shared/components/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { ContractDetailComponent } from './contract-detail.component';
import { DetailComponent } from './detail/detail.component';
import { MembersContractComponent } from './members/members.component';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentComponent } from './payment/payment.component';
import { CostumeContractComponent } from './costume/costume.component';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

const routes: Routes = [
  {
    path: '',
    component: ContractDetailComponent
  },
];

@NgModule({
  declarations: [
    ContractDetailComponent,
    CostumeContractComponent,
    DetailComponent,
    PaymentComponent,
    MembersContractComponent
  ],
  imports: [
    NgMultiSelectDropDownModule,
    NgbModule,
    CommonModule,
    RadioButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TableModule,
    TabViewModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class ContractDetailModule { }
