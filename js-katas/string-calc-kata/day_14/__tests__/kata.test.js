import {should} from 'chai';

import Calculator from '../kata';

should();

describe('string calculator', () => {
  it('computes a single number', () => {
    return Calculator.compute('4')
        .then(({number}) => number.should.eq(4));
  });

  it('computes an addition', () => {
    return Calculator.compute('4+1')
        .then(({number}) => number.should.eq(4 + 1));
  });

  it('computes a subtraction', () => {
    return Calculator.compute('5-1')
        .then(({number}) => number.should.eq(5 - 1));
  });

  it('computes a multiplication', () => {
    return Calculator.compute('5*8')
        .then(({number}) => number.should.eq(5 * 8));
  });

  it('computes a division', () => {
    return Calculator.compute('45/5')
        .then(({number}) => number.should.eq(45 / 5));
  });

  it('computes multiple operations', () => {
    return Calculator.compute('4+3*8-81/9')
        .then(({number}) => number.should.eq(4 + 3 * 8 - 81 / 9));
  });
});
