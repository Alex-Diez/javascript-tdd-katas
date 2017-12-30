const PAGE_SIZE = 16;

const BtreeList = function () {
    this.root = new Page(true);
};

BtreeList.prototype.add = function (item) {
    const right = this.root.addItem(item);
    if (right !== this.root) {
        const left = this.root;
        this.root = new Page(false);
        this.root.addPage(left);
        this.root.addPage(right);
    }
};

BtreeList.prototype.contains = function (item) {
    return this.root.contains(item);
};

const Page = function (external) {
    this.items = [];
    this.size = 0;
    this.external = external;

    const self = this;

    this.indexes = function (from=0, size=this.size) {
        return Array.from(new Array(size)).map((_, index) => index + from);
    };

    this.getKey = function (index) {
        return self.items[index].key
    };

    this.getPage = function (index) {
        return self.items[index].page;
    };

    this.indexOfPage = function (item) {
        const index = this.indexes().map(index => this.getKey(index)).findIndex(key => key > item);
        if (index !== -1) {
            return index - 1;
        } else {
            return self.size - 1;
        }
    };

    this.addEntry = function (entry) {
        self.items[self.size] = entry;
        self.size += 1;
    };
};

Page.prototype.contains = function (item) {
    if (this.external) {
        return this.indexes().map(index => this.getKey(index)).indexOf(item) !== -1;
    } else {
        const index = this.indexOfPage(item);
        return this.getPage(index).contains(item);
    }
};

Page.prototype.addItem = function (item) {
    if (this.external) {
        this.addEntry(new Entry(item));
        if (this.size === PAGE_SIZE) {
            return this.split();
        }
    } else {
        const index = this.indexOfPage(item);
        const pageAtIndex = this.getPage(index);
        const page = pageAtIndex.addItem(item);
        if (page !== pageAtIndex) {
            const split = this.addPage(page);
            if (split !== undefined) {
                return split;
            }
        }
    }
    return this;
};

Page.prototype.addPage = function (page) {
    this.addEntry(new Entry(page.getKey(0), page));
    if (this.size === PAGE_SIZE) {
        return this.split();
    }
};

Page.prototype.split = function () {
    const half = this.size / 2;
    const page = new Page(this.external);
    for (let index of this.indexes(half, half)) {
        if (this.external) {
            page.addItem(this.items[index].key);
        } else {
            page.addPage(this.items[index].page);
        }
    }
    this.size = half;
    return page;
};

const Entry = function (key, page) {
    this.key = key;
    this.page = page;
};

export {BtreeList, PAGE_SIZE};
