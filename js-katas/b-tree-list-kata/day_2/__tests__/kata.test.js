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
        Array.from(new Array(PAGE_SIZE + 1)).forEach((_, index) => list.add(index));

        Array.from(new Array(PAGE_SIZE + 1)).forEach((_, index) => expect(list.contains(index)).toBe(true));
    });

    test('list contains more than one level', () => {
        Array.from(new Array(PAGE_SIZE ** 2 + 1)).forEach((_, index) => list.add(index));

        Array.from(new Array(PAGE_SIZE ** 2 + 1)).forEach((_, index) => expect(list.contains(index)).toBe(true));
    })
});
