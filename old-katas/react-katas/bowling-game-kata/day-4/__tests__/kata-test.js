import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import BowlingGame from '../kata';

describe("bowling game", () => {
    let bowlingGame;
    let rollInput;
    let rollButton;
    let scoreButton;

    beforeEach(() => {
        bowlingGame = ReactTestUtils.renderIntoDocument(
            <BowlingGame/>
        );
        rollInput = ReactTestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'input');
        rollButton = ReactTestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'roll-button');

        scoreButton = ReactTestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'score-button');
    });

    function rollMany(times, pins) {
        for(let i = 0; i < times; i++) {
            rollInput.value = pins;
            ReactTestUtils.Simulate.change(rollInput);
            ReactTestUtils.Simulate.click(rollButton);
        }
    }

    function calculateScore() {
        ReactTestUtils.Simulate.click(scoreButton);
    }

    function getScore() {
        return Number(ReactTestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'span').textContent);
    }

    function rollSpare() {
        rollInput.value = 5;
        ReactTestUtils.Simulate.change(rollInput);
        ReactTestUtils.Simulate.click(rollButton);
        rollInput.value = 5;
        ReactTestUtils.Simulate.change(rollInput);
        ReactTestUtils.Simulate.click(rollButton);
    }

    function rollStrike() {
        rollInput.value = 10;
        ReactTestUtils.Simulate.change(rollInput);
        ReactTestUtils.Simulate.click(rollButton);
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
        ReactTestUtils.Simulate.change(rollInput);
        ReactTestUtils.Simulate.click(rollButton);

        rollMany(17, 0);

        calculateScore();

        expect(getScore()).toBe(16);
    });

    test("roll one strike", () => {
        rollStrike();

        rollInput.value = 3;
        ReactTestUtils.Simulate.change(rollInput);
        ReactTestUtils.Simulate.click(rollButton);
        rollInput.value = 4;
        ReactTestUtils.Simulate.change(rollInput);
        ReactTestUtils.Simulate.click(rollButton);

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
