function BowlingGame() {
  const rolls = [];
  const isSpare = (roll) => rolls[roll] + rolls[roll + 1] === 10;
  const spareBonus = (roll) => rolls[roll + 2];
  const isStrike = (roll) => rolls[roll] === 10;
  const strikeBonus = (roll) => rolls[roll + 1] + rolls[roll + 2];
  return {
    roll: function (pins) {
      rolls.push(pins);
    },

    score: function () {
      let score = 0;
      let roll = 0;
      for (let frame = 0; frame < 10; frame++) {
        if (isStrike(roll)) {
          score += 10 + strikeBonus(roll);
          roll += 1;
        } else if (isSpare(roll)) {
          score += 10 + spareBonus(roll);
          roll += 2;
        } else {
          score += rolls[roll] + rolls[roll + 1];
          roll += 2;
        }
      }
      return score;
    }
  };
}

module.exports.BowlingGame = BowlingGame;
