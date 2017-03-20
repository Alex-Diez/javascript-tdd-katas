import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from '../kata';

describe("check box with label", () => {
    let checkbox;
    let checkboxNode;

    beforeEach(() => {
        checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel/>
        );
        checkboxNode = ReactDOM.findDOMNode(checkbox);
    });

    function clickCheckbox() {
        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );
    }

    test("label text contains 'Off'", () => {
        expect(checkboxNode.textContent).toBe('Off');
    });

    test("label text contains 'On' when box checked", () => {
        clickCheckbox();

        expect(checkboxNode.textContent).toBe('On');
    });

    test("label text contains 'Off' when box clicked twice", () => {
        clickCheckbox();
        clickCheckbox();

        expect(checkboxNode.textContent).toBe('Off');
    })
});
