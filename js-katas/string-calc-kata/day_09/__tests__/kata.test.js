import {should} from 'chai';

import Calculator from '../kata'

should();

describe('string calculator', () => {
  it('computes a single number', () => {
    return Calculator.compute('7')
        .then(({number}) => number.should.eq(7));
  });

  it('computes an addition', () => {
    return Calculator.compute('4+9')
        .then(({number}) => number.should.eq(4 + 9));
  });

  it('computes a subtraction', () => {
    return Calculator.compute('111-3')
        .then(({number}) => number.should.eq(111 - 3));
  });

  it('computes a multiplication', () => {
    return Calculator.compute('4*8')
        .then(({number}) => number.should.eq(4 * 8));
  });

  it('computes a division', () => {
    return Calculator.compute('49/7')
        .then(({number}) => number.should.eq(49 / 7));
  });

  it('computes multiple operations', () => {
    return Calculator.compute('4+3*8-21/7')
        .then(({number}) => number.should.eq(4 + 3 * 8 - 21 / 7));
  });
});
