import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFormComponent } from './new-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
	declarations: [
    NewFormComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RadioButtonModule,
    ReactiveFormsModule,
    CalendarModule
  ],
	exports: [
		NewFormComponent,
	],
})
export class NewFormModule { }
