import { createApp } from 'vue'
import App from './App.vue'

import { ModuleRegistry } from 'ag-grid-enterprise';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllEnterpriseModule]);

createApp(App).mount('#app')
