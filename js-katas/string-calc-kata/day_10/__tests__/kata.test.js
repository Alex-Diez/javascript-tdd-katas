import {should} from 'chai';

import Calculator from '../kata';

should();

describe('string calculator', () => {
  it('computes a single number', () => {
    return Calculator.compute('4')
        .then(({number}) => number.should.eq(4));
  });

  it('computes an addition', () => {
    return Calculator.compute('4+3')
        .then(({number}) => number.should.eq(4 + 3));
  });

  it('computes a subtraction', () => {
    return Calculator.compute('10-1')
        .then(({number}) => number.should.eq(10 - 1));
  });

  it('computes a multiplication', () => {
    return Calculator.compute('4*8')
        .then(({number}) => number.should.eq(4 * 8));
  });

  it('computes a division', () => {
    return Calculator.compute('36/6')
        .then(({number}) => number.should.eq(36 / 6));
  });

  it('computes multiple operations', () => {
    return Calculator.compute('4+3*8-9/3')
        .then(({number}) => number.should.eq(4 + 3 * 8 - 9 / 3));
  })
});
