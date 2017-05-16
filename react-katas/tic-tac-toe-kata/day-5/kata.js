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

        this.state.squares[index] = this.state.player;

        this.setState({
            squares: this.state.squares,
            player: this.state.player === 'X' ? 'O' : 'X'
        })
    }

    render() {

        const self = this;

        function renderSquare(index) {
            return (
                <Square
                    onClick={(e) => self.handle(e, index)}
                    value={self.state.squares[index]}
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
                <div className="current-player">Current player: {this.state.player}</div>
            </div>
        )
    }
}
