import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Calculator from '../kata'

describe("calculator", () => {
    let calc;
    let input;
    let evaluate;

    beforeEach(() => {
        calc = ReactTestUtils.renderIntoDocument(
            <Calculator/>
        );
        input = ReactTestUtils.findRenderedDOMComponentWithTag(calc, 'input');
        evaluate = ReactTestUtils.findRenderedDOMComponentWithTag(calc, 'button');
    });

    function getResult() {
        return ReactTestUtils.findRenderedDOMComponentWithTag(calc, 'span').textContent;
    }

    test("empty string evaluates into '0'", () => {
        input.value = '';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('0');
    });

    test("a number string is evaluated into the number", () => {
        input.value = '20';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('20');
    });

    test("calculator evaluates addition", () => {
        input.value = '10+20';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('30');
    });

    test("calculator evaluates subtraction", () => {
        input.value = '40-10';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('30');
    });

    test("calculator evaluates multiplication", () => {
        input.value = '2*10';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('20');
    });

    test("calculator evaluates division", () => {
        input.value = '25/5';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(evaluate);

        expect(getResult()).toBe('5');
    });

    test("calculator evaluates several operations", () => {
       input.value = '40-10*2+35/7';
       ReactTestUtils.Simulate.change(input);
       ReactTestUtils.Simulate.click(evaluate);

       expect(getResult()).toBe('25');
    });
});
