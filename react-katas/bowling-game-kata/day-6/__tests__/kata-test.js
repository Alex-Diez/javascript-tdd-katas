import React from 'react';
import TestUtils from 'react-addons-test-utils';
import BowlingGame from '../kata';

describe("bowling game", () => {
    let bowlingGame;
    let rollInput;
    let rollButton;
    let scoreButton;

    beforeEach(() => {
        bowlingGame = TestUtils.renderIntoDocument(
            <BowlingGame/>
        );
        rollInput = TestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'input');
        rollButton = TestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'roll-button');
        scoreButton = TestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'score-button');
    });

    function rollMany(times, pins) {
        for (let i = 0; i < times; i++) {
            rollInput.value = pins;
            TestUtils.Simulate.change(rollInput);
            TestUtils.Simulate.click(rollButton);
        }
    }

    function calculateScore() {
        TestUtils.Simulate.click(scoreButton);
    }

    function getScore() {
        return Number(TestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'span').textContent);
    }

    function rollSpare() {
        rollInput.value = 5;
        TestUtils.Simulate.change(rollInput);
        TestUtils.Simulate.click(rollButton);
        rollInput.value = 5;
        TestUtils.Simulate.change(rollInput);
        TestUtils.Simulate.click(rollButton);
    }

    test("gutter game", () => {
        rollMany(20, 0);

        calculateScore();

        expect(getScore()).toBe(0);
    });

    test("roll all ones", () => {
        rollMany(20, 1);

        calculateScore();

        expect(getScore()).toBe(20);
    });

    test("roll one spare", () => {
        rollSpare();

        rollInput.value = 3;
        TestUtils.Simulate.change(rollInput);
        TestUtils.Simulate.click(rollButton);

        rollMany(17, 0);

        calculateScore();

        expect(getScore()).toBe(16);
    });

    test("roll one strike", () => {
        rollInput.value = 10;
        TestUtils.Simulate.change(rollInput);
        TestUtils.Simulate.click(rollButton);

        rollInput.value = 3;
        TestUtils.Simulate.change(rollInput);
        TestUtils.Simulate.click(rollButton);
        rollInput.value = 4;
        TestUtils.Simulate.change(rollInput);
        TestUtils.Simulate.click(rollButton);

        rollMany(16, 0);

        calculateScore();

        expect(getScore()).toBe(24);
    });

    test("perfect game", () => {
        rollMany(13, 10);

        calculateScore();

        expect(getScore()).toBe(300);
    });
});
