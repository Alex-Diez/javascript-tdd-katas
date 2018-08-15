class BowlingGame {
    constructor() {
        this.rolls = [];
    }

    roll(pin) {
        this.rolls.push(pin);
    }

    score() {
        const isStrike = (frameIndex) => this.rolls[frameIndex] === 10;
        const strikeBonus = (frameIndex) => this.rolls[frameIndex + 1] + this.rolls[frameIndex + 2];
        const isSpare = (frameIndex) => this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10;
        const spareBonus = (frameIndex) => this.rolls[frameIndex + 2];

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
    }
}

export {BowlingGame};
