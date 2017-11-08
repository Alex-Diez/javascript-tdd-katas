const Stack = require("./kata");

describe("stack kata", () => {
    var stack;

    beforeEach(() => {
        stack = new Stack();
    })

    test("push one element", () => {
        stack.push(1);

        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("push many elements", () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    });

    test("sum with for each", () => {
        stack = new Stack(new Array(1, 2, 3));

        var sum = 0;

        stack.forEach(function(item) {
            sum += item;
        });

        expect(sum).toBe(6);
    });

    test("pops then push and sum", () => {
        stack.pop();
        stack.pop();
        stack.pop();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        var sum = 0;

        stack.forEach(function(item) {
            sum += item;
        });

        expect(sum).toBe(6);
    });

    test("map stack items", () => {
        stack = new Stack(new Array(1, 2, 3));  

        stack.map(function(item) {
            return item * item;
        });

        expect(stack.pop()).toBe(9);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBe(undefined);
    })
});
