import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantComponent } from './assistant/assistant.component';
import { ResourceComponent } from './resource.component';
import { PhotographerComponent } from './photographer/photographer.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PhotoScheduleComponent } from './photo-schedule/photo-schedule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhotoScheduleResolver } from './photo-schedule/photo-schedule.resolver';
import { SharedModule } from 'app/shared/components/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SalaryComponent } from './salary/salary.component';
import { PhotographerDetailComponent } from './photographer/photographer-detail/photographer-detail.component';



const routes: Routes = [
  {
    path: '',
    component: ResourceComponent,
    children: [
      {
        path: 'photographers',
        component: PhotographerComponent,
      },
      {
        path: 'salary',
        component: SalaryComponent,
      },
      {
        path: 'photographers/schedule',
        component: PhotoScheduleComponent,
        resolve: {
          schedule: PhotoScheduleResolver
        }
      },
      {
        path: 'photographers/:id',
        component: PhotographerDetailComponent,
      },
      {
        path: 'financial/statistic',
        component: PhotographerDetailComponent,
      },
      {
        path: 'assistants',
        component: AssistantComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AssistantComponent,
    ResourceComponent,
    PhotographerComponent,
    PhotoScheduleComponent,
    SalaryComponent,
    PhotographerDetailComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    TabViewModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PhotoScheduleResolver
  ]
})
export class ResourceModule { }
