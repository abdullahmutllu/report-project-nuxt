<template>
  <Content page-title="Raporlar">
    <div class="mb-4">
      <h3>Yeni Rapor Ekle</h3>
      <button class="btn btn-primary mt-2" @click="submitReport">Raporu Gönder</button>
    </div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Şirket</th>
          <th>Şube</th>
          <th>İçerik</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.id">
          <td>{{ report.id }}</td>
          <td>{{ report.company }}</td>
          <td>{{ report.branch }}</td>
          <td>{{ report.content }}</td>
        </tr>
      </tbody>
    </table>
  </Content>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const reports = ref([]);

const fetchReports = async () => {
  const { data } = await axios.get("http://localhost:3001/reports");
  reports.value = data;
};

onMounted(fetchReports);
</script>

<style scoped>
.table {
  margin-top: 20px;
}

.ck-editor__editable {
  min-height: 300px;
}
</style>
