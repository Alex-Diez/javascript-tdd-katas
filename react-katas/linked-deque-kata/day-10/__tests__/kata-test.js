import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LinkedDeque from '../kata';

describe("linked deque", () => {
    let deque;
    let input;
    let addFront;

    beforeEach(() => {
        deque = TestUtils.renderIntoDocument(
            <LinkedDeque/>
        );
        input = TestUtils.findRenderedDOMComponentWithTag(deque, 'input');
        addFront = TestUtils.findRenderedDOMComponentWithClass(deque, 'add-front-button');
    });

    function getItems() {
        return TestUtils.scryRenderedDOMComponentsWithClass(deque, 'item').map((item) => Number(item.textContent));
    }

    function addItems(size, action) {
        for (let i = 1; i < size + 1; i++) {
            input.value = i * 10;
            TestUtils.Simulate.change(input);
            TestUtils.Simulate.click(action);
        }
    }

    function getRenderedDeque() {
        return TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;
    }

    test("newly create deque is empty", () => {
        expect(getItems()).toEqual([]);
    });

    test("add one item in front", () => {
        addItems(1, addFront);

        expect(getItems()).toEqual([10]);
    });

    test("add three items in front", () => {
        addItems(3, addFront);

        expect(getItems()).toEqual([30, 20, 10]);
    });

    test("remove item from front", () => {
        addItems(3, addFront);

        const removeFront = TestUtils.findRenderedDOMComponentWithClass(deque, 'remove-front-button');
        TestUtils.Simulate.click(removeFront);

        expect(getItems()).toEqual([20, 10]);
    });

    test("add three items in back", () => {
        const addBack = TestUtils.findRenderedDOMComponentWithClass(deque, 'add-back-button');

        addItems(3, addBack);

        expect(getItems()).toEqual([10, 20, 30]);
    });

    test("remove item from back", () => {
        addItems(3, addFront);

        const removeBack = TestUtils.findRenderedDOMComponentWithClass(deque, 'remove-back-button');
        TestUtils.Simulate.click(removeBack);

        expect(getItems()).toEqual([30, 20]);
    });

    test("empty deque rendered into an empty string", () => {
        expect(getRenderedDeque()).toBe('');
    });

    test("single item surrounded by '<-' and '->'", () => {
        addItems(1, addFront);

        expect(getRenderedDeque()).toBe('<-10->');
    });

    test("items that have neighbours surrounded by '<=>'", () => {
        addItems(3, addFront);

        expect(getRenderedDeque()).toBe('<-30<=>20<=>10->');
    })
});
