var Stack = function(items) {
    this.items = [];
    this.size = 0;
    if (items !== undefined) {
        for (var i = 0; i < items.length; i++) {
            this.push(items[i]);
        }
    }
    this
};

Stack.prototype.push = function(item) {
    this.items[this.size++] = item;
}

Stack.prototype.pop = function() {
    if (this.size === 0) {
        return undefined;
    } else {
        return this.items[--this.size];
    }
}

Stack.prototype.forEach = function(callback) {
    for (var i = 0; i < this.size; i++) {
        callback(this.items[i]);
    }
}

Stack.prototype.map = function(mapper) {
    for (var i = 0; i < this.size; i++) {
        this.items[i] = mapper(this.items[i]);
    }
}

module.exports = Stack;
