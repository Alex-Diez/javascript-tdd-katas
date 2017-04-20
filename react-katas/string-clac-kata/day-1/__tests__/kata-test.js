import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Calculator from '../kata'

describe("calculator", () => {
    let calc;
    let input;
    let evaluate;

    beforeEach(() => {
        calc = TestUtils.renderIntoDocument(
            <Calculator/>
        );
        input = TestUtils.findRenderedDOMComponentWithTag(calc, 'input');
        evaluate = TestUtils.findRenderedDOMComponentWithTag(calc, 'button');
    });

    function getResult() {
        return TestUtils.findRenderedDOMComponentWithTag(calc, 'span').textContent;
    }

    test("empty string evaluates into '0'", () => {
        input.value = '';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('0');
    });

    test("a number string is evaluated into the number", () => {
        input.value = '20';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('20');
    });

    test("calculator evaluates addition", () => {
        input.value = '10+20';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('30');
    });

    test("calculator evaluates subtraction", () => {
        input.value = '40-10';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('30');
    });

    test("calculator evaluates multiplication", () => {
        input.value = '2*10';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('20');
    });

    test("calculator evaluates division", () => {
        input.value = '25/5';
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('5');
    });

    test("calculator evaluates several operations", () => {
       input.value = '40-10*2+35/7';
       TestUtils.Simulate.change(input);
       TestUtils.Simulate.click(evaluate);

       expect(getResult()).toBe('25');
    });
});
