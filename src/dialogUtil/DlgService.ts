import { createApp, h, type Component } from "vue";
import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

// 弹窗注册表
const dialogRegistry = new Map<string, Component>();

// 管理弹窗实例的栈
const dialogStack: Array<{ key: string; close: () => void }> = [];

/**
 * 注册弹窗
 * @param key 弹窗的唯一表示
 * @param dlg 弹窗组件
 * @returns
 */
export const registryDlg = (key: string, dlg: Component) => {
  if (dialogRegistry.has(key)) {
    console.warn(`Dialog with key ${key} is already registered`);
    return;
  }
  dialogRegistry.set(key, dlg);
};

export const openDlg = (key: string, option: any) => {
  const dlgComponent = dialogRegistry.get(key);
  if (!dlgComponent) {
    console.warn(`Dialog width key ${key} is not registry`);
    return;
  }

  // 动态创建 DOM 容器
  const container = document.createElement("div");
  container.className = "div-1234";
  document.body.appendChild(container);

  // 创建 Vue 实例
  const app = createApp(dlgComponent, {
    ...option,
    onClose: () => {
      console.log("dlg service");

      app.unmount();
      document.body.removeChild(container);
      dialogStack.pop();
    },
  });
  app.use(ElementPlus);
  app.mount(container);
  // 保存关闭函数栈
  dialogStack.push({ key, close: () => app.unmount() });
};

export const closeAllDialogs = () => {
  while (dialogStack.length > 0) {
    const { close } = dialogStack.pop()!;
    close();
  }
};
