import {BtreeList, PAGE_SIZE} from '../kata';

describe('b tree list', () => {
    let list;

    beforeEach(() => {
        list = new BtreeList();
    });

    test('list contains added values', () => {
        list.add(1);
        list.add(2);
        list.add(3);

        expect(list.contains(1)).toBe(true);
        expect(list.contains(2)).toBe(true);
        expect(list.contains(3)).toBe(true);
    });

    test('list contains more than one page', () => {
        for (let item of Array.from(new Array(PAGE_SIZE + 1)).map((_, index) => index)) {
            list.add(item);
        }

        for (let item of Array.from(new Array(PAGE_SIZE + 1)).map((_, index) => index)) {
            expect(list.contains(item)).toBe(true);
        }
    });

    test('list contains more than one level', () => {
        for (let item of Array.from(new Array(PAGE_SIZE ** 2 + 1)).map((_, index) => index)) {
            list.add(item);
        }

        for (let item of Array.from(new Array(PAGE_SIZE ** 2 + 1)).map((_, index) => index)) {
            expect(list.contains(item)).toBe(true);
        }
    })
});
