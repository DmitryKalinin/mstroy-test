import { createApp } from 'vue'
import App from './App.vue'

import { ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-enterprise';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

provideGlobalGridOptions({ theme: "legacy" });
ModuleRegistry.registerModules([AllEnterpriseModule]);

createApp(App).mount('#app')
