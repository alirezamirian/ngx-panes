/**
 * Created by alireza on 5/16/17.
 */

export type RelativeAlign = 'start'|'end'|'top'|'bottom';
export type Align = 'left'|'right'|'top'|'bottom';
export type Dir = 'rtl'|'ltr';

const _toRelativeAlignMap = {
  rtl: {
    left: 'end',
    right: 'start',
    start: 'start',
    end: 'end',
    top: 'top',
    bottom: 'bottom'
  },
  ltr: {
    left: 'start',
    right: 'end',
    start: 'start',
    end: 'end',
    top: 'top',
    bottom: 'bottom'
  }
};
const _toAlignMap = {
  rtl: {
    left: 'left',
    right: 'right',
    start: 'right',
    end: 'left',
    top: 'top',
    bottom: 'bottom'
  },
  ltr: {
    left: 'left',
    right: 'right',
    start: 'left',
    end: 'right',
    top: 'top',
    bottom: 'bottom'
  }
};


export const toRelativeAlign = function(align: Align|RelativeAlign, dir: Dir): RelativeAlign{
  return <RelativeAlign> _toRelativeAlignMap[dir][align];
};

export const toAlign = function(relativeAlign: RelativeAlign|Align, dir: Dir): Align{
  return <Align> _toAlignMap[dir][relativeAlign];
};
