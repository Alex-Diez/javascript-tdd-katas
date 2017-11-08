import React, {Component} from 'react';

class Game extends Component {
    constructor() {
        super();

        this.state = {
            squares: new Array(9).fill(null),
            player: 'X'
        };

        this.handle = this.handle.bind(this);
    }

    handle(index) {
        if (this.state.squares[index] === null) {
            this.state.squares[index] = this.state.player;

            this.setState({
                squares: this.state.squares,
                player: this.state.player === 'X' ? 'O' : 'X'
            })
        }
    }

    render() {
        const self = this;
        function renderSquare(i) {
            return (
                <Square
                    onClick={() => self.handle(i)}
                    value={self.state.squares[i]}
                />
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
                <div className="game-info">Next player: {this.state.player}</div>
            </div>
        )
    }
}

class Square extends Component {
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

export {Game, Square}
