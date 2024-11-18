<template>
  <div class="container mx-auto p-4">
    <div class="container mx-auto p-4 headerDiv">
      <div class="row col-md-12">
        <!--Filtre Butonu -->
        <div class="tag d-inline-block mr-1 mainDiv">
          <div title="Son 6 Ay" role="group" class="filter-button-group btn-group mainDiv">
            <button type="button" class="btn filter-button btn-light filterBtn">
              <div class="filter-title">Filtrele</div>
              <div class="filter-description"></div>
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-success addBtn" @click="openModal">Ekle</button>
        <button type="button" class="btn ml-1 btn-primary aplyBtn" @click="writeJsonFile">Uygula</button>
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
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Şirket Adı -->
              <label>Şirket adı giriniz:</label>
              <input type="text" v-model="ckeditorValueForm.companyName" class="form-control mb-3" />
              <div id="accordion">
                <!-- Branch -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Şube
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordion"
                  >
                    <div class="accordion-body">
                      <select v-model="ckeditorValueForm.branch" class="form-select mb-3">
                        <option value="">Şube Seçiniz</option>
                        <option value="Şube 1">Şube 1</option>
                        <option value="Şube 2">Şube 2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Departman
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordion"
                >
                  <div class="accordion-body">
                    <select v-model="ckeditorValueForm.department" class="form-select mb-3">
                      <option value="">Departman Seçiniz</option>
                      <option value="Departman 1">Departman 1</option>
                      <option value="Departman 2">Departman 2</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Fatura Kalemi
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordion"
                >
                  <div class="accordion-body">
                    <select v-model="ckeditorValueForm.invoiceItem" class="form-select mb-3">
                      <option value="">Fatura Kalemi Seçiniz</option>
                      <option value="Kalem 1">Kalem 1</option>
                      <option value="Kalem 2">Kalem 2</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Kişi Seçiniz
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordion"
                >
                  <div class="accordion-body">
                    <select v-model="ckeditorValueForm.person" class="form-select mb-3">
                      <option value="">Kişi Seçiniz</option>
                      <option value="Kisi 1">Kişi 1</option>
                      <option value="Kisi 2">Kişi 2</option>
                    </select>
                  </div>
                </div>
              </div>
              <label>İçerik giriniz:</label>
              <input type="text" v-model="ckeditorValueForm.content" class="form-control mb-3" />
              <div class="editor-container">
                <test @updateContent="handleContentUpdate" />
                <div v-html="ckValue"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Kapat</button>
              <button type="button" class="btn btn-primary" @click="saveChanges">Değişiklikleri Kaydet</button>
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
import { useReportStore } from "../stores/reports";
const content = ref("");
const reports = ref([]);
const ckValue = ref("");
const ckeditorValueForm = ref({
  companyName: "",
  branch: "",
  department: "",
  invoiceItem: "",
  person: "",
  content: "",
  detail: "",
});
const writeJsonFile = () => {
  console.log("dosyaya yazıldı", ckeditorValueForm.value);
};
const saveChanges = () => {
  console.log("Form verisi:", ckeditorValueForm.value);
  closeModal();
};
const handleContentUpdate = (newValue) => {
  ckeditorValueForm.value.detail = newValue;
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
  content.value = "Başlangıç İçeriği";
};
const closeModal = () => {
  isModalOpen.value = false;
};
const selectedColumns = ref(["company", "branch", "department", "person", "invoice_items", "content", "details"]);

const reportStore = useReportStore();
await reportStore.fetchReports();
reports.value = reportStore.reports;
// console.log(reportStore.reports);
// const fetchReports = async () => {
//   try {
//     const { data } = await axios.get("http://localhost:3001/reports");
//   } catch (error) {
//     console.error("Veri çekme hatası:", error);
//   }
// };

const filteredReports = computed(() => {
  return reports.value.filter((report) => {
    return report.company.toLowerCase().includes(filter.value.company.toLowerCase());
  });
});

onMounted(() => {
  // fetchReports();
});
</script>

<style scoped>
.headerDiv {
  height: 80px;
}
.deneme {
  margin-top: 0;
}
.modalComp {
  margin-top: 50px;
}
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
