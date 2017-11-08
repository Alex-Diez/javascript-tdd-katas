import React from 'react';

export default class BowlingGame extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            rolls: [],
            currentRoll: 0,
            score: 0,
            frame: 0
        };

        this.onChange  = this.onChange.bind(this);
        this.roll = this.roll.bind(this);
        this.score = this.score.bind(this);
    }

    onChange(e) {
        this.setState({currentRoll: Number(e.target.value)});
        e.preventDefault();
    }

    roll() {
        const rolls = this.state.rolls;
        rolls.push(this.state.currentRoll);
        if (this.state.currentRoll === 10) {
            this.setState({frame: this.state.frame + 2})
        } else {
            this.setState({frame: this.state.frame + 1})
        }
        this.setState(
            {
                rolls: rolls,
                currentRoll: 0
            }
        )
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

        function isStrike() {
            return rolls[frameIndex] === 10;
        }

        function strikeBonus() {
            return rolls[frameIndex + 1] + rolls[frameIndex + 2];
        }

        for (let frame = 0; frame < 10; frame++) {
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
        this.setState(
            {
                score: score
            }
        )
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    value={this.state.currentRoll}
                    onChange={this.onChange}
                />
                <button
                    className="roll-button"
                    onClick={this.roll}
                    disabled={this.state.frame === 20 && this.state.rolls.length > 13}
                >
                    roll
                </button>
                <button
                    className="score-button"
                    onClick={this.score}
                    disabled={this.state.frame !== 20 && this.state.rolls.length < 13}
                >
                    score
                </button>
                <span>{this.state.score}</span>
            </form>
        )
    }
}
