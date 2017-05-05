import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Converter from '../kata';

describe("roman number", () => {
    let converter;
    let input;
    let convert;

    beforeEach(() => {
        converter = TestUtils.renderIntoDocument(
            <Converter/>
        );
        input = TestUtils.findRenderedDOMComponentWithTag(converter, 'input');
        convert = TestUtils.findRenderedDOMComponentWithTag(converter, 'button');
    });

    function convertArabic(arabic) {
        input.value = arabic;
        TestUtils.Simulate.change(input);
        TestUtils.Simulate.click(convert);
    }

    function conversionResult() {
        return TestUtils.findRenderedDOMComponentWithTag(converter, 'span').textContent;
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
