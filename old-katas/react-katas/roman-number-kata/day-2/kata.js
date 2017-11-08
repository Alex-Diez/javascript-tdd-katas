import React from 'react';

export default class Converter extends React.Component {
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

        function convert(n) {
            if (n < 1) {
                return '';
            }

            const keys = Array.from(self.state.conversionMap.keys()).filter((item) => item <= n).sort();
            const arabic = keys[keys.length - 1];
            const roman = self.state.conversionMap.get(arabic);
            return roman + convert(n - arabic);
        }

        this.setState({
            result: convert(this.state.input)
        })
    }

    render() {
        return (
            <from>
                <input
                    type="text"
                    onChange={this.onInput}
                />
                <button
                    onClick={this.convert}
                >
                    convert
                </button>
                <span>{this.state.result !== undefined ? this.state.result : ''}</span>
            </from>
        )
    }
}
