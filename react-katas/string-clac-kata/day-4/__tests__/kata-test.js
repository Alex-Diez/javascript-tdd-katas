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

    test("calculator evaluates a number into the number", () => {
        input.value = '10';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('10');
    });

    test("calculator evaluates addition", () => {
        input.value = '20+30';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('50');
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
        input.value = '48/6';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('8');
    });

    test("calculator evaluates multiple operations", () => {
        input.value = '45-30*5+300/3/4';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('-80');
    });
});
