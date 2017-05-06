import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import BowlingGame from '../kata';

describe("bowling game", () => {
    let bowlingGame;
    let inputField;
    let rollButton;
    let scoreButton;

    beforeEach(() => {
        bowlingGame = ReactTestUtils.renderIntoDocument(
            <BowlingGame/>
        );
        inputField = ReactTestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'input');
        rollButton = ReactTestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'roll-button');
        scoreButton = ReactTestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'score-button');
    });

    function rollMany(times, pin) {
        for(let i = 0; i < times; i++) {
            inputField.value = pin;
            ReactTestUtils.Simulate.change(inputField);
            ReactTestUtils.Simulate.click(rollButton);
        }
    }

    function rollSpare() {
        inputField.value = 5;
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(rollButton);
        inputField.value = 5;
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(rollButton);
    }

    function rollStrike() {
        inputField.value = 10;
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(rollButton);
    }

    function getScore() {
        return Number(ReactTestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'span').textContent);
    }

    test("gutter game", () => {
        rollMany(20, 0);

        ReactTestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(0);
    });

    test("all ones", () => {
        rollMany(20, 1);

        ReactTestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(20);
    });

    test("roll one spare", () => {
        rollSpare();
        inputField.value = 3;
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(rollButton);

        rollMany(17, 0);

        ReactTestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(16);
    });

    test("roll one strike", () => {
        rollStrike();
        inputField.value = 3;
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(rollButton);
        inputField.value = 4;
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(rollButton);

        rollMany(16, 0);

        ReactTestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(24);
    });

    test("perfect game", () => {
        rollMany(13, 10);

        ReactTestUtils.Simulate.click(scoreButton);

        expect(getScore()).toBe(300);
    });

    test("score button is disabled during the game", () => {
        expect(scoreButton.disabled).toBe(true);
    });

    test("roll button is disabled after the game", () => {
        rollMany(20, 0);

        expect(rollButton.disabled).toBe(true);
    })
});
