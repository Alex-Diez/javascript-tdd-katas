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

        expect(getResult()).toBe('0');
    });

    test("evaluates a number into the number", () => {
        evaluateExpression('40');

        expect(getResult()).toBe('40');
    });

    test("evaluates addition", () => {
        evaluateExpression('50+20');

        expect(getResult()).toBe('70');
    });

    test("evaluates subtraction", () => {
        evaluateExpression('50-30');

        expect(getResult()).toBe('20');
    });

    test("evaluates multiplication", () => {
        evaluateExpression('40*10');

        expect(getResult()).toBe('400');
    });

    test("evaluates division", () => {
        evaluateExpression('50/5');

        expect(getResult()).toBe('10');
    });

    test("evaluates multiple operations", () => {
        evaluateExpression('40+20/4*2-100/10/10');

        expect(getResult()).toBe(String(40+20/4*2-100/10/10));
    });
});
