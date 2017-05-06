import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Converter from '../kata';

describe("roman number", () => {
    let converter;
    let input;
    let convert;

    beforeEach(() => {
        converter = ReactTestUtils.renderIntoDocument(
            <Converter/>
        );
        input = ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'input');
        convert = ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'button');
    });

    function convertArabic(arabic) {
        input.value = arabic;
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(convert);
    }

    function conversionResult() {
        return ReactTestUtils.findRenderedDOMComponentWithTag(converter, 'span').textContent;
    }

    test("'0' is converted into an empty string", () => {
        convertArabic(0);

        expect(conversionResult()).toBe('');
    });

    test("'1' is converted into 'I'", () => {
        convertArabic(1);

        expect(conversionResult()).toBe('I');
    });

    test("'5' is converted into 'V'", () => {
        convertArabic(5);

        expect(conversionResult()).toBe('V');
    });

    test("'2' is converted into 'II'", () => {
        convertArabic(2);

        expect(conversionResult()).toBe('II');
    });

    test("'4' is converted into 'IV'", () => {
        convertArabic(4);

        expect(conversionResult()).toBe('IV');
    });
});
