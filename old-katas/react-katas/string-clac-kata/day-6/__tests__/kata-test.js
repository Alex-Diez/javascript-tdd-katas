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

    function getResult() {
        return ReactTestUtils.findRenderedDOMComponentWithTag(calculator, 'span').textContent;
    }

    function evaluateExpression(expression) {
        input.value = expression;
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);
    }

    test("evaluates an empty string into '0'", () => {
        evaluateExpression('');

        expect(getResult()).toBe('0');
    });

    test("evaluates a number into the number", () => {
        evaluateExpression('30');

        expect(getResult()).toBe('30');
    });

    test("evaluates addition", () => {
        evaluateExpression('40+20');

        expect(getResult()).toBe('60');
    });

    test("evaluates subtraction", () => {
        evaluateExpression('60-10');

        expect(getResult()).toBe('50');
    });

    test("evaluates multiplication", () => {
        evaluateExpression('40*8');

        expect(getResult()).toBe('320');
    });

    test("evaluates division", () => {
        evaluateExpression('50/10');

        expect(getResult()).toBe('5');
    });

    test("evaluates multiple operations", () => {
        evaluateExpression('10-40/8+49/7+2*3*5');

        expect(getResult()).toBe(String(10-40/8+49/7+2*3*5));
    });
});
