import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import CheckboxWithLabel from '../kata';

describe("check box with label", () => {
    let checkbox;
    let checkboxNode;

    beforeEach(() => {
        checkbox = ReactTestUtils.renderIntoDocument(
            <CheckboxWithLabel/>
        );
        checkboxNode = ReactDOM.findDOMNode(checkbox);
    });

    function clickCheckbox() {
        ReactTestUtils.Simulate.change(
            ReactTestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
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
