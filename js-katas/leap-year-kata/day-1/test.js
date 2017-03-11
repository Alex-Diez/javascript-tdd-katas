const isLeapYear = require("./kata");

describe("leap year kata", () => {
    test("leap year is divided by 4", () => {
        expect(isLeapYear(2016)).toBe(true);
    });

    test("regular year is not divided by ", () => {
        expect(isLeapYear(2013)).toBe(false);
    });

    test("regular year is divided by 100", () => {
        expect(isLeapYear(1900)).toBe(false);
    });

    test("leap year is divided by 400", () => {
        expect(isLeapYear(2000)).toBe(true);
    });
});
