import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandler {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  public handleError(err: any) {
    if (err.status === 401 && localStorage.getItem('ACCESS_TOKEN')) {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('CLIENT');
      localStorage.removeItem('UID');
      localStorage.removeItem('MEMBER');
      location.reload();
    }
  //   if (err.status === 0) {
  //     const dialogRef = this.dialog.open(DialogComponent, {});
  //     dialogRef.componentInstance.type = 'msg_refresh_dlg';
  //   } else if (err.status === 401) {
  //     if (!this.dialog.openDialogs.length) {
  //       this.auth.logout();
  //       const dialogRef = this.dialog.open(DialogComponent, {});
  //       dialogRef.componentInstance.type = 'msg_auth_dlg';
  //     }
  //   } else if (err.status === 404) {
  //     if (!this.dialog.openDialogs.length) {
  //       const dialogRef = this.dialog.open(DialogComponent, {});
  //       dialogRef.componentInstance.type = 'msg_404_dlg';
  //     }
  //   } else if (err.status === 403) {
  //     if (!this.dialog.openDialogs.length) {
  //       const dialogRef = this.dialog.open(DialogComponent, {
  //         data: err.error.errors
  //       });
  //       dialogRef.componentInstance.type = 'custom_msg_dlg';
  //     }
  //   } else if (err.status === 500) {
  //     const dialogRef = this.dialog.open(DialogComponent, {});
  //     dialogRef.componentInstance.type = 'msg_refresh_dlg';
  //   } else if (err.status === 422 && this.router.url !== '/auth/login') {
  //     const dialogRef = this.dialog.open(DialogComponent, {});
  //     dialogRef.componentInstance.type = 'msg_sys_dlg';
  //   }
  }
}
