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

    function getDequeItems() {
        return ReactTestUtils.scryRenderedDOMComponentsWithClass(deque, 'item').map((item) => Number(item.textContent));
    }

    function addItems(number) {
        for (let i = 1; i < number + 1; i++) {
            input.value = i * 10;
            ReactTestUtils.Simulate.change(input);
            ReactTestUtils.Simulate.click(addFront);
        }
    }

    test("initial deque is empty", () => {
        const items = getDequeItems();

        expect(items.length).toBe(0);
    });

    test("add one item in front", () => {
        addItems(1);

        const items = getDequeItems();

        expect(items.length).toBe(1);
        expect(items).toEqual([10]);
    });

    test("add many items in front", () => {
        addItems(3);

        const items = getDequeItems();

        expect(items.length).toBe(3);
        expect(items).toEqual([30, 20, 10]);
    });

    test("remove item from front", () => {
        addItems(3);

        const removeFront = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'remove-front-button');
        ReactTestUtils.Simulate.click(removeFront);

        const items = getDequeItems();

        expect(items.length).toBe(2);
        expect(items).toEqual([20, 10]);
    });

    test("add items in back", () => {
        const addBack = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'add-back-button');

        for (let i = 1; i < 4; i++) {
            input.value = i * 10;
            ReactTestUtils.Simulate.change(input);
            ReactTestUtils.Simulate.click(addBack);
        }

        const items = getDequeItems();

        expect(items.length).toBe(3);
        expect(items).toEqual([10, 20, 30]);
    });

    test("remove items from back", () => {
        addItems(3);

        const removeBack = ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'remove-back-button');
        ReactTestUtils.Simulate.click(removeBack);

        const items = getDequeItems();

        expect(items.length).toBe(2);
        expect(items).toEqual([30, 20]);
    });

    test("image of empty deque is empty string", () => {
        expect(getItemsImage()).toBe('');
    });

    test("item connected to 'null' item with arrow", () => {
        addItems(1);

        expect(getItemsImage()).toBe("<-10->");
    });

    function getItemsImage() {
        return ReactTestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;
    }

    test("item connected to not 'null' item with double arrow", () => {
        addItems(3);

        expect(getItemsImage()).toBe('<-30<=>20<=>10->');
    })
});
