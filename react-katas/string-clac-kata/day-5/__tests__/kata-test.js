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

    function getResult() {
        return TestUtils.findRenderedDOMComponentWithTag(calculator, 'span').textContent;
    }

    function evaluateExpression(expression) {
        input.value = expression;
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);
    }

    test("calculator evaluates an empty string to '0'", () => {
        evaluateExpression('');

        expect(getResult()).toBe('0');
    });

    test("calculator evaluates a number into the number", () => {
        evaluateExpression('10');

        expect(getResult()).toBe('10');
    });

    test("calculator evaluates addition", () => {
        evaluateExpression('40+20');

        expect(getResult()).toBe('60');
    });

    test("calculator evaluates subtraction", () => {
        evaluateExpression('50-10');

        expect(getResult()).toBe('40');
    });

    test("calculator evaluates multiplication", () => {
        evaluateExpression('20*5');

        expect(getResult()).toBe('100');
    });

    test("calculator evaluates division", () => {
        evaluateExpression('40/4');

        expect(getResult()).toBe('10');
    });

    test("calculator evaluates multiple operations", () => {
        evaluateExpression('100-33/3+24*2/6');

        expect(getResult()).toBe('97');
    });
});
