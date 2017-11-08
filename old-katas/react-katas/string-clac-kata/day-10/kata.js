import React from 'react';

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            result: undefined
        };

        this.onInput = this.onInput.bind(this);
    }

    onInput(e) {
        e.preventDefault();

        this.setState({
            result: Number(e.target.value)
        });
    }

    render() {
        return(
            <form>
                <input
                    type="text"
                    onChange={this.onInput}
                />
                <button>
                    evaluate
                </button>
                <span>{this.state.result !== undefined ? this.state.result : '0'}</span>
            </form>
        )
    }
}
