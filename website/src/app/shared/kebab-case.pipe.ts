import {Pipe, PipeTransform} from '@angular/core';
import {kebabCase} from 'lodash';

@Pipe({
  name: 'kebabCase'
})
export class KebabCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    return kebabCase(value);
  }

}
