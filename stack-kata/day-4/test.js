const Stack = require("./kata");

describe("stack kata", () => {
    var stack;

    test("push one element into stakc", () => {
        stack = new Stack();

        stack.push(1);

        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("push many elements", () => {
        stack = new Stack();

        stack.pop();
        stack.pop();
        stack.pop();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("for each callback", () => {
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
            return item * 2;
        });

        expect(stack.pop()).toBe(6);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(undefined);
    });

    test("iterator over stack", () => {
        stack = new Stack(new Array(1, 2, 3));

        var iter = stack.iter();

        expect(iter.next()).toBe(3);
        expect(iter.next()).toBe(2);
        expect(iter.next()).toBe(1);
        expect(iter.next()).toBe(undefined);
    });

    test("create two iterators from stack", () => {
        stack = new Stack(new Array(1, 2, 3));

        var iter = stack.iter();

        expect(iter.next()).toBe(3);
        expect(iter.next()).toBe(2);
        expect(iter.next()).toBe(1);
        expect(iter.next()).toBe(undefined);

        var iter = stack.iter();

        expect(iter.next()).toBe(3);
        expect(iter.next()).toBe(2);
        expect(iter.next()).toBe(1);
        expect(iter.next()).toBe(undefined);
    });
});
