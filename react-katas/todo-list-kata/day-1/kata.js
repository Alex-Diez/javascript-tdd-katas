import React from 'react';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            tasks: [],
            value: ''
        };
        this.onAccept = this.onAccept.bind(this);
        this.onDone = this.onDone.bind(this);
    }

    onAccept() {
        this.state.tasks.push(
            <li key={this.state.index}>
                {this.state.value}
            </li>
        );
        this.setState(
            {
                index: this.state.index + 1,
                tasks: this.state.tasks,
                value: ''
            }
        )
    }

    onDone() {
        this.state.tasks.pop();
        this.setState(
            {
                index: this.state.index - 1,
                tasks: this.state.tasks,
                value: ''
            }
        )
    }

    render() {
        return (
            <form>
                <ul>{this.state.tasks}</ul>
                <input
                    type="text"
                    value={this.state.value}
                />
                <input
                    type="button"
                    className="accept"
                    onChange={this.onAccept}
                />
                <input
                    type="button"
                    className="done"
                    onChange={this.onDone}
                />
            </form>
        )
    }
}
