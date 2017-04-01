import React from 'react';

export default class BowlingGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pins: 0,
            score: '',
            rolls: []
        };

        this.roll = this.roll.bind(this);
        this.score = this.score.bind(this);
        this.onRoll = this.onRoll.bind(this);
    }

    onRoll(e) {
        this.setState({pins: Number(e.target.value)});
        e.preventDefault();
    }

    roll() {
        const rolls = this.state.rolls;
        rolls.push(this.state.pins);
        this.setState({rolls: rolls});
    }

    score() {
        let score = 0;
        let frameIndex = 0;
        let rolls = this.state.rolls;

        function isSpare() {
            return rolls[frameIndex] + rolls[frameIndex + 1] === 10;
        }

        function spareBonus() {
            return rolls[frameIndex + 2];
        }

        for(let frame = 0; frame < 10; frame++) {
            if (rolls[frameIndex] === 10) {
                score += 10 + rolls[frameIndex + 1] + rolls[frameIndex + 2];
                frameIndex += 1;
            } else if (isSpare()) {
                score += 10 + spareBonus();
                frameIndex += 2;
            } else {
                score += rolls[frameIndex] + rolls[frameIndex + 1];
                frameIndex += 2;
            }
        }

        this.setState({score: score});
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    value={this.state.pins}
                    onChange={this.onRoll}
                />
                <button
                    className="roll-button"
                    onClick={this.roll}
                >
                    roll
                </button>
                <button
                    className="score-button"
                    onClick={this.score}
                >
                    score
                </button>
                <span>{this.state.score}</span>
            </form>
        )
    }
}
