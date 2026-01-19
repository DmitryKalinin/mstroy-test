import { TreeStore, TreeItem } from '../treeStore';

const items: TreeItem[] = [
    { id: 1, parent: null, label: 'A' },
    { id: 2, parent: 1, label: 'B' },
    { id: 3, parent: 1, label: 'C' },
    { id: 4, parent: 2, label: 'D' },
    { id: 5, parent: 2, label: 'E' }
];

describe('TreeStore', () => {
    let store: TreeStore<TreeItem>;

    beforeEach(() => {
        store = new TreeStore<TreeItem>(items);
    });

    test('getAll возвращает все элементы', () => {
        expect(store.getAll()).toHaveLength(5);
    });

    test('getItem возвращает элемент с переданным id', () => {
        expect(store.getItem(3)?.label).toBe('C');
        expect(store.getItem(999)).toBeNull();
    });

    test('getChildren возвращает прямых детей', () => {
        expect(store.getChildren(1).map(i => i.id)).toEqual([2,3]);
        expect(store.getChildren(3)).toEqual([]);
    });

    test('getAllChildren возвращает всех детей', () => {
        expect(store.getAllChildren(1).map(i => i.id).sort()).toEqual([2,3,4,5]);
        expect(store.getAllChildren(2).map(i => i.id).sort()).toEqual([4,5]);
        expect(store.getAllChildren(5)).toEqual([]);
    });

    test('getAllParents возвращает предков', () => {
        expect(store.getAllParents(4).map(i => i.id)).toEqual([4,2,1]);
        expect(store.getAllParents(1).map(i => i.id)).toEqual([1]);
    });

    test('addItem добавляет новый элемент', () => {
        store.addItem({ id: 6, parent: 3, label: 'F' });
        expect(store.getItem(6)?.label).toBe('F');
        expect(store.getChildren(3).map(i => i.id)).toContain(6);
    });

    test('removeItem удаляет элемент и все зависимости', () => {
        store.removeItem(2);
        expect(store.getItem(2)).toBeNull();
        expect(store.getItem(4)).toBeNull();
        expect(store.getAll().map(i => i.id)).toEqual([1,3]);
    });

    test('updateItem обновляет элемент', () => {
        store.updateItem({ id: 3, parent: 2, label: 'C-Updated' });
        const item = store.getItem(3);
        expect(item?.label).toBe('C-Updated');
        expect(store.getChildren(1).map(i => i.id)).not.toContain(3);
        expect(store.getChildren(2).map(i => i.id)).toContain(3);
    });
});
