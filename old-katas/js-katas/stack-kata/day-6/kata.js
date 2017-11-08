var Stack = function(array) {
    this.items = [];
    this.size = 0;

    if (array !== undefined) {
        for (var i = 0; i < array.length; i++) {
            this.push(array[i]);
        }
    }

    return this;
};

Stack.prototype.push = function(item) {
    this.items[this.size++] = item;
};

Stack.prototype.pop = function() {
    if (this.size === 0) {
        return undefined;
    } else {
        return this.items[--this.size];
    }
};

Stack.prototype.forEach = function(callback) {
    for (var i = 0; i < this.size; i++) {
        callback(this.items[i]);
    }
};

Stack.prototype.map = function(mapper) {
    for (var i = 0; i < this.size; i++) {
        this.items[i] = mapper(this.items[i]);
    }
};

Stack.prototype.iter = function() {
    return new Iter(this);
};

var Iter = function(stack) {
    this.stack = stack;
    this.current = stack.size;
};

Iter.prototype.next = function() {
    if (this.current === 0) {
        return undefined;
    } else {
        return this.stack.items[--this.current];
    }
};

module.exports = Stack;
