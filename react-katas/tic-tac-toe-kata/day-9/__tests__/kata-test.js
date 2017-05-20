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
        return ReactTestUtils.findRenderedDOMComponentWithClass(game, 'current-player').textContent;
    }

    function clickOnSquare(col, row) {
        ReactTestUtils.Simulate.click(squares[col * 3 + row]);
    }

    function signOfSquare(col, row) {
        return squares[col * 3 + row].textContent;
    }

    test("'X' always starts the game", () => {
        expect(currentPlayer()).toBe('Current player: X');
    });

    test("'O' is the next player after 'X'", () => {
        clickOnSquare(0, 0);

        expect(currentPlayer()).toBe('Current player: O');
    });

    test("'X' is the next player after 'O'", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);

        expect(currentPlayer()).toBe('Current player: X');
    });

    test("squares are filled by players signs", () => {
        clickOnSquare(0, 0);
        expect(signOfSquare(0, 0)).toBe('X');

        clickOnSquare(0, 1);
        expect(signOfSquare(0, 1)).toBe('O');
    });

    test("game has nine squares", () => {
        expect(squares.length).toBe(9);
        expect(squares.map((square) => square.textContent)).toEqual(new Array(9).fill(''));
    });

    test("square can't be refilled", () => {
        clickOnSquare(0, 0);
        expect(signOfSquare(0, 0)).toBe('X');
        expect(currentPlayer()).toBe('Current player: O');

        clickOnSquare(0, 0);
        expect(signOfSquare(0, 0)).toBe('X');
        expect(currentPlayer()).toBe('Current player: O');
    })
});
