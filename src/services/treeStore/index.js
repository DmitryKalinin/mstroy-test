export default class TreeStore {
    constructor(items) {
        this.items = items;
    }

    getAll() {
        return this.items;
    }
    getChildren(id) {
        return [];
    }
    getAllChildren(id) {
        return [];
    }
    getAllParents(id) {
        return [];
    }

    addItem(item) {}
    updateItem(item) {}
    removeItem(id) {}
}
