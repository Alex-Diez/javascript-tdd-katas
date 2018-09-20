import {should} from 'chai';

import Calculator from '../kata';

should();

describe('string calculator', () => {
  it('computes a single number', () => {
    return Calculator.compute('5')
        .then(({number}) => number.should.eq(5));
  });

  it('computes an addition', () => {
    return Calculator.compute('4+4')
        .then(({number}) => number.should.eq(4 + 4));
  });

  it('computes a subtraction', () => {
    return Calculator.compute('10-3')
        .then(({number}) => number.should.eq(10 - 3));
  });

  it('computes a multiplication', () => {
    return Calculator.compute('4*8')
        .then(({number}) => number.should.eq(4 * 8));
  });

  it('computes a division', () => {
    return Calculator.compute('40/5')
        .then(({number}) => number.should.eq(40 / 5));
  });

  it('computes multiple operations', () => {
    return Calculator.compute('4+3*9-42/6')
        .then(({number}) => number.should.eq(4 + 3 * 9 - 42 / 6));
  });
});
