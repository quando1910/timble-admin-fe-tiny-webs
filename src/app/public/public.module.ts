import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { PublicContractComponent } from './contracts/public-contract.component';
import { routing } from './public.routing';
import { PrivateTermComponent } from './private-term/private-term.component';
import { ServiceTermComponent } from './service-term/service-term.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'contracts/:id', component: PublicContractComponent, data: { title: 'Login :: Lucid Angular' } },
      { path: '/chinh-sach-bao-mat', component: PrivateTermComponent, data: { title: 'CHÍNH SÁCH QUYỀN RIÊNG TƯ | ClassicStudio' } },
      { path: '/dieu-khoan-dich-vu', component: ServiceTermComponent, data: { title: 'ĐIỀU KHOẢN DỊCH VỤ | ClassicStudio' } },
    ]
  }
];

@NgModule({
  declarations: [
    PublicComponent,
    ServiceTermComponent,
    PrivateTermComponent,
    PublicContractComponent
  ],
  imports: [
    CommonModule,
    routing,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
