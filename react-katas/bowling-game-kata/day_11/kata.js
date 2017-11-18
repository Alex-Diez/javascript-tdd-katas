import React from 'react';

export default class BowlingGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rolls: [],
            score: 0
        };

        this.onChange = this.onChange.bind(this);
        this.roll = this.roll.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState((prevState, props) => ({rolls: prevState.rolls.concat(Number(e.target.value))}));
    }

    roll(e) {
        e.preventDefault();

        const computeScore = (rolls) => {
            const isStrike = (frameIndex) => rolls[frameIndex] === 10;
            const strikeBonus = (frameIndex) => rolls[frameIndex + 1] + rolls[frameIndex + 2];
            const isSpare = (frameIndex) => rolls[frameIndex] + rolls[frameIndex + 1] === 10;
            const spareBonus = (frameIndex) => rolls[frameIndex + 2];

            let score = 0;
            let frameIndex = 0;

            Array.from(new Array(10)).forEach(_ => {
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
            });

            return score;
        };

        this.setState((prevState, props) => ({score: computeScore(prevState.rolls)}))
    }

    render() {
        return (
            <form>
                <input onChange={this.onChange}/>
                <button onClick={this.roll}/>
                <span>{this.state.score}</span>
            </form>
        )
    }
}
