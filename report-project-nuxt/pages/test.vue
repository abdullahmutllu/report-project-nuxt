<template>
  <ClientOnly>
    <ckeditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const editorData = ref("<p>İlk metin içeriği buraya gelecek!</p>");
const editorConfig = {
  toolbar: ["heading", "|", "bold", "italic", "link", "undo", "redo"],
};
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
