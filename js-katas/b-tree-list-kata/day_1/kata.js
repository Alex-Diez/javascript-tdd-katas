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
        this.entries = new Array(PAGE_SIZE);
        this.size = 0;
        this.external = external;
    }

    contains(item) {
        if (this.external) {
            return Array.from(new Array(this.size)).map((_, index) => this.entries[index].key).indexOf(item) !== -1;
        } else {
            let index = this.index_of_page(item);
            return this.entries[index].page.contains(item);
        }
    }

    index_of_page(item) {
        const index = Array.from(new Array(this.size))
            .map((_, index) => this.entries[index].key)
            .findIndex(key => key > item);
        if (index === -1) {
            return this.size - 1;
        } else {
            return index - 1;
        }
    }

    addItem(item) {
        if (this.external) {
            this.addEntry(new Entry(item));
            if (this.size === PAGE_SIZE) {
                return this.split();
            }
        } else {
            let index = this.index_of_page(item);
            const page = this.entries[index].page.addItem(item);
            if (page !== this.entries[index].page) {
                const split = this.addPage(page);
                if (split !== undefined) {
                    return split;
                }
            }
        }
        return this;
    }

    addEntry(entry) {
        if (this.size < PAGE_SIZE) {
            this.entries[this.size] = entry;
            this.size += 1;
        }
    }

    addPage(page) {
        this.addEntry(new Entry(page.entries[0].key, page));
        if (this.size === PAGE_SIZE) {
            return this.split();
        }
    }

    split() {
        const half = this.size / 2;
        const page = new Page(this.external);
        Array.from(new Array(half))
            .map((_, index) => index + half)
            .forEach(
                index => {
                    if (this.external) {
                        page.addItem(this.entries[index].key);
                    } else {
                        page.addPage(this.entries[index].page)
                    }
                    this.entries[index] = undefined;
                }
            );
        this.size = half;
        return page;
    }
}

class Entry {
    constructor(key, page = undefined) {
        this.key = key;
        this.page = page;
    }
}

export {BtreeList, PAGE_SIZE};
