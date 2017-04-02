import React from 'react';
import TestUtils from 'react-addons-test-utils';
import BowlingGame from "../kata";

describe("bowling game", () => {
    let bowlingGame;
    let inputField;
    let rollButton;
    let scoreButton;

    function rollMany(times, pins) {
        for (let i = 0; i < times; i++) {
            inputField.value = pins;
            TestUtils.Simulate.change(inputField);
            TestUtils.Simulate.click(rollButton);
        }
    }

    function getScore() {
        return Number(TestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'span').textContent)
    }

    function rollSpare() {
        inputField.value = 5;
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(rollButton);
        inputField.value = 5;
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(rollButton);
    }

    function rollStrike() {
        inputField.value = 10;
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(rollButton);
    }

    beforeEach(() => {
        bowlingGame = TestUtils.renderIntoDocument(
            <BowlingGame/>
        );

        inputField = TestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'input');
        rollButton = TestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'roll-button');

        scoreButton = TestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'score-button');
    });

    test("gutter game", () => {
        rollMany(20, 0);

        TestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(0);
    });

    test("roll all ones", () => {
        rollMany(20, 1);

        TestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(20);
    });

    test("roll one spare", () => {
        rollSpare();

        inputField.value = 3;
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(rollButton);

        rollMany(17, 0);

        TestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(16);
    });

    test("roll one strike", () => {
        rollStrike();

        inputField.value = 3;
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(rollButton);
        inputField.value = 4;
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(rollButton);

        rollMany(16, 0);

        TestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(24);
    });

    test("perfect game", () => {
        rollMany(13, 10);

        TestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(300);
    });
});
