const BowlingGame = function () {
    this.rolls = [];
};

BowlingGame.prototype.roll = function (pin) {
    this.rolls.push(pin);
};

BowlingGame.prototype.score = function () {
    let score = 0;
    let frameIndex = 0;
    let self = this;

    function isStrike() {
        return self.rolls[frameIndex] === 10;
    }

    function strikeBonus() {
        return self.rolls[frameIndex + 1] + self.rolls[frameIndex + 2]
    }

    function isSpare() {
        return self.rolls[frameIndex] + self.rolls[frameIndex + 1] === 10
    }

    function spareBonus() {
        return self.rolls[frameIndex + 2];
    }

    for (let _ of new Array(10)) {
        if (isStrike()) {
            score += 10 + strikeBonus();
            frameIndex += 1;
        } else if (isSpare()) {
            score += 10 + spareBonus();
            frameIndex += 2;
        } else {
            score += this.rolls[frameIndex] + this.rolls[frameIndex + 1];
            frameIndex += 2;
        }
    }

    return score;
};

export {BowlingGame};
