import React from 'react';

export default class Converter extends React.Component {
    constructor() {
        super();

        this.state = {
            conversionMap: new Map([[1, 'I'], [5, 'V']]),
            toConvert: undefined,
            result: ""
        };

        this.onInput = this.onInput.bind(this);
        this.convert = this.convert.bind(this);
    }

    onInput(e) {
        e.preventDefault();

        this.setState({
            toConvert: Number(e.target.value)
        });
    }

    convert(e) {
        e.preventDefault();

        const conversionMap = this.state.conversionMap;

        function convert(n) {
            if (n < 1) {
                return "";
            }
            const arabic = Array.from(conversionMap.keys()).filter((item) => item <= n).sort().pop();
            return conversionMap.get(arabic) + convert(n - arabic);
        }

        this.setState({
            result: convert(this.state.toConvert)
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
                <span>{this.state.result}</span>
            </form>
        )
    }
}
