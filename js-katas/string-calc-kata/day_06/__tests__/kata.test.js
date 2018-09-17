import {should} from 'chai';

import Calculator from '../kata';

should();

describe('string calculator', () => {
  it('computes a single number', () => {
    return Calculator.compute('4')
        .then(({number}) => number.should.eq(4));
  });

  it('computes addition', () => {
    return Calculator.compute('4+3')
        .then(({number}) => number.should.eq(4 + 3));
  });

  it('computes subtraction', () => {
    return Calculator.compute('6-1')
        .then(({number}) => number.should.eq(6 - 1));
  });

  it('computes multiplication', () => {
    return Calculator.compute('2*3')
        .then(({number}) => number.should.eq(2 * 3));
  });

  it('computes division', () => {
    return Calculator.compute('15/5')
        .then(({number}) => number.should.eq(15 / 5));
  });

  it('computes multiple operations', () => {
    return Calculator.compute('4+12/3-5*2')
        .then(({number}) => number.should.eq(4 + 12 / 3 - 5 * 2));
  });

  it('computes operations with parenthesis', () => {
    return Calculator.compute('(4+3)*2-21/(2+1)')
        .then(({number}) => number.should.eq((4 + 3) * 2 - 21 / (2 + 1)));
  });
});
