import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import LinkedDeque from '../kata';

describe("linked deque", () => {
    let deque;
    let input;
    let addFront;
    let addBack;

    beforeEach(() => {
        deque = ReactTestUtils.renderIntoDocument(
            <LinkedDeque/>
        );
        input = ReactTestUtils.findRenderedDOMComponentWithTag(deque, 'input');
        addFront = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'add-front-button');
        addBack = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'add-back-button');
    });

    function getItems() {
        return ReactTestUtils.scryRenderedDOMComponentsWithClass(deque, 'item').map((item) => Number(item.textContent));
    }

    function addItems(times, acction) {
        for (let i = 1; i < times + 1; i++) {
            input.value = i * 10;
            ReactTestUtils.Simulate.change(input);
            ReactTestUtils.Simulate.click(acction);
        }
    }

    test("newly created deque is empty", () => {
        const items = ReactTestUtils.scryRenderedDOMComponentsWithClass(deque, 'item').map((item) => Number(item.textContent));

        expect(items.length).toBe(0);

        const renderedDeque = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('');
    });

    test("add one item in front", () => {
        addItems(1, addFront);

        const items = getItems();

        expect(items.length).toBe(1);
        expect(items).toEqual([10]);
    });

    test("add three items in front", () => {
        addItems(3, addFront);

        const items = getItems();

        expect(items.length).toBe(3);
        expect(items).toEqual([30, 20, 10]);
    });

    test("remove item from front", () => {
        addItems(3, addFront);

        const removeFront = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'remove-front-button');
        ReactTestUtils.Simulate.click(removeFront);

        const items = getItems();

        expect(items.length).toBe(2);
        expect(items).toEqual([20, 10]);
    });

    test("add three items in back", () => {
        addItems(3, addBack);

        const items = getItems();

        expect(items.length).toBe(3);
        expect(items).toEqual([10, 20, 30]);
    });

    test("single item surrounded by '<-' and '->'", () => {
        addItems(1, addFront);

        const renderedDeque = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-10->')
    });

    test("items connected by '<=>'", () => {
        addItems(3, addFront);

        const renderedDeque = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-30<=>20<=>10->');
    })
});
