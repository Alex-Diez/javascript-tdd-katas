import { should } from 'chai';

import Calculator from '../kata';

should();

describe('string calc', () => {
  it('computes single number', () => {
    return new Calculator('5')
      .compute()
      .then(({ number }) => number.should.eq(5));
  });

  it('computes addition', () => {
    return new Calculator('4+2')
      .compute()
      .then(({ number }) => number.should.eq(4 + 2));
  });

  it('computes subtraction', () => {
    return new Calculator('4-1')
      .compute()
      .then(({ number }) => number.should.eq(4 - 1));
  });

  it('compute multiplication', () => {
    return new Calculator('5*2')
      .compute()
      .then(({ number }) => number.should.eq(5 * 2));
  });

  it('compute division', () => {
    return new Calculator('36/6')
      .compute()
      .then(({ number }) => number.should.eq(36 / 6));
  });

  it('compute multiple operations', () => {
    return new Calculator('3+4*3-66/6')
      .compute()
      .then(({ number }) => number.should.eq(3 + 4 * 3 - 66 / 6));
  });
});
