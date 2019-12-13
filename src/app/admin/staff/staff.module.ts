import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { staffRoutes } from './staff.routing';
import { StaffComponent } from './staff.component';

const routes: Routes = [
  ...staffRoutes
];

@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class StaffModule { }
