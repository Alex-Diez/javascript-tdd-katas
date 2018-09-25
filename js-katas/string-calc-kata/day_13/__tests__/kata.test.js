import {should} from 'chai';

import Calculator from '../kata';

should();

describe('string calculator', () => {
  it('does nothing', () => {

  });

  it('computes a single number', () => {
    return Calculator.compute('4')
        .then(({number}) => number.should.eq(4));
  });

  it('computes an addition', () => {
    return Calculator.compute('4+1')
        .then(({number}) => number.should.eq(4 + 1));
  });

  it('computes a subtraction', () => {
    return Calculator.compute('3-1')
        .then(({number}) => number.should.eq(3 - 1));
  });

  it('computes a multiplication', () => {
    return Calculator.compute('4*9')
        .then(({number}) => number.should.eq(4 * 9));
  });

  it('computes a division', () => {
    return Calculator.compute('45/5')
        .then(({number}) => number.should.eq(45 / 5));
  });

  it('computes multiple operations', () => {
    return Calculator.compute('4+3*9-32/4')
        .then(({number}) => number.should.eq(4 + 3 * 9 - 32 / 4));
  });
});
