import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import CheckboxWithLabel from '../kata';

describe("check box with label", () => {
    let checkbox;
    let checkboxNode;

    function clickCheckbox() {
        ReactTestUtils.Simulate.change(
            ReactTestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );
    }

    beforeEach(() => {
        checkbox = ReactTestUtils.renderIntoDocument(
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
