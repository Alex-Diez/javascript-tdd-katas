import { should } from 'chai';

import Calculator from '../kata';

should();

describe('string calc', () => {
  it('computes a single number', () => {
    return new Calculator('3')
      .compute()
      .then(result => result.should.eq(3));
  });

  it('computes addition', () => {
    return new Calculator('4+3')
      .compute()
      .then(result => result.should.eq(7));
  });

  it('computes subtraction', () => {
    return new Calculator('5-1')
      .compute()
      .then(result => result.should.eq(4));
  });

  it('compuutes multiplication', () => {
    return new Calculator('4*3')
      .compute()
      .then(result => result.should.eq(12));
  });

  it('computes division', () => {
    return new Calculator('16/4')
      .compute()
      .then(result => result.should.eq(4));
  });

  it.skip('computes multiple operations', () => {
    return new Calculator('5+4*3-24/6')
      .compute()
      .then(result => result.should.eq(5+4*3-24/6));
  });
});
