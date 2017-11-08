const Stack = require("./kata");

describe("stack kata", () => {
    var stack;

    beforeEach(() => {
        stack = new Stack();
    });

    test("push one element into stack", () => {
        stack.push(1);

        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);

        stack.push(2);

        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(undefined);
    });

    test("push three elements into stack", () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("pops from empty stack and then push in", () => {
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

});
