import {should} from 'chai';

import Filter from '../kata';

should();

describe('k items', () => {
  it('has to filter one item from single item array', () => {
    return Filter.kItems([1], 1)
        .then(({numbers}) => numbers.should.have.members([1]));
  });

  it('has to filter one item from two items array largest is first', () => {
    return Filter.kItems([2, 1], 1)
        .then(({numbers}) => numbers.should.have.members([2]));
  });

  it('has to filter one item from two items array largest is last', () => {
    return Filter.kItems([1, 2], 1)
        .then(({numbers}) => numbers.should.have.members([2]));
  });

  it('has to filter one item from ordered three items array', () => {
    return Filter.kItems([1, 2, 3], 1)
        .then(({numbers}) => numbers.should.have.members([3]));
  });

  it('has to filter two items from ordered three items array', () => {
    return Filter.kItems([1, 2, 3], 2)
        .then(({numbers}) => numbers.should.have.members([2, 3]));
  });
});
