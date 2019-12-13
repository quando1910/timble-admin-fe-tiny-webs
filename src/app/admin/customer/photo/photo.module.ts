import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo.component';
import { PhotoSelectionComponent } from './photo-selection/photo-selection.component';
import { PhotoInfoComponent } from './info/info.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PhotoComponent,
    children: [
      {
        path: 'info',
        component: PhotoInfoComponent
      },
      {
        path: 'select',
        component: PhotoSelectionComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    PhotoComponent,
    PhotoInfoComponent,
    PhotoSelectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PhotoModule { }
