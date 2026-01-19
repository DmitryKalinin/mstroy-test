<template>
  <div class="ag-theme-alpine">
    <ag-grid-vue
        :rowData="rowData"
        :columnDefs="columnDefs"
        :treeData="true"
        :getDataPath="getDataPath"
        :groupDefaultExpanded="0"
        :animateRows="true"
        style="height: 100%;"
    />
  </div>
</template>\

<script setup lang="ts">
import { computed } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';

import { TreeStore, TreeItem } from '@/services/treeStore/index.ts';

interface Item extends TreeItem {
  label: string;
}

const props = defineProps<{
  items: Item[];
}>();

const store = new TreeStore<Item>(props.items);

const rowData = computed(() =>
    store.getAll().map(item => ({
      ...item,
      category: store.getChildren(item.id).length
          ? 'Группа'
          : 'Элемент'
    }))
);

const columnDefs = [
  {
    headerName: '№ п/п',
    valueGetter: params => params.node?.rowIndex + 1,
    width: 100
  },
  {
    headerName: 'Категория',
    field: 'category',
    width: 200
  },
  {
    headerName: 'Наименование',
    field: 'label',
    flex: 1
  },

];

const getDataPath = (data: Item) =>
    store
        .getAllParents(data.id)
        .reverse()
        .map(i => i.label);
</script>
