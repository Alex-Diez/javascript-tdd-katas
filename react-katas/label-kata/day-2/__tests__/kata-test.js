import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import CheckboxWithLabel from '../kata';

describe("check box with label", () => {
    let checkbox;
    let checkboxNode;

    function clickOnCheckbox() {
        ReactTestUtils.Simulate.change(
            ReactTestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );
    }

    beforeEach(() => {
        checkbox = ReactTestUtils.renderIntoDocument(
            <CheckboxWithLabel/>
        );
        checkboxNode = ReactDom.findDOMNode(checkbox);
    });

    test("initially, check box contains 'Off' text", () => {
        expect(checkboxNode.textContent).toBe("Off");
    });

    test("check box label contains 'On' text when clicked", () => {
        clickOnCheckbox();

        expect(checkboxNode.textContent).toBe('On');
    });

    test("check box label contains 'Off' when clicked two times", () => {
        clickOnCheckbox();
        clickOnCheckbox();

        expect(checkboxNode.textContent).toBe('Off');
    });
});
