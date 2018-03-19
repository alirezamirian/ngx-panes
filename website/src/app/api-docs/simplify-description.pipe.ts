import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'simplifyDescription'
})
export class SimplifyDescriptionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const div = document.createElement('div');
    div.innerHTML = value;
    value = div.innerText;
    const limit = 100;
    if (value.length < limit) {
      return value;
    } else {
      let cutPoint = value.substr(0, limit).lastIndexOf(' ');
      if (cutPoint === -1) {
        cutPoint = limit;
      }
      return `${value.substr(0, cutPoint)}${'...'}`;
    }
  }

}
