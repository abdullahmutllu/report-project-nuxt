<template>
  <div>
    <div id="editor"></div>
    <div v-if="modelValue" class="mt-4">
      <h3>İçerik:</h3>
      <div v-html="modelValue"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
// editorInstance ref yerine normal bir değişken olarak tanımlanıyor
let editorInstance = null;

onMounted(() => {
  const initEditor = () => {
    if (window.ClassicEditor) {
      ClassicEditor.create(document.querySelector("#editor"), {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "undo",
          "redo",
        ],
        placeholder: "Buraya yazın...",
      })
        .then((editor) => {
          // editorInstance'ı Vue'nun reactive mekanizmasının dışında bir değişken olarak tutuyoruz
          editorInstance = editor;

          // İlk değeri ayarla
          if (props.modelValue) {
            editor.setData(props.modelValue);
          }

          // İçerik değişikliklerini dinle
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            emit("update:modelValue", data);
          });
        })
        .catch((error) => {
          console.error("Editor oluşturulurken hata:", error);
        });
    } else {
      setTimeout(initEditor, 100);
    }
  };

  initEditor();
});

// Props değiştiğinde editör içeriğini güncelle
watch(
  () => props.modelValue,
  (newValue) => {
    if (editorInstance && newValue !== editorInstance.getData()) {
      editorInstance.setData(newValue);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy().catch((error) => console.error("Editor destroy hatası:", error));
  }
});
</script>

<style scoped>
#editor {
  margin: 20px 0;
}
</style>
