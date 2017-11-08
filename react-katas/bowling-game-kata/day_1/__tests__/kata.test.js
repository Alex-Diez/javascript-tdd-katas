import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import BowlingGame from '../kata';

describe('bowling game kata tests', () => {
    const rollMany = (times, pin) => {
        for(let i = 0; i < times; i++) {
            rollOnce(pin);
        }
    };

    const rollOnce = (pin) => {
        pinInput.value = pin;
        ReactTestUtils.Simulate.change(pinInput);
        ReactTestUtils.Simulate.click(roll);
    };

    const rollSpare = () => {
        rollOnce(4);
        rollOnce(6);
    };

    const rollStrike = () => rollOnce(10);

    let pinInput;
    let roll;
    let score;

    beforeEach(() => {
        const bowlingGame = ReactTestUtils.renderIntoDocument(<BowlingGame/>);
        pinInput = ReactTestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'input');
        roll = ReactTestUtils.findRenderedDOMComponentWithTag(bowlingGame, 'button');
        score = ReactTestUtils.findRenderedDOMComponentWithClass(bowlingGame, 'score');
    });

    test('gutter game', () => {
        rollMany(20, 0);

        expect(Number(score.textContent)).toBe(0);
    });

    test('all ones', () => {
        rollMany(20, 1);

        expect(Number(score.textContent)).toBe(20);
    });

    test('one spare', () => {
        rollSpare();
        rollOnce(3);
        rollMany(17, 0);

        expect(Number(score.textContent)).toBe(16);
    });

    test('one strike', () => {
        rollStrike();
        rollOnce(3);
        rollOnce(4);
        rollMany(16, 0);

        expect(Number(score.textContent)).toBe(24);
    });
});
