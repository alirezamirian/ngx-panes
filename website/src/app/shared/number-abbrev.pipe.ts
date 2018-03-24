import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberAbbrev'
})
export class NumberAbbrevPipe implements PipeTransform {

  transform(value: number, args?: any): number | string {
    if (value >= 1000) {
      const suffixes = ['', 'k', 'm', 'b', 't'];
      const suffixNum = Math.floor(('' + value).length / 3);
      let shortValue: number;
      for (let precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
        const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      return (shortValue % 1 !== 0) ? shortValue.toFixed(1) : shortValue + suffixes[suffixNum];
    }
    return value;
  }

}
