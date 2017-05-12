import React from 'react';

class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            player: 'X'
        };

        this.handle = this.handle.bind(this);
    }

    handle(e) {
        e.preventDefault();

        this.setState({
            player: this.state.player === 'X' ? 'O' : 'X'
        })
    }

    render() {
        return (
            <div>
                <Square onClick={(e) => this.handle(e)} />
                <Square onClick={(e) => this.handle(e)} />
                <div className="game-info">Next player: {this.state.player}</div>
            </div>
        )
    }
}

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
            />
        )
    }
}

export {Game, Square};
