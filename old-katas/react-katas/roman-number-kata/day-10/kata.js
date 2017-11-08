import React from 'react';

export default class Converter extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            conversionMap: new Map([[1, 'I'], [5, 'V'], [4, 'IV']]),
            result: ''
        };

        this.onInput = this.onInput.bind(this);
        this.convert = this.convert.bind(this);
    }

    onInput(e) {
        e.preventDefault();

        this.setState({
            arabic: Number(e.target.value)
        })
    }

    convert(e) {
        e.preventDefault();

        let number = this.state.arabic;
        const conversionMap = this.state.conversionMap;

        function convert() {
            if (number < 1) {
                return "";
            }

            const arabic = Array.from(conversionMap.keys()).filter((item) => item <= number).sort().pop();
            const roman = conversionMap.get(arabic);
            number -= arabic;
            return roman + convert();
        }

        this.setState({
            result: convert()
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
