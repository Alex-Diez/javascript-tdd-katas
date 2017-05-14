import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {Game, Square} from '../kata';

describe("tic tac toe", () => {
    let game;
    let squares;

    beforeEach(() => {
        game = ReactTestUtils.renderIntoDocument(
            <Game/>
        );

        squares = ReactTestUtils.scryRenderedComponentsWithType(game, Square)
            .map(((compoent) => ReactTestUtils.findRenderedDOMComponentWithClass(compoent, 'square')));
    });

    function playerInfo() {
        return ReactTestUtils.findRenderedDOMComponentWithClass(game, 'player-info').textContent;
    }

    function clickOnSquare(col, row) {
        ReactTestUtils.Simulate.click(squares[col * 3 + row]);
    }

    function signOfSquare(col, row) {
        return squares[col * 3 + row].textContent;
    }

    test("'X' is always the first", () => {
        expect(playerInfo()).toBe('Next player: X');
    });

    test("'O' is the next after 'X' made a move", () => {
        clickOnSquare(0, 0);

        expect(playerInfo()).toBe('Next player: O');
    });

    test("'X' is the next after 'O' made a move", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);

        expect(playerInfo()).toBe('Next player: X');
    });

    test("square filled by player sign when clicked", () => {
        clickOnSquare(0, 0);

        expect(signOfSquare(0, 0)).toBe('X');

        clickOnSquare(0, 1);

        expect(signOfSquare(0, 1)).toBe('O');
    });

    test("player can click on filled square", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 0);

        expect(playerInfo()).toBe('Next player: O');
        expect(signOfSquare(0, 0)).toBe('X');
    });

    test("game has 9 empty square", () => {
        expect(squares.map((square) => square.textContent)).toEqual(new Array(9).fill(''));
    });
});
