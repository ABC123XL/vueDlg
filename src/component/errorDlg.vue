<template>
  <BaseDlg title="errorDlg" @close="onClose">
    <div>{{ message }}</div>
  </BaseDlg>
</template>

<script setup lang="ts">
import BaseDlg from "./baseDlg.vue";

const props = defineProps<{ message: string; onClose: () => void }>();
console.log("1111");
</script>
<style scoped lang="less"></style>
