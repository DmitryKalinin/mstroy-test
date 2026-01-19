type TreeId = string | number;

export interface TreeItem {
    id: TreeId;
    parent: TreeId | null;
}

export class TreeStore<T extends TreeItem> {
    private items: T[] = [];
    private byId = new Map<TreeId, T>();
    private childrenMap = new Map<TreeId, T[]>();

    constructor(items: T[] = []) {
        items.forEach(item => this.addItem(item));
    }

    private link(item: T) {
        if (item.parent === null) return;

        const list = this.childrenMap.get(item.parent) ?? [];
        list.push(item);
        this.childrenMap.set(item.parent, list);
    }

    private unlink(item: T) {
        if (item.parent === null) return;

        const list = this.childrenMap.get(item.parent);

        if (!list) return;

        this.childrenMap.set(
            item.parent,
            list.filter(child => child.id !== item.id)
        );
    }

    getAll(): T[] {
        return [...this.items];
    }

    getItem(id: TreeId): T | null {
        return this.byId.get(id) ?? null;
    }

    getChildren(id: TreeId): T[] {
        return [...(this.childrenMap.get(id) ?? [])];
    }

    getAllChildren(id: TreeId): T[] {
        const result: T[] = [];
        const stack = [...this.getChildren(id)];

        while (stack.length) {
            const current = stack.pop()!;
            result.push(current);

            const children = this.childrenMap.get(current.id);
            if (children) stack.push(...children);
        }

        return result;
    }

    getAllParents(id: TreeId): T[] {
        const result: T[] = [];
        let current = this.getItem(id);

        while (current) {
            result.push(current);
            current = current.parent !== null
                ? this.getItem(current.parent)
                : null;
        }

        return result;
    }

    addItem(item: T): void {
        this.items.push(item);
        this.byId.set(item.id, item);
        this.link(item);
    }

    updateItem(updated: T): void {
        const existing = this.byId.get(updated.id);
        if (!existing) return;

        if (existing.parent !== updated.parent) {
            this.unlink(existing);
            existing.parent = updated.parent;
            this.link(existing);
        }

        Object.assign(existing, updated);
    }

    removeItem(id: TreeId): void {
        const item = this.getItem(id);
        if (!item) return;

        const toRemove = [item, ...this.getAllChildren(id)];

        toRemove.forEach(el => {
            this.unlink(el);
            this.byId.delete(el.id);
        });

        this.items = this.items.filter(el => this.byId.has(el.id));
    }
}
