import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import RomanNumber from '../kata';

describe("roman numbers", () => {
    let converter;
    let input;
    let convert;

    beforeEach(() => {
        converter = ReactTestUtils.renderIntoDocument(
            <RomanNumber/>
        );
        input = ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'input');
        convert = ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'button');
    });

    function conversionResult() {
        return ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'span').textContent;
    }

    function romanInput(number) {
        input.value = number;
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(convert);
    }

    test("'0' is converted into an empty string", () => {
        romanInput(0);

        expect(conversionResult()).toBe('');
    });

    test("'1' is converted into 'I'", () => {
        romanInput(1);

        expect(conversionResult()).toBe('I');
    });

    test("'2' is converted into 'II'", () => {
        romanInput(2);

        expect(conversionResult()).toBe('II');
    });

    test("'5' is converted into 'v'", () => {
        romanInput(5);

        expect(conversionResult()).toBe('V');
    });
});
