var Stack = function(array) {
    this.items = [];
    this.size = 0;
    var self = this;
    if (array !== undefined) {
        array.forEach(function(item) {
            self.push(item);
        });
    }
    return this;
}

Stack.prototype.push = function(item) {
    this.items[this.size++] = item;
}

Stack.prototype.pop = function() {
    return this.items[--this.size];
}

Stack.prototype.forEach = function(callback) {
    this.items.forEach(callback);
}

Stack.prototype.map = function(mapper) {
    for(var i = 0; i < this.size; i++) {
        this.items[i] = mapper(this.items[i]);
    }
}

Stack.prototype.iter = function() {
    return new Iter(this);
}

var Iter = function(stack) {
    this.stack = stack;
    this.current = stack.size;
}

Iter.prototype.next = function() {
    return this.stack.items[--this.current];
}

module.exports = Stack;
