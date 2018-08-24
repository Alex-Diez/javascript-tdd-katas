export default class BowlingGame {
  constructor() {
    this.rolls = [];
  }

  roll(pins) {
    this.rolls.push(pins);
  }

  score() {
    const isSpare = (roll) => this.rolls[roll] + this.rolls[roll + 1] === 10;
    const spareBonus = (roll) => this.rolls[roll + 2];

    const isStrike = (roll) => this.rolls[roll] === 10;
    const strikeBonus = (roll) => this.rolls[roll + 1] + this.rolls[roll + 2];

    let score = 0;
    let roll = 0;
    for(let i = 0; i < 10; i++) {
      if (isStrike(roll)) {
        score += 10 + strikeBonus(roll);
        roll += 1;
      } else if (isSpare(roll)) {
        score += 10 + spareBonus(roll);
        roll += 2;
      } else {
        score += this.rolls[roll] + this.rolls[roll + 1];
        roll += 2;
      }
    }
    return score;
  }
}
