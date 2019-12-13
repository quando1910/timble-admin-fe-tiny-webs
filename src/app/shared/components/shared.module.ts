import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from './tab/tabs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewFormModule } from './new-form/new-form.module';
import { EnumPipe } from '../pipe/enum.pipe';
import { PermissionPipe } from '../pipe/permission.pipe';
import { AlertMessageModule } from './alert-message/alert-message.module';


const PIPES = [
  EnumPipe,
  PermissionPipe
];

@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    AlertMessageModule,
    NewFormModule,
  ],
  exports: [
    TabsModule,
    AlertMessageModule,
    NewFormModule,
    CommonModule,
    ...PIPES
  ],
  declarations: [
    ...PIPES
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}

