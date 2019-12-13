import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostumeComponent } from './costume.component';
import { PlanComponent } from './plan/plan.component';
import { SizeComponent } from './size/size.component';
import { RentalStatusComponent } from './rental-status/rental-status.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
  {
    path: '',
    component: CostumeComponent,
    children: [
      {
        path: 'retal-status',
        component: RentalStatusComponent
      },
      {
        path: 'try',
        component: SizeComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    CostumeComponent,
    PlanComponent,
    SizeComponent,
    RentalStatusComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CostumeModule { }
