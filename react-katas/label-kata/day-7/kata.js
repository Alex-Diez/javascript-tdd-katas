import React from 'react';

export default class CheckboxWithLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {checked: false};
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({checked: !this.state.checked})
    }

    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    onChange={this.onChange}
                    checked={this.state.checked}
                />
                {this.state.checked ? 'On' : 'Off'}
            </label>
        )
    }
}
