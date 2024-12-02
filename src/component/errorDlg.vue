<template>
  <BaseDlg title="errorDlg" @close="onClose">
    <div>{{ message }}</div>
    <el-button @click="openInnerDlg">打开 inner 弹窗</el-button>
  </BaseDlg>
</template>

<script setup lang="ts">
import BaseDlg from "./baseDlg.vue";

const props = defineProps<{ message: string; onClose: () => void }>();
const openInnerDlg = () => {};
console.log("1111");
</script>
<style scoped lang="less"></style>
