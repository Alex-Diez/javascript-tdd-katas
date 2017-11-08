import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Calculator from '../kata';

describe("calculator", () => {
    let calculator;
    let input;
    let evaluate;

    beforeEach(() => {
        calculator = ReactTestUtils.renderIntoDocument(
            <Calculator/>
        );
        input = ReactTestUtils.findRenderedDOMComponentWithTag(calculator, 'input');
        evaluate = ReactTestUtils.findRenderedDOMComponentWithTag(calculator, 'button');
    });

    function evaluateExpression(expression) {
        input.value = expression;
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);
    }

    function getResult() {
        return ReactTestUtils.findRenderedDOMComponentWithTag(calculator, 'span').textContent;
    }

    test("evaluates an empty string into '0'", () => {
        evaluateExpression('');

        expect(getResult()).toBe(String(0));
    });

    test("evaluates a number into the number", () => {
        evaluateExpression('20');

        expect(getResult()).toBe(String(20));
    });

    test("evaluates addition", () => {
        evaluateExpression('50+20');

        expect(getResult()).toBe(String(50 + 20));
    });

    test("evaluates subtraction", () => {
        evaluateExpression('60-10');

        expect(getResult()).toBe(String(60 - 10));
    });

    test("evaluates multiplication", () => {
        evaluateExpression('50*2');

        expect(getResult()).toBe(String(50 * 2));
    });

    test("evaluates division", () => {
        evaluateExpression('49/7');

        expect(getResult()).toBe(String(49 / 7));
    });

    test("evaluates multiple operations", () => {
        evaluateExpression('10-40/8*2+45/9/5');

        expect(getResult()).toBe(String(10-40/8*2+45/9/5));
    });
});
