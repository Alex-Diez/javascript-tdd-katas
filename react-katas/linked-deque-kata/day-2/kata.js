import React from 'react';

export default class LinkedDeque extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
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
        this.setState({currentItem: Number(e.target.value)})
    }

    addFront(e) {
        e.preventDefault();

        const items = this.state.items;
        items.unshift((<span className="item">{this.state.currentItem}</span>));

        this.setState({items: items})
    }

    removeFront(e) {
        e.preventDefault();

        const items = this.state.items;
        items.shift();

        this.setState({items: items});
    }

    addBack(e) {
        e.preventDefault();

        const items = this.state.items;
        items.push((<span className="item">{this.state.currentItem}</span>));

        this.setState({items: items});
    }

    removeBack(e) {
        e.preventDefault();

        const items = this.state.items;
        items.pop();

        this.setState({items: items});
    }

    render() {
        let self = this;

        function prettyPrint() {
            const items = self.state.items;
            const prettyPrintedItems = [];
            if (items.length !== 0) {
                prettyPrintedItems.push((<span>&lt;-</span>));
                for (let i = 0; i < items.length; i++) {
                    prettyPrintedItems.push(items[i]);
                    if (i !== items.length - 1) {
                        prettyPrintedItems.push((<span>&lt;=&gt;</span>));
                    }
                }
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
                    {prettyPrint()}
                </div>
            </form>
        )
    }
}
