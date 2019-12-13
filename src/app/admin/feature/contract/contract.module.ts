import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { ContractInfoComponent } from './info/info.component';
import { PaymentComponent } from './payment/payment.component';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { SharedModule } from 'app/shared/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ContractComponent,
    children: [
      {
        path: '',
        component: ContractInfoComponent
      },
      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ContractComponent,
    ContractInfoComponent,
    PaymentComponent,
    MembersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ContractModule { }
