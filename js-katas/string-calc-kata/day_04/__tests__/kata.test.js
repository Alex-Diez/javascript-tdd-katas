import {should} from 'chai';

import Calculator from '../kata';

should();

describe('string calculator', () => {
  it('computes single number', () => {
    return new Calculator()
        .compute('5')
        .then(({number}) => number.should.eq(5));
  });

  it('computes addition', () => {
    return new Calculator()
        .compute('4+3')
        .then(({number}) => number.should.eq(4 + 3));
  });

  it('computes subtraction', () => {
    return new Calculator()
        .compute('14-3')
        .then(({number}) => number.should.eq(14 - 3));
  });

  it('computes multiplication', () => {
    return new Calculator()
        .compute('4*8')
        .then(({number}) => number.should.eq(4 * 8));
  });

  it('computes division', () => {
    return new Calculator()
        .compute('24/4')
        .then(({number}) => number.should.eq(24 / 4));
  });

  it('computes multiple operations', () => {
    return new Calculator()
        .compute('3+5*2-36/6')
        .then(({number}) => number.should.eq(3 + 5 * 2 - 36 / 6));
  });
});
