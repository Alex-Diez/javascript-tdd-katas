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

    test("calculator evaluates an empty string into '0'", () => {
        input.value = '';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('0');
    });

    test("calculator evaluates a number to the number", () => {
        input.value = '30';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('30');
    });

    test("calculator evaluates addition", () => {
        input.value = '30+40';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('70');
    });

    test("calculator evaluates subtraction", () => {
        input.value = '50-10';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('40');
    });

    test("calculator evaluates multiplication", () => {
        input.value = '40*8';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('320');
    });

    test("calculator evaluates division", () => {
        input.value = '300/5';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('60');
    });

    test("calculator evaluates multiple operations", () => {
        input.value = '30-10*2+550/11';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('60');
    });
});
