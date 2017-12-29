const PAGE_SIZE = 16;

class BtreeList {
    constructor() {
        this.root = new Page(true);
    }

    add(item) {
        const right = this.root.addItem(item);
        if (right !== this.root) {
            const left = this.root;
            this.root = new Page(false);
            this.root.addPage(left);
            this.root.addPage(right);
        }
    }

    contains(item) {
        return this.root.contains(item);
    }
}

class Page {
    constructor(external) {
        this.items = [];
        this.size = 0;
        this.external = external;

        this.entriesRangeIndexes = (from=0, till=this.size) =>
            Array.from(new Array(till))
                .map((_, index) => index + from);

        this.indexOfPage = (item) => {
            const index = this.entriesRangeIndexes().map(index => this.toKey(index)).findIndex(key => key > item);
            if (index !== -1) {
                return index - 1;
            } else {
                return this.size - 1;
            }
        };

        this.addEntry = (entry) => {
            this.items[this.size] = entry;
            this.size += 1;
        };

        this.toKey = (index) => this.items[index].key;
        this.toPage = (index) => this.items[index].page;
    }

    contains(item) {
        if (this.external) {
            return this.entriesRangeIndexes().map(index => this.toKey(index)).indexOf(item) !== -1;
        } else {
            const index = this.indexOfPage(item);
            return this.items[index].page.contains(item);
        }
    }

    addItem(item) {
        if (this.external) {
            this.addEntry(new Entry(item));
            if (this.size === PAGE_SIZE) {
                return this.split();
            }
        } else {
            const index = this.indexOfPage(item);
            const page = this.items[index].page.addItem(item);
            if (page !== this.items[index].page) {
                const split = this.addPage(page);
                if (split !== undefined) {
                    return split;
                }
            }
        }
        return this;
    }

    addPage(page) {
        this.addEntry(new Entry(page.items[0].key, page));
        if (this.size === PAGE_SIZE) {
            return this.split();
        }
    }

    split() {
        const half = this.size / 2;
        const page = new Page(this.external);
        const indexes = this.entriesRangeIndexes(half, half);
        if (this.external) {
            indexes.map(index => this.toKey(index)).forEach(i => page.addItem(i));
        } else {
            indexes.map(index => this.toPage(index)).forEach(p => page.addPage(p));
        }
        this.size = half;
        return page;
    }
}

class Entry {
    constructor(key, page=undefined) {
        this.key = key;
        this.page = page;
    }
}

export {BtreeList, PAGE_SIZE};
