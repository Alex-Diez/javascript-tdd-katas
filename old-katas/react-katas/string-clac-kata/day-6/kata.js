import React from 'react';

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            expression: undefined,
            result: undefined
        };

        this.onInput = this.onInput.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    onInput(e) {
        e.preventDefault();

        this.setState({
            expression: e.target.value
        });
    }

    evaluate(e) {
        e.preventDefault();

        const expression = this.state.expression;
        let index = 0;

        function parseArg() {
            const start = index;
            while (index < expression.length && expression[index] !== '+' && expression[index] !== '-' && expression[index] !== '*' && expression[index] !== '/') {
                index++;
            }
            return Number(expression.slice(start, index));
        }

        function parseTerm() {
            let ret = parseArg();
            while (index < expression.length) {
                const sign = expression[index];
                switch (sign) {
                    case '*':
                        index++;
                        ret *= parseArg();
                        break;
                    case '/':
                        index++;
                        ret /= parseArg();
                        break
                }
                if (sign === '+' || sign === '-') break;
            }

            return ret;
        }


        let result = parseTerm();
        while (index < expression.length) {
            const sign = expression[index];
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
            expression: undefined,
            result: result
        });
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    onChange={this.onInput}
                />
                <button
                    onClick={this.evaluate}
                >
                    evaluate
                </button>
                <span>{this.state.result !== undefined ? this.state.result : '0'}</span>
            </form>
        )
    }
}
