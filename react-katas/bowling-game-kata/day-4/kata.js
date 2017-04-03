import React from 'react';

export default class BowlingGame extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            score: 0,
            currentRoll: 0,
            rolls: []
        };

        this.onRoll = this.onRoll.bind(this);
        this.roll = this.roll.bind(this);
        this.score = this.score.bind(this);
    }

    onRoll(e) {
        e.preventDefault();
        this.setState({currentRoll: Number(e.target.value)})
    }

    roll(e) {
        e.preventDefault();
        const rolls = this.state.rolls;
        rolls.push(this.state.currentRoll);
        this.setState({rolls: rolls});
    }

    score(e) {
        e.preventDefault();
        let score = 0;
        let rolls  = this.state.rolls;
        let frameIndex = 0;

        function isSpare() {
            return rolls[frameIndex] + rolls[frameIndex + 1] === 10;
        }

        function spareBonus() {
            return rolls[frameIndex + 2];
        }

        function isStrike() {
            return rolls[frameIndex] === 10;
        }

        function strikeBonus() {
            return rolls[frameIndex + 1] + rolls[frameIndex + 2];
        }

        for(let frame = 0; frame < 10; frame++) {
            if (isStrike()) {
                score += 10 + strikeBonus();
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
