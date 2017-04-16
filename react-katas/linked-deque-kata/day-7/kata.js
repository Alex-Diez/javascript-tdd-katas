import React from 'react';

export default class LinkedDeque extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            item: undefined,
            items: []
        };

        this.onInput = this.onInput.bind(this);
        this.addFront = this.addFront.bind(this);
        this.removeFront = this.removeFront.bind(this);
        this.addBack = this.addBack.bind(this);
        this.removeBack = this.removeBack.bind(this);
    }

    onInput(e) {
        e.preventDefault();

        this.setState({
            item: Number(e.target.value)
        });
    }

    addFront(e) {
        e.preventDefault();

        const items = this.state.items;
        items.unshift((<span className="item">{this.state.item}</span>));

        this.setState({
            item: undefined,
            items: items
        });
    }

    removeFront(e) {
        e.preventDefault();

        const items = this.state.items;
        items.shift();

        this.setState({
            item: undefined,
            items: items
        });
    }

    addBack(e) {
        e.preventDefault();

        const items = this.state.items;
        items.push((<span className="item">{this.state.item}</span>));

        this.setState({
            item: undefined,
            items: items
        });
    }

    removeBack(e) {
        e.preventDefault();

        const items = this.state.items;
        items.pop();

        this.setState({
            item: undefined,
            items: items
        });
    }

    render() {
        const self = this;

        function prettyPrinted() {
            const items = self.state.items;
            const prettyPrintedItems = [];
            const length = items.length;
            if (length !== 0) {
                prettyPrintedItems.push((<span>&lt;-</span>));
                for (let i = 0; i < length - 1; i++) {
                    prettyPrintedItems.push(items[i]);
                    prettyPrintedItems.push((<span>&lt;=&gt;</span>));
                }
                prettyPrintedItems.push(items[length - 1]);
                prettyPrintedItems.push((<span>-&gt;</span>));
            }
            return prettyPrintedItems;
        }

        return (
            <form>
                <input
                    type="text"
                    onChange={this.onInput}
                />
                <button
                    className="add-front-button"
                    onClick={this.addFront}
                >
                    add front
                </button>
                <button
                    className="remove-front-button"
                    onClick={this.removeFront}
                >
                    remove front
                </button>
                <button
                    className="add-back-button"
                    onClick={this.addBack}
                >
                    add back
                </button>
                <button
                    className="remove-back-button"
                    onClick={this.removeBack}
                >
                    remove back
                </button>
                <div
                    className="items"
                >
                    {prettyPrinted()}
                </div>
            </form>
        )
    }
}
