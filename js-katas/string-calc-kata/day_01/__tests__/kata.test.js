import { should } from 'chai';

import Calculator from '../kata';

should();

describe('string calc', () => {
  it('calculates single number', () => {
    return new Calculator('4').compute()
      .then(value => value.should.eq(4));
  });

  it('calculates addition', () => {
    return new Calculator('4+3').compute()
      .then(value => value.should.eq(7));
  });

  it('calculates subtraction', () => {
    return new Calculator('5-1').compute()
      .then(value => value.should.eq(4));
  });
});
