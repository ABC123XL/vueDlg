<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :before-close="handleBeforeClose"
  >
    <slot></slot>
    <template #footer>
      <slot name="dlgFooter">
        <el-button @click="handleCancel">{{ cancelText }}</el-button>
        <el-button type="primary" @click="handleOk">{{ okText }}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";

// 接收弹窗的配置项
const props = defineProps<{
  title: string;
  width?: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => Promise<void> | void;
  onCancel?: () => void;
  onClose?: () => void; // 弹窗关闭时的回调，用于清理动态挂载的 DOM
}>();

const emit = defineEmits(["close", "cancel", "ok"]);

// 弹窗显示状态
const visible = ref(true);

// 默认参数
const width = ref(props.width || "50%");
const okText = ref(props.okText || "确定");
const cancelText = ref(props.cancelText || "取消");

// 打开弹窗
const open = () => {
  visible.value = true;
};

// 关闭弹窗
const close = () => {
  visible.value = false;
  // props.onClose?.(); // 触发清理操作
  emit("close");
};

// 点击确认
const handleOk = async () => {
  if (props.onOk) {
    await props.onOk();
  }
  close();
};

// 点击取消
const handleCancel = () => {
  if (props.onCancel) {
    props.onCancel();
  }
  close();
};

// 自定义关闭行为
const handleBeforeClose = (done: () => void) => {
  close(); // 触发关闭逻辑
  done(); // 通知 Element Plus 完成关闭
};
</script>

<style scoped>
/* 可选样式调整 */
</style>
