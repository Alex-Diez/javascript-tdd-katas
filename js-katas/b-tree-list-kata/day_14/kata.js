const PAGE_SIZE = 16;

const BtreeList = function () {
    this.root = new Page(true);
};

BtreeList.prototype = {
    add: function (item) {
        const right = this.root.addItem(item);
        if (right) {
            const left = this.root;
            this.root = new Page(false);
            this.root.addPage(left);
            this.root.addPage(right);
        }
    },

    contains: function (item) {
        return this.root.contains(item);
    }
};

const Page = function (external) {
    this.items = [];
    this.size = 0;
    this.external = external;
};

Page.prototype = {
    contains: function (item) {
        if (this.external) {
            return this.entriesRange().findIndex(e => e.key === item) !== -1;
        } else {
            const index = this.pageIndex(item);
            return this.items[index].page.contains(item);
        }
    },

    entriesRange: function (from = 0, size = this.size) {
        return Array.from(new Array(size)).map((_, index) => this.items[index + from]);
    },

    pageIndex: function (item) {
        const index = this.entriesRange().findIndex(e => e.key > item);
        if (index !== -1) {
            return index - 1;
        } else {
            return this.size - 1;
        }
    },

    addItem: function (item) {
        if (this.external) {
            return this.addEntry(new Entry(item));
        } else {
            const index = this.pageIndex(item);
            const page = this.items[index].page.addItem(item);
            if (page) {
                return this.addPage(page);
            }
        }
    },

    addEntry: function (entry) {
        this.items[this.size++] = entry;
        if (this.size === PAGE_SIZE) {
            return this.split();
        }
    },

    addPage: function (page) {
        return this.addEntry(new Entry(page.items[0].key, page));
    },

    split: function () {
        const half = this.size / 2;
        const page = new Page(this.external);
        this.entriesRange(half, half).forEach(e => page.addEntry(e));
        this.size = half;
        return page;
    }
};

const Entry = function (key, page) {
    this.key = key;
    this.page = page;
};

export {BtreeList, PAGE_SIZE};
