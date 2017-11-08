import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <button className="square" onClick={this.props.onClick}>{this.props.value}</button>
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
            player: this.state.player === 'X' ? 'O' :'X'
        })
    }

    render() {
        return (
            <div>
                <Square
                    onClick={(e) => this.handle(e, 0)}
                    value={this.state.squares[0]}
                />
                <Square
                    onClick={(e) => this.handle(e, 1)}
                    value={this.state.squares[1]}
                />
                <Square
                    onClick={(e) => this.handle(e, 2)}
                    value={this.state.squares[2]}
                />
                <Square
                    onClick={(e) => this.handle(e, 3)}
                    value={this.state.squares[3]}
                />
                <Square
                    onClick={(e) => this.handle(e, 4)}
                    value={this.state.squares[4]}
                />
                <Square
                    onClick={(e) => this.handle(e, 5)}
                    value={this.state.squares[5]}
                />
                <Square
                    onClick={(e) => this.handle(e, 6)}
                    value={this.state.squares[6]}
                />
                <Square
                    onClick={(e) => this.handle(e, 7)}
                    value={this.state.squares[7]}
                />
                <Square
                    onClick={(e) => this.handle(e, 8)}
                    value={this.state.squares[8]}
                />
                <div className="current-player">Current player: {this.state.player}</div>
            </div>
        )
    }
}
