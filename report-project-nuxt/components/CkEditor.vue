<template>
  <div>
    <div class="deneme" ref="editorContainer"></div>
    <button class="veriButton" v-if="isSimpleMode" @click="sendData">Veriyi Gönder</button>
  </div>
</template>
<script setup>
const props = defineProps({
  isSimpleMode: {
    type: Boolean,
    default: false,
  },
});
const editorContainer = ref(null);
const datas = ref("");
const emit = defineEmits(["updateContent"]);
let editor = null;

const initEditor = async () => {
  try {
    const editorConfig = {
      placeholder: "Buraya yazın...",
    };

    if (props.isSimpleMode) {
      editorConfig.removePlugins = ["Toolbar", "Heading"];
      editorConfig.toolbar = [];
    } else {
      editorConfig.toolbar = {
        items: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"],
      };
    }
    if (editor) {
      await editor.destroy();
      editor = null;
    }
    editor = await ClassicEditor.create(editorContainer.value, editorConfig);

    editor.model.document.on("change:data", () => {
      const data = editor.getData();
      datas.value = data;
      if (props.isSimpleMode == false) {
        emit("updateContent", datas.value);
      }
    });
  } catch (error) {
    console.error("Editor başlatma hatası:", error);
  }
};
const sendData = () => {
  if (datas.value) {
    emit("updateContent", datas.value);
  }
};

onMounted(() => {
  initEditor();
});
</script>

<style scoped>
:deep(.ck-editor__editable) {
  min-height: 200px;
  max-height: 200px;
  overflow-y: auto;
}
.veriButton {
  background-color: white;
  border-radius: 10px;
  margin-top: 5px;
}
</style>
