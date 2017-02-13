var BowlingGame = function() {
    this.rolls = [];
    this.current = 0;
};

BowlingGame.prototype.roll = function(pins) {
    this.rolls[this.current++] = pins;
};

BowlingGame.prototype.score = function() {
    var score = 0;
    var rollIndex = 0;
    var self = this;

    function isSpare() {
        return self.rolls[rollIndex] + self.rolls[rollIndex + 1] === 10;
    }

    function spareBonus() {
        return self.rolls[rollIndex + 2];
    }

    function isStrike() {
        return self.rolls[rollIndex] === 10;
    }

    function strikeBonus() {
        return self.rolls[rollIndex + 1] + self.rolls[rollIndex + 2];
    }

    for(var frame = 0; frame < 10; frame++) {
        if (isStrike()) {
            score += 10 + strikeBonus();
            rollIndex += 1;
        } else if (isSpare()) {
            score += 10 + spareBonus();
            rollIndex += 2;
        } else {
            score += this.rolls[rollIndex] + this.rolls[rollIndex + 1];
            rollIndex += 2;
        }
    }

    return score;
}

module.exports = BowlingGame;
