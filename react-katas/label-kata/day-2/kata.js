import React from 'react';

export default class CheckboxWithLabel extends React.Component {
    constructor() {
        super();

        this.state = {checked: false};
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.onChange}
                />
                {this.state.checked ? "On" : "Off"}
            </label>
        )
    }
}
