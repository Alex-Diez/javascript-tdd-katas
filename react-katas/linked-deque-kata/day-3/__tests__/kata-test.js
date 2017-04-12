import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LinkedDeque from '../kata';

describe("linked deque", () => {
    let deque;
    let input;
    let addFront;
    let addBack;

    beforeEach(() => {
        deque = TestUtils.renderIntoDocument(
            <LinkedDeque/>
        );
        input = TestUtils.findRenderedDOMComponentWithTag(deque, 'input');
        addFront = TestUtils.findRenderedDOMComponentWithClass(deque, 'add-front-button');
        addBack = TestUtils.findRenderedDOMComponentWithClass(deque, 'add-back-button');
    });

    function getItems() {
        return TestUtils.scryRenderedDOMComponentsWithClass(deque, 'item').map((item) => Number(item.textContent));
    }

    function addItems(times, acction) {
        for (let i = 1; i < times + 1; i++) {
            input.value = i * 10;
            TestUtils.Simulate.change(input);
            TestUtils.Simulate.click(acction);
        }
    }

    test("newly created deque is empty", () => {
        const items = TestUtils.scryRenderedDOMComponentsWithClass(deque, 'item').map((item) => Number(item.textContent));

        expect(items.length).toBe(0);

        const renderedDeque = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

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

        const removeFront = TestUtils.findRenderedDOMComponentWithClass(deque, 'remove-front-button');
        TestUtils.Simulate.click(removeFront);

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

        const renderedDeque = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-10->')
    });

    test("items connected by '<=>'", () => {
        addItems(3, addFront);

        const renderedDeque = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-30<=>20<=>10->');
    })
});
