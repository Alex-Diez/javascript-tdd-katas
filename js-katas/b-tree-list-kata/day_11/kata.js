const PAGE_SIZE = 16;

class BtreeList {
    constructor() {
        this.root = new Page(true);
    }

    add(item) {
        const right = this.root.addItem(item);
        if (right) {
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
    }

    contains(item) {
        if (this.external) {
            return this.entriesRange().findIndex(e => e.key === item) !== -1;
        } else {
            let index = this.pageIndex(item);
            return this.items[index].page.contains(item);
        }
    }

    entriesRange(from=0, size=this.size) {
        return Array.from(new Array(size)).map((_, index) => this.items[index + from]);
    }

    pageIndex(item) {
        const index = this.entriesRange().findIndex(e => e.key > item);
        if (index !== -1) {
            return index - 1;
        } else {
            return this.size - 1;
        }
    }

    addItem(item) {
        if (this.external) {
            return this.addEntry(new Entry(item));
        } else {
            let index = this.pageIndex(item);
            const page = this.items[index].page.addItem(item);
            if (page) {
                return this.addPage(page);
            }
        }
    }

    addEntry(entry) {
        this.items[this.size++] = entry;
        if (this.isFull()) {
            return this.split();
        }
    }

    isFull() {
        return this.size === PAGE_SIZE;
    }

    addPage(page) {
        return this.addEntry(new Entry(page.items[0].key, page));
    }

    split() {
        const half = this.size / 2;
        const page = new Page(this.external);
        this.entriesRange(half, half).forEach(entry => page.addEntry(entry));
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
