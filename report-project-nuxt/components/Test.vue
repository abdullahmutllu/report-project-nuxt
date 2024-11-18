<template>
  <div>
    <div ref="editorContainer"></div>
    <div v-if="datas" class="mt-4" v-html="datas"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount, nextTick, markRaw } from "vue";

const editorContainer = ref(null);
const datas = ref("");
const emit = defineEmits(["updateContent"]);
let isUpdating = false;

const initEditor = async () => {
  try {
    const editor = await ClassicEditor.create(editorContainer.value, {
      toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"],
      placeholder: "Buraya yazın...",
    });

    editor.model.document.on("change:data", () => {
      if (!isUpdating) {
        const data = editor.getData();
        datas.value = data;
        emit("updateContent", data);
      }
    });
  } catch (error) {
    console.error("Editor başlatma hatası:", error);
  }
};

onMounted(() => {
  initEditor();
});
</script>

<style scoped>
:deep(.ck-editor__editable) {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}

:deep(.ck.ck-editor) {
  width: 100%;
}

:deep(.ck-editor__editable_inline) {
  padding: 0 1rem;
}
</style>
