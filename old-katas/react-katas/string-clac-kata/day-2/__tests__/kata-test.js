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

    test("calculator evaluates an empty string into '0'", () => {
        input.value = '';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('0');
    });

    test("calculator evaluates a number into the number", () => {
        input.value = '20';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('20');
    });

    test("calculator evaluates addition", () => {
        input.value = '40+10';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('50');
    });

    test("calculator evaluates subtraction", () => {
        input.value = '50-20';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('30');
    });

    test("calculator evaluates multiplication", () => {
        input.value = '5*30';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('150');
    });

    test("calculator evaluates division", () => {
        input.value = '160/4';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('40');
    });

    test("calculator evaluates multiple operations", () => {
        input.value = '10+20/2-4*6+33/3';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('7');
    });
});
