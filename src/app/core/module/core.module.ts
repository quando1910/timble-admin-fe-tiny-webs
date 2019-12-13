import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AuthGuard } from '../services/auth/auth-guard';
import { INTERCEPTORS } from '../services/interceptors';
import { ApiService } from '../services/api/api.service';
import { PicturesService } from '../services/pictures.service';


import { ErrorHandler } from '../services/interceptors/error-handler';

const AUTH_PROVIDERS = [
  AuthService,
  AuthGuard,
];

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ApiService,
        PicturesService,
        AUTH_PROVIDERS,
        INTERCEPTORS,
        ErrorHandler
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
