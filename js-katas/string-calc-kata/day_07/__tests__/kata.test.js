import {should} from 'chai';

import Calculator from '../kata';

should();

describe('string calculator', () => {
  it('computes a single number', () => {
    return Calculator.compute('5')
        .then(({number}) => number.should.eq(5))
  });

  it('computes an addition', () => {
    return Calculator.compute('4+6')
        .then(({number}) => number.should.eq(4 + 6));
  });

  it('computes a subtraction', () => {
    return Calculator.compute('5-1')
        .then(({number}) => number.should.eq(5 - 1));
  });

  it('computes a multiplication', () => {
    return Calculator.compute('5*4')
        .then(({number}) => number.should.eq(5 * 4));
  });

  it('computes a division', () => {
    return Calculator.compute('20/5')
        .then(({number}) => number.should.eq(20 / 5));
  });

  it('computes multiple operations', () => {
    return Calculator.compute('4+3*8-49/7')
        .then(({number}) => number.should.eq(4 + 3 * 8 - 49 / 7));
  });
});
