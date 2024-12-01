<template>
  <el-dialog v-model="varVisible" title="Tips" width="500">
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="varVisible = false">Cancel</el-button>
        <el-button type="primary" @click="varVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(["update:visible"]);

const varVisible = computed<boolean>({
  get: () => props.visible,
  set: (val: boolean) => {
    emit("update:visible", val);
  },
});

const dialogVisible = ref<boolean>(false);
const openVarDlg = () => {
  dialogVisible.value = true;
};
</script>
<style scoped lang="less"></style>
