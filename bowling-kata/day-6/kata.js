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
    for (var frame = 0; frame < 10; frame++) {
        if (self.rolls[frameIndex] === 10) {
            score += 10 + self.rolls[frameIndex + 1] + self.rolls[frameIndex + 2];
            frameIndex += 1;
        } else if (self.rolls[frameIndex] + self.rolls[frameIndex + 1] === 10) {
            score += 10 + self.rolls[frameIndex + 2];
            frameIndex += 2;
        } else {
            score += self.rolls[frameIndex] + self.rolls[frameIndex + 1];
            frameIndex += 2;
        }
    }
    return score;
};

module.exports = BowlingGame;
