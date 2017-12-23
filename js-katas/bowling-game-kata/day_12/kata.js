const BowlingGame = function () {
    this.rolls = [];
};

BowlingGame.prototype.roll = function (pin) {
    this.rolls.push(pin);
};

BowlingGame.prototype.score = function () {
    const self = this;

    function isStrike (frameIndex) {
        return self.rolls[frameIndex] === 10
    }

    function strikeBonus(frameIndex) {
        return self.rolls[frameIndex + 1] + self.rolls[frameIndex + 2];
    }

    function isSpare(frameIndex) {
        return self.rolls[frameIndex] + self.rolls[frameIndex + 1] === 10;
    }

    function spareBonus(frameIndex) {
        return self.rolls[frameIndex + 2];
    }

    let score = 0;
    let frameIndex = 0;

    for (let _ of new Array(10)) {
        if (isStrike(frameIndex)) {
            score += 10 + strikeBonus(frameIndex);
            frameIndex += 1;
        } else if (isSpare(frameIndex)) {
            score += 10 + spareBonus(frameIndex);
            frameIndex += 2;
        } else {
            score += this.rolls[frameIndex] + this.rolls[frameIndex + 1];
            frameIndex += 2;
        }
    }

    return score;
};

export {BowlingGame};
