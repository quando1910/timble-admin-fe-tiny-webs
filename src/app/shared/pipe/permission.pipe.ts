import { Pipe, PipeTransform } from '@angular/core';
import { AdminEnum } from '../enum/admin.enum';

@Pipe({name: 'can'})
export class PermissionPipe implements PipeTransform {

  // aspect: payment, action: update
  /*
    show, update, create, delete, list
  */
  permission = {
    'SUBADMIN': {
      'payment': {
        'update': false,
        'show': true
      },
      'member': {
        'list': true
      }
    },
    'PHOTOGRAPHER': {
      'payment': {
        'update': false,
        'show': false
      },
      'member': {
        'list': false
      }
    }
  };

  transform(aspect: any, action: any): any {
    const role = AdminEnum[JSON.parse(localStorage.getItem('USER')).role];
    if (role === 'ADMIN') {
      return true;
    } else {
      return this.permission[role][aspect][action];
    }
  }
}
