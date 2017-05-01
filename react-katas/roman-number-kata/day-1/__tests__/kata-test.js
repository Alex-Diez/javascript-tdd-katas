import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RomanNumber from '../kata';

describe("roman numbers", () => {
    let converter;
    let input;
    let convert;

    beforeEach(() => {
        converter = TestUtils.renderIntoDocument(
            <RomanNumber/>
        );
        input = TestUtils.findRenderedDOMComponentWithTag(converter, 'input');
        convert = TestUtils.findRenderedDOMComponentWithTag(converter, 'button');
    });

    function conversionResult() {
        return TestUtils.findRenderedDOMComponentWithTag(converter, 'span').textContent;
    }

    function romanInput(number) {
        input.value = number;
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(convert);
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
