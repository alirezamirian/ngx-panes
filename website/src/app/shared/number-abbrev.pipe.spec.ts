import {NumberAbbrevPipe} from './number-abbrev.pipe';

describe('NumberAbbrevPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberAbbrevPipe();
    expect(pipe).toBeTruthy();
  });
});
