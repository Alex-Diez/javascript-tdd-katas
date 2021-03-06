import { should } from 'chai';

import { BowlingGame } from '../kata';

should();

describe('bowling game', () => {
  let game;

  beforeAll(() => {
    BowlingGame.prototype.rollMany = function(times, pins) { Array.from(Array(times)).forEach((_) => this.roll(pins)) };
    BowlingGame.prototype.rollSpare = function() {
      this.roll(4);
      this.roll(6);
    }
  });

  beforeEach(() => {
    game = new BowlingGame();
  });

  it('all zeros', () => {
    game.rollMany(20, 0);

    game.score().should.eq(0);
  });

  it ('all ones', () => {
    game.rollMany(20, 1);

    game.score().should.eq(20);
  });

  it('one spare', () => {
    game.rollSpare();
    game.roll(3);
    game.rollMany(17, 0);

    game.score().should.eq(10 + 3 + 3);
  });

  it('one stike', () => {
    game.roll(10);
    game.roll(4);
    game.roll(3);
    game.rollMany(16, 0);

    game.score().should.eq(10 + 4 + 3 + 4 + 3);
  });

  it('perfect game', () => {
    game.rollMany(12, 10);

    game.score().should.eq(300);
  });
});
