import {
  createApp,
  h,
  type Component,
  createVNode,
  createRenderer,
  render
} from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 全局的 app
const globalApp = createApp({});
globalApp.use(ElementPlus);

// 容器 DOM 节点
const globalContainer = document.createElement("div");
document.body.appendChild(globalContainer);
globalApp.mount(globalContainer);

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
  // document.body.appendChild(container);

  // 创建 Vue 实例
  // const app = createApp(dlgComponent, {
  //   ...option,
  //   onClose: () => {
  //     console.log("dlg service");

  //     app.unmount();
  //     document.body.removeChild(container);
  //     dialogStack.pop();
  //   }
  // });
  globalContainer.appendChild(container);

  // 使用 createVNode 创建组件节点

  const vnode = createVNode(dlgComponent, {
    ...option,
    onClose: () => {
      render(null, container); // 卸载组件
      globalContainer.removeChild(container); // 清理 DOM
      dialogStack.pop();
    }
  });
  vnode.appContext = globalApp._context;

  // 使用 render 渲染到 DOM
  render(vnode, container);

  // app.use(ElementPlus);
  // app.mount(container);
  // 保存关闭函数栈
  // dialogStack.push({ key, close: () => app.unmount() });
  // 记录到堆栈
  dialogStack.push({ key, close: () => render(null, container) });
};

export const closeAllDialogs = () => {
  while (dialogStack.length > 0) {
    const { close } = dialogStack.pop()!;
    close();
  }
};
