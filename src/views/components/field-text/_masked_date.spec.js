import { expect } from 'chai';
//import 'babel-plugin-rewire';

import createMaskForDate from './_masked_date';

describe('checkDay (F)', () => {
  it(`if first number < 4 then true`, () => {
    const checkDay = createMaskForDate.checkDay;
    expect(checkDay(1,0,[])).to.eql(true);
  });

  it(`if first number >= 4 then false`, () => {
    const checkDay = createMaskForDate.checkDay;
    expect(checkDay(4,0,[])).to.eql(false);
  });

  it(`if first number is 0 and second number is 0 then false`, () => {
    const checkDay = createMaskForDate.checkDay;
    expect(checkDay(0,1,[0])).to.eql(false);
  });

  it(`if first number is 0 and second number > 0 then true`, () => {
    const checkDay = createMaskForDate.checkDay;
    expect(checkDay(2,1,[0])).to.eql(true);
  });

  it(`if first number is 2 and second number is 0 then true`, () => {
    const checkDay = createMaskForDate.checkDay;
    expect(checkDay(0,1,[2])).to.eql(true);
  });

  it(`if first number is 3 and second number < 2 then true`, () => {
    const checkDay = createMaskForDate.checkDay;
    expect(checkDay(1,1,[3])).to.eql(true);
  });

  it(`if first number is 3 and second number <= 2 then false`, () => {
    const checkDay = createMaskForDate.checkDay;
    expect(checkDay(1,1,[3])).to.eql(true);
  });

});
