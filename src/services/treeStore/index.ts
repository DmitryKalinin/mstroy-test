type TreeId = string | number;

export interface TreeItem {
    id: TreeId;
    parent: TreeId | null;
}

export class TreeStore<T extends TreeItem> {
    private items: T[] = [];
    private byId = new Map<TreeId, T>();
    private childrenMap = new Map<TreeId, T[]>();
}
