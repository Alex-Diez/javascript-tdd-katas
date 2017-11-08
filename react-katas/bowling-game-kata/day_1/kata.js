import React, {Component} from 'react';

export default class BowlingGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rolls: [],
            score: 0
        };

        this.enterPin = this.enterPin.bind(this);
        this.roll = this.roll.bind(this);
    }

    enterPin(e) {
        const rolls = this.state.rolls;
        rolls.push(Number(e.target.value));
        this.setState({rolls: rolls});

        e.preventDefault();
    }

    roll(e) {
        let score = 0;
        let frameIndex = 0;
        const rolls = this.state.rolls;

        const isStrike = (frameIndex) => rolls[frameIndex] === 10;
        const strikeBonus = (frameIndex) => rolls[frameIndex + 1] + rolls[frameIndex + 2];
        const isSpare = (frameIndex) => rolls[frameIndex] + rolls[frameIndex + 1] === 10;
        const spareBonus = (frameIndex) => rolls[frameIndex + 2];

        for (let i = 0; i < 10; i++) {
            if (isStrike(frameIndex)) {
                score += 10 + strikeBonus(frameIndex);
                frameIndex += 1;
            } else if (isSpare(frameIndex)) {
                score += 10 + spareBonus(frameIndex);
                frameIndex += 2;
            } else {
                score += rolls[frameIndex] + rolls[frameIndex + 1];
                frameIndex += 2;
            }
        }

        this.setState({score: score});

        e.preventDefault();
    }

    render() {
        return (
            <form>
                <input onChange={this.enterPin}/>
                <button onClick={this.roll}/>
                <span className="score">{this.state.score}</span>
            </form>
        )
    }
}
