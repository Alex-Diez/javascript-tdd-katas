import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Game from '../kata';

describe("tic tac toe", () => {
    let game;
    let squares;

    beforeEach(() => {
        game = ReactTestUtils.renderIntoDocument(
            <Game/>
        );

        squares = ReactTestUtils.scryRenderedDOMComponentsWithClass(game, 'square');
    });

    function currentPlayer() {
        return ReactTestUtils.findRenderedDOMComponentWithClass(game, 'player-info').textContent;
    }

    function clickOnSquare(col, row) {
        ReactTestUtils.Simulate.click(squares[col * 3 + row]);
    }

    function signOfSquare(col, row) {
        return squares[col * 3 + row].textContent;
    }

    test("'X' is always start the game", () => {
        expect(currentPlayer()).toBe('Current player: X');
    });

    test("game has nine squares", () => {
        expect(squares.length).toBe(9);
        expect(squares.map((square) => square.textContent)).toEqual(new Array(9).fill(''));
    });

    test("the next player is 'O' after 'X' made a move", () => {
        clickOnSquare(0, 0);

        expect(currentPlayer()).toBe('Current player: O');
    });

    test("the next player is 'X' after 'O' made a move", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);

        expect(currentPlayer()).toBe('Current player: X');
    });

    test("squares are filled by player signs", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);

        expect(signOfSquare(0, 0)).toBe('X');
        expect(signOfSquare(0, 1)).toBe('O');
    });

    test("squares can be double filled", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 0);

        expect(currentPlayer()).toBe('Current player: O');
        expect(signOfSquare(0, 0)).toBe('X');
    });
});
