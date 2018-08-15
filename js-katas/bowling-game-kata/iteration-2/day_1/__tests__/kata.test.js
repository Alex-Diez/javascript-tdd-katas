import { expect } from 'chai';
import { BowlingGame } from '../kata';

describe('bowling game', () => {
  let game;

  beforeEach(() => {
    game = new BowlingGame();
    game.rollMany = function (times, pins) {
      Array.from(new Array(times)).forEach(_ => { this.roll(pins) });
    };
    game.rollSpare = function () {
      this.roll(4);
      this.roll(6);
    };
    game.rollStrike = function () {
      this.roll(10);
    };
  });

  it('all zeros', () => {
    game.rollMany(20, 0);

    expect(game.score()).to.equal(0);
  });

  it('all ones', () => {
    game.rollMany(20, 1);

    expect(game.score()).to.equal(20);
  });

  it('one spare', () => {
    game.rollSpare();
    game.roll(3);
    game.rollMany(17, 0);

    expect(game.score()).to.equal(10 + 3 + 3);
  });

  it('one strike', () => {
    game.rollStrike();
    game.roll(4);
    game.roll(3);
    game.rollMany(16, 0);

    expect(game.score()).to.equal(10 + 4 + 3 + 4 + 3);
  });

  it('perfect game', () => {
    game.rollMany(12, 10);

    expect(game.score()).to.equal(300);
  });
});
