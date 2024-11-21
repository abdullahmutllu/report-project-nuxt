<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th v-if="selectedColumns.includes('company')" scope="col">Şirket</th>
        <th v-if="selectedColumns.includes('branch')" scope="col">Şube</th>
        <th v-if="selectedColumns.includes('department')" scope="col">Departman</th>
        <th v-if="selectedColumns.includes('person')" scope="col">Kişi</th>
        <th v-if="selectedColumns.includes('invoice_items')" scope="col">Fatura Kalemi</th>
        <th v-if="selectedColumns.includes('content')" scope="col">İçerik</th>
        <th v-if="selectedColumns.includes('details')" scope="col">Detaylar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="report in reports" :key="report.id">
        <th scope="row">{{ report.id }}</th>
        <td v-if="selectedColumns.includes('company')">{{ report.company }}</td>
        <td v-if="selectedColumns.includes('branch')">{{ report.branch }}</td>
        <td v-if="selectedColumns.includes('department')">{{ report.department }}</td>
        <td v-if="selectedColumns.includes('person')">{{ report.person }}</td>
        <td v-if="selectedColumns.includes('invoice_items')">{{ report.invoice_items }}</td>
        <td v-if="selectedColumns.includes('content')">{{ report.content }}</td>
        <td v-if="selectedColumns.includes('details')">{{ report.details }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  reports: Array,
  selectedColumns: Array,
});
</script>
