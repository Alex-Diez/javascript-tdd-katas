const Stack = require("./kata");

describe("stack kata", () => {
    test("create stack", () => {
        var stack = new Stack();
    });

    test("push one", () => {
        var stack = new Stack();

        stack.push(1);

        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("push many", () => {
        var stack = new Stack();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("for each", () => {
        var stack = new Stack(new Array(1, 2, 3));

        var sum = 0;
        stack.forEach(function(item) {
            sum += item;
        });

        expect(sum).toBe(6);
    });

    test("map over stack", () => {
        var stack = new Stack(new Array(1, 2, 3));

        stack.map(function(item) {
            return item * item;
        });

        expect(stack.pop()).toBe(9);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("create iterator", () => {
        var stack = new Stack(new Array(1, 2, 3));

        var iter = stack.iter();

        expect(iter.next()).toBe(3);
        expect(iter.next()).toBe(2);
        expect(iter.next()).toBe(1);
        expect(iter.next()).toBe(undefined);
    })
});
