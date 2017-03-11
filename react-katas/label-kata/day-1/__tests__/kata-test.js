import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-addons-test-utils'
import CheckboxWithLabel from '../kata'

describe("check box with label", () => {
    let checkbox;

    beforeEach(() => {
        checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel/>
        )
    });

    test('label text should be "Off"', () => {
        const checkboxNode = ReactDom.findDOMNode(checkbox);

        expect(checkboxNode.textContent).toBe("Off");
    });

    test('label text should be "On" when checked', () => {
        const checkboxNode = ReactDom.findDOMNode(checkbox);

        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );

        expect(checkboxNode.textContent).toBe("On");
    });

    test('label text should be "Off" when label clicked twice', () => {
        const checkboxNode = ReactDom.findDOMNode(checkbox);

        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );

        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );

        expect(checkboxNode.textContent).toBe("Off");
    });
});
