var BowlingGame = function() {
    this.rolls = [];
    this.current = 0;
};

BowlingGame.prototype.roll = function(pins) {
    this.rolls[this.current++] = pins;
};

BowlingGame.prototype.score = function() {
    var frameIndex = 0;
    var self = this;
    var score = 0;

    function isSpare() {
        return self.rolls[frameIndex] + self.rolls[frameIndex + 1] === 10;
    }

    function sparePoints() {
        return 10 + self.rolls[frameIndex + 2];
    }

    function framePoints() {
        return self.rolls[frameIndex] + self.rolls[frameIndex + 1];
    }

    for(var frame = 0; frame < 10; frame++) {
        if (self.rolls[frameIndex] === 10) {
            score += 10 + self.rolls[frameIndex + 1] + self.rolls[frameIndex + 2];
            frameIndex += 1;
        } else if (isSpare()) {
            score += sparePoints();
            frameIndex += 2;
        } else {
            score += framePoints();
            frameIndex += 2;
        }
    }
    return score;
};

module.exports = BowlingGame;
