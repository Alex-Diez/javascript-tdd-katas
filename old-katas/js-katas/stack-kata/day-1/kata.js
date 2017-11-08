var Stack = function() {
    this.items = [];
    this.size = 0;
};

Stack.prototype.push = function(item) {
    this.items[this.size++] = item;
};

Stack.prototype.pop = function() {
    var item = this.items[--this.size];
    print(this.size);
    return item;
};

module.exports = Stack;
