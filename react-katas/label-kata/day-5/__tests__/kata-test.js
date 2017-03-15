import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from '../kata';

describe("check box with label", () => {
    let checkbox;
    let checkboxNode;

    function clickCheckbox() {
        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );
    }

    beforeEach(() => {
        checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel/>
        );

        checkboxNode = ReactDOM.findDOMNode(checkbox);
    });

    test("label text should contain 'Off'", () => {
        expect(checkboxNode.textContent).toBe('Off');
    });

    test("label text should contain 'On' when box is checked", () => {
        clickCheckbox();

        expect(checkboxNode.textContent).toBe('On');
    });

    test("label text should contain 'Off' when box checked twice", () => {
        clickCheckbox();
        clickCheckbox();

        expect(checkboxNode.textContent).toBe('Off');
    });
});
