import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewContractComponent } from './new-contract/new-contract.component';
import { PhotoPlanComponent } from './photo-plan/photo-plan.component';
import { SearchContractComponent } from './search-contract/search-contract.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/shared/components/shared.module';
import { PlanTabComponent } from './new-contract/plan-tab/plan-tab.component';
import { ContractScheduleComponent } from './schedule/schedule.component';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: '',
    component: NewContractComponent,
  },
  {
    path: 'photo-plan',
    component: PhotoPlanComponent
  },
  {
    path: 'schedule',
    component: ContractScheduleComponent
  },
  {
    path: 'search',
    component: SearchContractComponent
  },
  {
    path: ':id',
    loadChildren: () => import('./contract-detail/contract-detail.module').then(m => m.ContractDetailModule)
  },
];

@NgModule({
  declarations: [
    PhotoPlanComponent,
    NewContractComponent,
    SearchContractComponent,
    PlanTabComponent,
    ContractScheduleComponent
  ],
  imports: [
    NgMultiSelectDropDownModule,
    NgbModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TableModule,
    TabViewModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class ContractModule { }
