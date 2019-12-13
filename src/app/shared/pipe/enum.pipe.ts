import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'enum'})
export class EnumPipe implements PipeTransform {

  transform(value: any, enums: any): any {
    return enums[value];
  }
}
