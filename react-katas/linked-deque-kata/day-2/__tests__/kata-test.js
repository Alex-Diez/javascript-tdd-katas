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

    function addItems(items, action) {
        for (let i = 1; i < items + 1; i++) {
            input.value = i * 10;
            TestUtils.Simulate.change(input);
            TestUtils.Simulate.click(action);
        }
    }

    test("newly created deque is empty", () => {
        const items = getItems();

        expect(items.length).toBe(0);

        const renderedItems = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedItems).toBe('');
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

    test("add items in back", () => {
        const addBack = TestUtils.findRenderedDOMComponentWithClass(deque, 'add-back-button');
        addItems(3, addBack);

        const items = getItems();

        expect(items.length).toBe(3);
        expect(items).toEqual([10, 20, 30]);
    });

    test("remove item from back", () => {
        addItems(3, addFront);

        const removeBack = TestUtils.findRenderedDOMComponentWithClass(deque, 'remove-back-button');
        TestUtils.Simulate.click(removeBack);

        const items = getItems();

        expect(items.length).toBe(2);
        expect(items).toEqual([30, 20]);
    });

    test("arrows should be around single item", () => {
        addItems(1, addFront);

        const renderedItems = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedItems).toBe('<-10->');
    });

    test("doubled arrows should be around items", () => {
        addItems(3, addFront);

        const  renderedItems = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedItems).toBe('<-30<=>20<=>10->');
    })

});
