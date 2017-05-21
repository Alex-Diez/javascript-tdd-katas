import React from 'react';

export default class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            squares: new Array(9).fill(''),
            player: 'X'
        };

        this.handle = this.handle.bind(this);
    }

    handle(e, index) {
        e.preventDefault();

        const squares = this.state.squares;
        if (squares[index] === '') {
            const player = this.state.player;
            squares[index] = player;

            this.setState({
                squares: squares,
                player: player === 'X' ? 'O' : 'X'
            });
        }
    }

    render() {
        const self = this;

        function renderSquare(index) {
            return (
                <button
                    className="square"
                    onClick={(e) => self.handle(e, index)}
                >
                    {self.state.squares[index]}
                </button>
            )
        }

        return (
            <div>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
                <div className="current-player">Current player: {this.state.player}</div>
            </div>
        )
    }
}
