const BowlingGame = require("./kata");

describe("bowling game kata", () => {
    var game;

    function rollMany(times, pins) {
        for(i = 0; i < times; i++) {
            game.roll(pins);
        }
    }

    function rollSpare() {
        game.roll(5);
        game.roll(5);
    }

    function rollStrike() {
        game.roll(10);
    }

    beforeEach(() => {
        game = new BowlingGame()
    });

    test("gutter game", () => {
        rollMany(20, 0);
        expect(game.score()).toBe(0)
    });

    test("all ones", () => {
        rollMany(20, 1);

        expect(game.score()).toBe(20)
    });

    test("roll one spare", () => {
        rollSpare();
        game.roll(3);
        rollMany(17, 0);

        expect(game.score()).toBe(16);
    });

    test("roll one strike", () => {
        rollStrike();
        game.roll(3);
        game.roll(4);
        rollMany(16, 0);

        expect(game.score()).toBe(24);
    });

    test("perfect game", () => {
        rollMany(12, 10);

        expect(game.score()).toBe(300);
    })
});
