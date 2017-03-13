import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from '../kata';

describe("checkbox with a label", () => {
    let checkbox;
    let checkboxNode;

    beforeEach(() => {
        checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel/>
        );
        checkboxNode = ReactDOM.findDOMNode(checkbox);
    });

    function checkTheBox() {
        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );
    }

    test("label text should be 'Off'", () => {
        expect(checkboxNode.textContent).toBe('Off');
    });

    test("label text should be 'On' when checkbox is checked", () => {
        checkTheBox();

        expect(checkboxNode.textContent).toBe('On');
    });

    test("label text should be 'Off' when clicked twice", () => {
        checkTheBox();
        checkTheBox();

        expect(checkboxNode.textContent).toBe('Off');
    })
});
