import React from 'react';

export default class RomanNumber extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            conversionMap: new Map([[5, 'V'], [1, 'I']]),
            input: undefined,
            result: undefined
        };

        this.onInput = this.onInput.bind(this);
        this.convert = this.convert.bind(this);
    }

    onInput(e) {
        e.preventDefault();

        this.setState({
            input: Number(e.target.value)
        });
    }

    convert(e) {
        e.preventDefault();

        const self = this;

        function fromRoman(n) {
            if (n < 1) {
                return "";
            }

            let arabics = [];
            self.state.conversionMap.forEach((value, key) => {
                if (key <= n) {
                    arabics.push(key)
                }
            });
            arabics.sort();
            const arabic = arabics[arabics.length - 1];
            const roman = self.state.conversionMap.get(arabic);
            return roman + fromRoman(n - arabic);
        }

        this.setState({
            result: fromRoman(this.state.input)
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
                    onClick={this.convert}
                >
                    convert
                </button>
                <span>{this.state.result !== undefined ? this.state.result : '0'}</span>
            </form>
        )
    }
}
