import React, {Component} from 'react';

export default class BowlingGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roll: 0,
            rolls: []
        };

        this.onChange = this.onChange.bind(this);
        this.roll = this.roll.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState((prevState, props) => ({roll: Number(e.target.value)}));
    }

    roll(e) {
        e.preventDefault();
        this.setState((prevState, props) => ({rolls: prevState.rolls.concat(prevState.roll)}));
    }

    render() {
        const rolls = this.state.rolls;
        const computeScore = () => {
            const isStrike = () => rolls[frameIndex] === 10;
            const strikeBonus = () => rolls[frameIndex + 1] + rolls[frameIndex + 2];
            const isSpare = () => rolls[frameIndex] + rolls[frameIndex + 1] === 10;
            const spareBonus = () => rolls[frameIndex + 2];

            let score = 0;
            let frameIndex = 0;

            Array.from(new Array(10)).forEach(
                _ => {
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
            );

            return score;
        };
        return (
            <form>
                <input onChange={this.onChange}/>
                <button onClick={this.roll}/>
                <span>{computeScore()}</span>
            </form>
        )
    }
}

