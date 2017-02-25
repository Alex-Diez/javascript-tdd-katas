const Stack = require("./kata");

describe("stack kata", () => {
    var stack;

    test("push one element into stack", () => {
        stack = new Stack();
        stack.push(1);

        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("push many elements into stack", () => {
        stack = new Stack(new Array(1, 2, 3));

        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("foreach over stack", () => {
        stack = new Stack(new Array(1, 2, 3));

        var sum = 0;

        stack.forEach(function(item) {
            sum += item;
        });

        expect(sum).toBe(6);
    });

    test("map over stack", () => {
        stack = new Stack(new Array(1, 2, 3));

        stack.map(function(item) {
            return item * 2;
        });

        expect(stack.pop()).toBe(6);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(undefined);
    });
});
