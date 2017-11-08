import React from 'react';

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            input: undefined,
            result: undefined
        };

        this.onInput = this.onInput.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    onInput(e) {
        e.preventDefault();

        this.setState({
            input: e.target.value
        });
    }

    evaluate(e) {
        e.preventDefault();

        const input = this.state.input;
        let index = 0;

        function parseArg() {
            const start = index;
            while (index < input.length && input[index] !== '-' && input[index] !== '+' && input[index] !== '*' && input[index] !== '/') {
                index++;
            }
            return Number(input.slice(start, index));
        }

        function parseTerm() {
            let ret = parseArg();
            const sign = input[index];
            switch (sign) {
                case '*':
                    index++;
                    ret *= parseArg();
                    break;
                case '/':
                    index++;
                    ret /= parseArg();
                    break;
            }
            return ret;
        }

        let result = parseTerm();
        while (index < input.length) {
            const sign = input[index];
            switch (sign) {
                case '+':
                    index++;
                    result += parseTerm();
                    break;
                case '-':
                    index++;
                    result -= parseTerm();
                    break;
            }
        }

        this.setState({
            input: undefined,
            result: result
        });
    }

    render() {
        return (
            <from>
                <input
                    type="text"
                    onChange={this.onInput}
                />
                <button
                    onClick={this.evaluate}
                >
                    evaluate
                </button>
                <span>{this.state.result !== undefined ? this.state.result : 0}</span>
            </from>
        )
    }
}
