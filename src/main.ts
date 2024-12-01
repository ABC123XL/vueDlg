// import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { initDialog } from "./component";

// 创建 Vue 应用并使用 Element Plus
const app = createApp(App);
initDialog();
app.use(ElementPlus);
app.mount("#app");
