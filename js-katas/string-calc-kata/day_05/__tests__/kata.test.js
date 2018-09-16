import {should} from 'chai';

import Calculator from '../kata';

should();

describe('string calculator', () => {
  it('computes a single number', () => {
    return Calculator.compute('5')
        .then(({number}) => number.should.eq(5));
  });

  it('computes addition', () => {
    return Calculator.compute('4+4')
        .then(({number}) => number.should.eq(4 + 4));
  });

  it('computes subtraction', () => {
    return Calculator.compute('10-3')
        .then(({number}) => number.should.eq(10 - 3));
  });

  it('computes multiplication', () => {
    return Calculator.compute('5*2')
        .then(({number}) => number.should.eq(5 * 2));
  });

  it('computes division', () => {
    return Calculator.compute('12/2')
        .then(({number}) => number.should.eq(12 / 2));
  });

  it('computes multiple operations', () => {
    return Calculator.compute('3+4*2-63/9')
        .then(({number}) => number.should.eq(3 + 4 * 2 - 63 / 9));
  });
});
