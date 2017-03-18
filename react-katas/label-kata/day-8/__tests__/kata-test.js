import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from '../kata';

describe("checkbox with label", () => {
    let checkbox;
    let checkboxNode;

    beforeEach(() => {
        checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel/>
        );

        checkboxNode = ReactDOM.findDOMNode(checkbox);
    });

    test("label text contains 'Off'", () => {
        expect(checkboxNode.textContent).toBe('Off');
    });

    test("label text contains 'On' when box checked", () => {
        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );

        expect(checkboxNode.textContent).toBe('On');
    });

    test("label text contains 'Off' when box clicked twice", () => {
        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );

        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );

        expect(checkboxNode.textContent).toBe('Off');
    });
});
