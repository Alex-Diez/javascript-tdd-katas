import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Calculator from '../kata';

describe("calculator", () => {
    let calculator;
    let input;
    let evaluate;

    beforeEach(() => {
        calculator = TestUtils.renderIntoDocument(
            <Calculator/>
        );
        input = TestUtils.findRenderedDOMComponentWithTag(calculator, 'input');
        evaluate = TestUtils.findRenderedDOMComponentWithTag(calculator, 'button');
    });

    function evaluateExpression(expression) {
        input.value = expression;
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);
    }

    function getResult() {
        return TestUtils.findRenderedDOMComponentWithTag(calculator, 'span').textContent;
    }

    test("evaluates an empty string into '0'", () => {
        evaluateExpression('');

        expect(getResult()).toBe(String(0));
    });

    test("evaluates a number into the number", () => {
        evaluateExpression('20');

        expect(getResult()).toBe(String(20));
    });
});
