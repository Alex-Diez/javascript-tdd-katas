const PAGE_SIZE = 16;

const BtreeList = function () {
    this.root = new Page(true);
};

BtreeList.prototype.add = function (item) {
    const right = this.root.addItem(item);
    if (right !== undefined) {
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

    this.entries = (from = 0, size = this.size) =>
        Array.from(new Array(size)).map((_, index) => this.items[index + from]);

    this.indexOfPage = (item) => {
        const index = this.entries().findIndex(e => e.key > item);
        if (index !== -1) {
            return index - 1;
        } else {
            return this.size - 1;
        }
    };

    this.addEntry = (entry) => {
        this.items[this.size++] = entry;
        if (this.size === PAGE_SIZE) {
            return this.split();
        }
    }
};

Page.prototype.contains = function (item) {
    if (this.external) {
        return this.entries().map((e) => e.key).indexOf(item) !== -1;
    } else {
        const index = this.indexOfPage(item);
        return this.items[index].page.contains(item);
    }
};

Page.prototype.addItem = function (item) {
    if (this.external) {
        return this.addEntry(new Entry(item));
    } else {
        const index = this.indexOfPage(item);
        const page = this.items[index].page.addItem(item);
        if (page) {
            return this.addPage(page);
        }
    }
};

Page.prototype.addPage = function (page) {
    return this.addEntry(new Entry(page.items[0].key, page));
};

Page.prototype.split = function () {
    const half = this.size / 2;
    const page = new Page(this.external);
    for (let entry of this.entries(half, half)) {
        if (this.external) {
            page.addItem(entry.key);
        } else {
            page.addPage(entry.page);
        }
    }
    this.size = half;
    return page;
};

const Entry = function (key, page = undefined) {
    this.key = key;
    this.page = page;
};

export {BtreeList, PAGE_SIZE};
