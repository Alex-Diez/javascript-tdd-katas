import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import LinkedDeque from '../kata';

describe("linked deque", () => {
    let deque;
    let input;
    let addFront;

    beforeEach(() => {
        deque = ReactTestUtils.renderIntoDocument(
            <LinkedDeque/>
        );
        input = ReactTestUtils.findRenderedDOMComponentWithTag(deque, 'input');
        addFront = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'add-front-button');
    });

    function getItems() {
        return ReactTestUtils.scryRenderedDOMComponentsWithClass(deque, 'item').map((item) => Number(item.textContent));
    }

    function addItems(size, action) {
        for (let i = 1; i < size + 1; i++) {
            input.value = i * 10;
            ReactTestUtils.Simulate.change(input);
            ReactTestUtils.Simulate.click(action);
        }
    }

    test("newly created deque is empty", () => {
        const items = getItems();

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

    test("remove one item from front", () => {
        addItems(3, addFront);

        const removeFront = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'remove-front-button');
        ReactTestUtils.Simulate.click(removeFront);

        const items = getItems();

        expect(items.length).toBe(2);
        expect(items).toEqual([20, 10]);
    });

    test("add three items in back", () => {
        const addBack = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'add-back-button');

        addItems(3, addBack);

        const items = getItems();

        expect(items.length).toBe(3);
        expect(items).toEqual([10, 20, 30]);
    });

    test("remove item from back", () => {
        addItems(3, addFront);

        const removeBack = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'remove-back-button');
        ReactTestUtils.Simulate.click(removeBack);

        const items = getItems();

        expect(items.length).toBe(2);
        expect(items).toEqual([30, 20]);
    });

    test("single item surrounded by '<-' and '->'", () => {
        addItems(1, addFront);

        const renderedDeque = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-10->');
    });

    test("items that have neighbours surrounded by '<=>'", () => {
        addItems(3, addFront);

        const renderedDeque = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-30<=>20<=>10->');
    });
});
