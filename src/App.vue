<template>
  <div>hello Vue3</div>
  <el-button @click="openErrorDlg">函数式打开错误弹窗</el-button>
  <el-button @click="varVisible = true">变量式打开弹窗</el-button>
  <VarDlg v-model:visible="varVisible" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DIALOG_KEY, BaseDlg, VarDlg } from "./component";
import { openDlg } from "./dialogUtil/DlgService";

const varVisible = ref<boolean>(false);
const openErrorDlg = () => {
  console.log("app vue");
  openDlg(DIALOG_KEY.ERROR_DLG, {
    message: "这是一个错误弹窗",
    onClose: () => {
      console.log("关闭这个错误弹窗");
    },
  });
};
</script>

<style scoped></style>
