import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './admin.routing';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AdminComponent } from './admin/admin.component';
import { ChartsModule } from '../charts/charts.module';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
	imports: [
	CommonModule,
	routing,
	NgxEchartsModule,
	LayoutModule,
	RichTextEditorAllModule,
	NgbModule,
	FullCalendarModule,
	ChartsModule,
	PagesModule,
	RouterModule
	],
	declarations: [
		AdminComponent,
	]
})
export class AdminModule { }
