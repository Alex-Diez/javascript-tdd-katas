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
        this.entries = [];
        this.size = 0;
        this.external = external;

        this.entriesIndexes = (from=0, size=this.size) =>
            Array.from(new Array(size)).map((_, index) => index + from);

        this.indexOfPage = (item) => {
            const index = this.entriesIndexes().map(index => this.entries[index].key).findIndex(key => key > item);
            if (index !== -1) {
                return index - 1;
            } else {
                return this.size - 1;
            }
        };

        this.addEntry = (entry) =>
            this.entries[this.size++] = entry;

        this.isFull = () => this.size === 16;
    }

    contains(item) {
        if (this.external) {
            return this.entriesIndexes().map(index => this.entries[index].key).indexOf(item) !== -1;
        } else {
            const index = this.indexOfPage(item);
            return this.entries[index].page.contains(item);
        }
    }

    addItem(item) {
        if (this.external) {
            this.addEntry(new Entry(item));
            if (this.isFull()) {
                return this.split();
            }
        } else {
            const index = this.indexOfPage(item);
            const pageForItem = this.entries[index].page;
            const page = pageForItem.addItem(item);
            if (page !== pageForItem) {
                const split = this.addPage(page);
                if (split !== undefined) {
                    return split;
                }
            }
        }
        return this;
    }

    addPage(page) {
        this.addEntry(new Entry(page.entries[0].key, page));
        if (this.isFull()) {
            return this.split();
        }
    }

    split() {
        const half = this.size / 2;
        const page = new Page(this.external);
        if (this.external) {
            this.entriesIndexes(half, half).map(index => this.entries[index].key).forEach(k => page.addItem(k));
        } else {
            this.entriesIndexes(half, half).map(index => this.entries[index].page).forEach(p => page.addPage(p));
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

export {BtreeList};
