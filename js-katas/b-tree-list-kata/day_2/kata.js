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
        this.root.addPage(right)
    }
};

BtreeList.prototype.contains = function (item) {
    return this.root.contains(item);
};

const Page = function (external) {
    this.items = new Array(PAGE_SIZE);
    this.size = 0;
    this.external = external;

    const self = this;

    this.entriesIndexes = function () {
        return Array.from(new Array(self.size)).map((_, index) => index);
    };

    this.indexOfPage = function (item) {
        const index = self.entriesIndexes().findIndex(index => self.items[index].key > item);
        return index === -1 ? self.size - 1 : index - 1;
    };

    this.addEntry = function (entry) {
        self.items[self.size] = entry;
        self.size += 1;
    };

    this.isFull = function () {
        return self.size === PAGE_SIZE;
    }
};

Page.prototype.contains = function (item) {
    if (this.external) {
        return this.entriesIndexes().findIndex(index => this.items[index].key === item) !== -1;
    } else {
        let index = this.indexOfPage(item);
        return this.items[index].page.contains(item);
    }
};

Page.prototype.addItem = function (item) {
    if (this.external) {
        this.addEntry(new Entry(item));
        if (this.isFull()) {
            return this.split();
        }
    } else {
        let index = this.indexOfPage(item);
        const page = this.items[index].page.addItem(item);
        if (page !== this.items[index].page) {
            const split = this.addPage(page);
            if (split !== undefined) {
                return split;
            }
        }
    }
    return this;
};

Page.prototype.addPage = function (page) {
    this.addEntry(new Entry(page.items[0].key, page));
    if (this.isFull()) {
        return this.split();
    }
};

Page.prototype.split = function () {
    const half = this.size / 2;
    const page = new Page(this.external);
    Array.from(new Array(half)).map((_, index) => index + half).forEach(index => {
        if (this.external) {
            page.addItem(this.items[index].key);
        } else {
            page.addPage(this.items[index].page);
        }
        this.items[index] = undefined;
    });
    this.size = half;
    return page;
};

const Entry = function (key, page=undefined) {
    this.key = key;
    this.page = page;
};

export {BtreeList, PAGE_SIZE};
