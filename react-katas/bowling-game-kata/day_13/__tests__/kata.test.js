import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BowlingGame from '../kata';

configure({adapter: new Adapter()});

describe('bowling game', () => {
    let pinInput;
    let roll;
    let score;

    beforeEach(() => {
        const bowlingGame = mount(<BowlingGame/>);
        pinInput = bowlingGame.find('input');
        roll = bowlingGame.find('button');
        score = bowlingGame.find('span');
    });

    const rollMany = (times, pin) =>
        Array.from(new Array(times))
            .forEach(_ => rollOnce(pin));

    const rollOnce = (pin) => {
        pinInput.simulate('change', {target: {value: pin}});
        roll.simulate('click');
    };

    const rollSpare = () => {
        rollOnce(4);
        rollOnce(6);
    };

    test('gutter game', () => {
        rollMany(20, 0);

        expect(score.text()).toBe('0');
    });

    test('all ones', () => {
        rollMany(20, 1);

        expect(score.text()).toBe('20');
    });

    test('one spare', () => {
        rollSpare();
        rollOnce(3);
        rollMany(17, 0);

        expect(score.text()).toBe('16');
    });

    test('one strike', () => {
        rollOnce(10);
        rollOnce(4);
        rollOnce(3);

        rollMany(16, 0);

        expect(score.text()).toBe('24');
    });

    test('perfect game', () => {
        rollMany(13, 10);

        expect(score.text()).toBe('300');
    });
});
