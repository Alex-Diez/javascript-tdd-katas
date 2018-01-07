const PAGE_SIZE = 16;

const BtreeList = function () {
    this.root = new Page(true);
};

BtreeList.prototype.add = function (item) {
    const right = this.root.addItem(item);
    if (right) {
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

    this.addEntry = (entry) => {
        this.items[this.size++] = entry;
        if (this.size === PAGE_SIZE) {
            return this.split();
        }
    };

    this.entriesRange = (from=0, size=this.size) =>
        Array.from(new Array(size)).map((_, index) => this.items[index + from]);

    this.pageIndex = (item) => {
        const index = this.entriesRange().findIndex(e => e.key > item);
        if (index !== -1) {
            return index - 1;
        } else {
            return this.size - 1;
        }
    };

    this.split = () => {
        const half = this.size / 2;
        const page = new Page(this.external);
        for (let entry of this.entriesRange(half, half)) {
            page.addEntry(entry);
        }
        this.size = half;
        return page;
    }
};

Page.prototype.contains = function (item) {
    if (this.external) {
        return this.entriesRange().findIndex(e => e.key === item) !== -1;
    } else {
        const index = this.pageIndex(item);
        return this.items[index].page.contains(item);
    }
};

Page.prototype.addItem = function (item) {
    if (this.external) {
        return this.addEntry(new Entry(item));
    } else {
        const index = this.pageIndex(item);
        const page = this.items[index].page.addItem(item);
        if (page) {
            return this.addPage(page);
        }
    }
};

Page.prototype.addPage = function (page) {
    return this.addEntry(new Entry(page.items[0].key, page));
};

const Entry = function (key, page=undefined) {
    this.key = key;
    this.page = page;
};

export {BtreeList, PAGE_SIZE};
