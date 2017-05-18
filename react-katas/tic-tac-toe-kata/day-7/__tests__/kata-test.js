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

    test("'X' always starts a game", () => {
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

    test("game has nine squares", () => {
        expect(squares.length).toBe(9);
        expect(squares.map((square) => square.textContent)).toEqual(new Array(9).fill(''));
    });

    test("square is filled by player sign when clicked", () => {
        clickOnSquare(0, 0);
        expect(squares[0].textContent).toBe('X');
        clickOnSquare(0, 1);
        expect(squares[1].textContent).toBe('O');
    });

    test("square can't be refilled", () => {
        clickOnSquare(0, 0);
        expect(squares[0].textContent).toBe('X');
        expect(currentPlayer()).toBe('Current player: O');

        clickOnSquare(0, 0);
        expect(squares[0].textContent).toBe('X');
        expect(currentPlayer()).toBe('Current player: O');
    });
});
