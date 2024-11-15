<template>
  <div class="container mx-auto p-4">
    <div class="container mx-auto p-4">
      <div class="row col-md-12">
        <!--Filtre Butonu -->
        <div class="tag d-inline-block mr-1 mainDiv">
          <div title="Son 6 Ay" role="group" class="filter-button-group btn-group mainDiv">
            <button type="button" class="btn filter-button btn-light filterBtn" @click="openModal">
              <div class="filter-title">Filtrele</div>
              <div class="filter-description"></div>
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-success addBtn">Ekle</button>
        <button type="button" class="btn ml-1 btn-primary aplyBtn">Uygula</button>
      </div>
      <!-- Modal -->
      <div
        v-if="isModalOpen"
        class="modal fade show"
        id="myModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style="display: block"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal Başlık</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="closeModal"
              ></button>
            </div>
            <div class="modal-body">Buraya modal içeriği gelecek.</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Kapat</button>
              <button type="button" class="btn btn-primary">Değişiklikleri Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <label for="companyFilter" class="text-sm font-medium text-gray-600">Şirket Ara:</label>
      <input
        id="companyFilter"
        v-model="filter.company"
        type="text"
        class="mt-1 p-2 border border-gray-300 rounded-md filterinput"
        placeholder="Şirket adı girin"
      />
    </div>
    <div class="mb-4">
      <ul class="flex space-x-4 cursor-pointer deneme">
        <li
          @click="toggleColumn('company')"
          :class="{ 'text-blue-600 font-semibold': selectedColumns.includes('company') }"
        >
          Şirket
        </li>
        <li
          deneme2
          @click="toggleColumn('branch')"
          :class="{ 'text-blue-600 font-semibold': selectedColumns.includes('branch') }"
        >
          Şube
        </li>
        <li
          deneme2
          @click="toggleColumn('department')"
          :class="{ 'text-blue-600 font-semibold': selectedColumns.includes('department') }"
        >
          Departman
        </li>
        <li
          deneme2
          @click="toggleColumn('person')"
          :class="{ 'text-blue-600 font-semibold': selectedColumns.includes('person') }"
        >
          Kişi
        </li>
        <li
          deneme2
          @click="toggleColumn('invoice_items')"
          :class="{ 'text-blue-600 font-semibold': selectedColumns.includes('invoice_items') }"
        >
          Fatura Kalemi
        </li>
        <li
          @click="toggleColumn('content')"
          :class="{ 'text-blue-600 font-semibold': selectedColumns.includes('content') }"
        >
          İçerik
        </li>
        <li
          @click="toggleColumn('details')"
          :class="{ 'text-blue-600 font-semibold': selectedColumns.includes('details') }"
        >
          Detaylar
        </li>
      </ul>
    </div>

    <!-- Tablo -->
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
          <!-- <th v-if="kapat">Boş</th> -->
        </tr>
        <!-- <button @click="kapatDegistir">tıkla</button> -->
      </thead>
      <tbody>
        <tr v-for="report in filteredReports" :key="report.id">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const reports = ref([]);
const kapat = ref(true);
const kapatDegistir = () => {
  kapat.value = !kapat.value;
};
const filter = ref({
  company: "",
});

const toggleColumn = (column) => {
  if (selectedColumns.value.includes(column)) {
    selectedColumns.value = selectedColumns.value.filter((col) => col !== column);
  } else {
    selectedColumns.value.push(column);
  }
};
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
const selectedColumns = ref(["company", "branch", "department", "person", "invoice_items", "content", "details"]);

const fetchReports = async () => {
  try {
    const { data } = await axios.get("http://localhost:3001/reports");
    reports.value = data;
  } catch (error) {
    console.error("Veri çekme hatası:", error);
  }
};

const filteredReports = computed(() => {
  return reports.value.filter((report) => {
    return report.company.toLowerCase().includes(filter.value.company.toLowerCase());
  });
});

const resetFilter = () => {
  filter.value.company = "";
};

onMounted(() => {
  fetchReports();
});
</script>

<style scoped>
.mainDiv {
  display: flex;
  width: 40px;
  height: 80px;
  margin-right: 60px;
  margin-bottom: 10px;
}
.addBtn {
  width: 70px;
  height: 40px;
}
.filterBtn {
  height: 40px;
}
.aplyBtn {
  font-weight: 400;
  width: 70px;
  margin-left: 5px;
  height: 40px;
}
.deneme {
  display: flex;
  flex-direction: row;
}
.filterinput {
  border-radius: 20px;
  margin-left: 12px;
}
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 10px;
  margin-right: 50px;
  list-style-type: none;
  cursor: pointer;
  transition: all 0.3s ease; /* Yumuşak geçiş efekti */
}

li:hover {
  text-decoration: underline;
  color: #1d4ed8; /* Hover durumunda renk değişimi */
}
.text-blue-600 {
  color: #2563eb;
}
.font-semibold {
  font-weight: 600;
}
</style>
