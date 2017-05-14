import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {Game, Square} from '../kata';

describe("tic tac toe", () => {
    let game;

    beforeEach(() => {
        game = ReactTestUtils.renderIntoDocument(
            <Game/>
        );
    });

    function nextPlayer() {
        return ReactTestUtils.findRenderedDOMComponentWithClass(game, 'game-info').textContent;
    }

    function clickOnButton(index) {
        const leftLeft = ReactTestUtils.scryRenderedComponentsWithType(game, Square)[index];

        const leftLeftButton = ReactTestUtils.findRenderedDOMComponentWithClass(leftLeft, 'square');

        ReactTestUtils.Simulate.click(leftLeftButton);
    }

    test("'X' is starting a new game", () => {
        expect(nextPlayer()).toBe('Next player: X');
    });

    test("'O' is the next player after 'X'", () => {
        clickOnButton(0);

        expect(nextPlayer()).toBe('Next player: O');
    });

    test("'X' is the next player after 'O'", () => {
        clickOnButton(0);

        clickOnButton(1);

        expect(nextPlayer()).toBe('Next player: X');
    });
});
