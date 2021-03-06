const BowlingGame = require("./kata");

describe("bowling game kata", () => {
    var game;

    beforeEach(() => {
        game = new BowlingGame();
    });

    function rollMany(times, pins) {
        for(var i = 0; i < times; i++) {
            game.roll(pins);
        }
    }

    test("gutter game", () => {
        rollMany(20, 0);

        expect(game.score()).toBe(0);
    });

    test("all ones", () => {
        rollMany(20, 1);

        expect(game.score()).toBe(20);
    });

    function rollSpare() {
        game.roll(5);
        game.roll(5);
    }

    test("one spare", () => {
        rollSpare();
        game.roll(3);
        rollMany(17, 0);

        expect(game.score()).toBe(16);
    });

    function rollStrike() {
        game.roll(10);
    }

    test("one strike", () => {
        rollStrike();
        game.roll(4);
        game.roll(3);
        rollMany(16, 0);

        expect(game.score()).toBe(24);
    });

    test("perfect game", () => {
        rollMany(13, 10);

        expect(game.score()).toBe(300);
    });
});
