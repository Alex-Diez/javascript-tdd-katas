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
        evaluateExpression('10');

        expect(getResult()).toBe(String(10));
    });

    test("evaluates addition", () => {
        evaluateExpression('10+20');

        expect(getResult()).toBe(String(10 + 20));
    });

    test("evaluates subtraction", () => {
        evaluateExpression('50-10');

        expect(getResult()).toBe(String(50 - 10));
    });

    test("evaluates multiplication", () => {
        evaluateExpression('2*5');

        expect(getResult()).toBe(String(2 * 5));
    });

    test("evaluate division", () => {
        evaluateExpression('10/5');

        expect(getResult()).toBe(String(10 / 5));
    });

    test("evalaute multiple operations", () => {
        evaluateExpression('10+40/4/2-5*4');

        expect(getResult()).toBe(String(10 + 40 / 4 / 2 - 5 * 4));
    });
});
