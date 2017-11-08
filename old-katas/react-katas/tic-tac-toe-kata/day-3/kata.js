import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <button
                className="square"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        )
    }
}

class Game extends React.Component {
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
            squares[index] = this.state.player;

            this.setState({
                squares: squares,
                player: this.state.player === 'X' ? 'O' : 'X'
            });
        }
    }

    renderSquare(index) {
        return (
            <Square
                onClick={(e) => this.handle(e, index)}
                value={this.state.squares[index]}
            />
        )
    }

    render() {
        return (
            <div>
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                <div className="player-info">Next player: {this.state.player}</div>
            </div>
        )
    }
}

export {Game, Square}
