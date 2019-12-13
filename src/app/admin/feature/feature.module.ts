import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { featureRoutes } from './feature.routing';

const routes: Routes = [
  ...featureRoutes
];

@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FeatureModule { }
