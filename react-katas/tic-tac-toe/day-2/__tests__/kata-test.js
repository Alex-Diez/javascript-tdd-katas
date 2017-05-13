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
            .map((square) => ReactTestUtils.findRenderedDOMComponentWithClass(square, 'square'));
    });

    function nextPlayer() {
        return ReactTestUtils.findRenderedDOMComponentWithClass(game, 'game-info').textContent;
    }

    function clickOnSquare(col, row) {
        ReactTestUtils.Simulate.click(squares[col * 3 + row]);
    }

    function signOn(col, row) {
        return squares[col * 3 + row].textContent;
    }

    test("the 'X' is start a game", () => {
        expect(nextPlayer()).toBe('Next player: X');
    });

    test("the next player after 'X' is 'O'", () => {
        clickOnSquare(0, 0);

        expect(nextPlayer()).toBe('Next player: O');
    });

    test("the next player after 'O' is 'X'", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);

        expect(nextPlayer()).toBe('Next player: X');
    });

    test("a square should be filled by 'X' when 'X' player click on it", () => {
        clickOnSquare(0, 0);

        expect(signOn(0, 0)).toBe('X');
    });

    test("a square should be filled by 'O' when 'O' player click on it", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);

        expect(signOn(0, 1)).toBe('O');
    });

    test("player should not be changed when clicked on the filled 'square'", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 0);

        expect(nextPlayer()).toBe('Next player: O');
    });

    test("game should have nine squares", () => {
        expect(squares.length).toBe(9);
    });

    test("fill all squares", () => {
        squares.forEach((square) => ReactTestUtils.Simulate.click(square));

        const filledGame = squares.map((square) => square.textContent);

        expect(filledGame).toEqual(['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']);
    });
});
