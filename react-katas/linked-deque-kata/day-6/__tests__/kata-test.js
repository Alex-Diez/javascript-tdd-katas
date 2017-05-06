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

    test("newly created deque is empty", () => {
        expect(getItems()).toEqual([]);
    });

    function addItems(size, action) {
        for (let i = 1; i < size + 1; i++) {
            input.value = i * 10;
            ReactTestUtils.Simulate.change(input);
            ReactTestUtils.Simulate.click(action);
        }
    }

    test("add one item in front", () => {
        addItems(1, addFront);

        expect(getItems()).toEqual([10]);
    });

    test("add three items in front", () => {
        addItems(3, addFront);

        expect(getItems()).toEqual([30, 20, 10]);
    });

    test("remove one item from front", () => {
        addItems(3, addFront);

        const removeFront = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'remove-front-button');
        ReactTestUtils.Simulate.click(removeFront);

        expect(getItems()).toEqual([20, 10]);
    });

    test("add three items in back", () => {
        const addBack = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'add-back-button');

        addItems(3, addBack);

        expect(getItems()).toEqual([10, 20, 30]);
    });

    test("remove one item from back", () => {
        addItems(3, addFront);

        const removeBack = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'remove-back-button');
        ReactTestUtils.Simulate.click(removeBack);

        expect(getItems()).toEqual([30, 20]);
    });

    test("newly created deque rendered as an empty string", () => {
        const renderedDeque = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('');
    });

    test("single element is surrounded by '<-' and '->'", () => {
        addItems(1, addFront);

        const renderedDeque = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-10->');
    });

    test("items that have neighbours surrounded by '<=>'", () => {
        addItems(3, addFront);

        const renderedDeque = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-30<=>20<=>10->');
    })
});
