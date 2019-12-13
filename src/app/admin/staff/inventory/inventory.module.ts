import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { NewContractRentalComponent } from './new-contract-rental/new-contract-rental.component';
import { HiringComponent } from './hiring/hiring.component';
import { Routes, RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { RentalInfoComponent } from './new-contract-rental/rental-info/rental-info.component';
import { RenterComponent } from './new-contract-rental/renter/renter.component';
import { RentalSummaryComponent } from './new-contract-rental/rental-summary/rental-summary.component';
import { SharedModule } from 'app/shared/components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HiringDetailComponent } from './hiring-detail/hiring-detail.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: '',
        component: NewContractRentalComponent
      },
      {
        path: 'statistical',
        component: StatisticalComponent
      },
      {
        path: 'hiring',
        component: HiringComponent
      },
      {
        path: 'hiring/:id',
        component: HiringDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    InventoryComponent,
    HiringDetailComponent,
    StatisticalComponent,
    NewContractRentalComponent,
    HiringComponent,
    RentalSummaryComponent,
    RentalInfoComponent,
    RenterComponent
  ],
  imports: [
    StepsModule,
    SharedModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InventoryModule { }
