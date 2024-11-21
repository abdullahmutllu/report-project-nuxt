<template>
  <div class="container mx-auto p-4">
    <div class="container mx-auto p-4 headerDiv">
      <div class="row col-md-12">
        <!--Filtre Butonu -->
        <div class="tag d-inline-block mr-1 mainDiv">
          <div title="Son 6 Ay" role="group" class="filter-button-group btn-group mainDiv">
            <button type="button" class="btn filter-button btn-light filterBtn" @click="filterOpenModal">
              <div class="filter-title">Filtrele</div>
              <div class="filter-description"></div>
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-success addBtn" @click="openModal">Ekle</button>

        <button type="button" class="btn ml-1 btn-primary aplyBtn" @click="resetFilter">Filtreyi Sıfırla</button>
      </div>
      <!-- Modal -->
      <ReportModal :is-open="isModalOpen" @close="closeModal" @save="handleSave" />
      <div
        v-if="isFilterOpen"
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
              <h5 class="modal-title" id="exampleModalLabel">Filtre</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="filterCloseModal"
              ></button>
            </div>
            <div class="modal-body">
              <div id="accordion">
                <!-- Branch -->
                <!-- <div class="accordion-item">
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
                </div> -->
              </div>

              <div class="editor-container test1">
                <div>
                  <label>Şirket ismine göre </label>
                  <ck-editor class="test" @updateContent="filterCompanyUpdate" :is-simple-mode="true" />
                  <button type="button" class="btn btn-primary test3" @click="applyFilter">
                    <p class="btnCnt">Uygula</p>
                  </button>
                </div>

                <div>
                  <label>Şubeye Göre Filtrele </label>
                  <ck-editor class="test" @updateContent="filterBranchUpdate" :is-simple-mode="true" />
                  <button type="button" class="btn btn-primary test3" @click="applyFilter2">
                    <p class="btnCnt">Uygula</p>
                  </button>
                </div>
                <div v-html="ckValue"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="filterCloseModal">Kapat</button>
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
const content = ref("");
const reports = ref([]);
const filteredComapanyReports = ref([]);
const filteredBranchReports = ref([]);
const ckValue = ref("");
const selectedColumns = ref(["company", "branch", "department", "person", "invoice_items", "content", "details"]);
// Store veri çekme işlemleri
const reportStore = useReportStore();
await reportStore.fetchReports();
reports.value = reportStore.reports;

// Anlık şirket arama
const filteredReports = computed(() => {
  return reports.value.filter((report) => {
    return report.company.toLowerCase().includes(filter.value.company.toLowerCase());
  });
});

const handleSave = (formData) => {
  console.log("Kaydedilen Veriler:", formData);
  closeModal();
};
const resetFilter = () => {
  const data = reportStore.reports;
  reports.value = data;
  console.log(data);
};

const applyFilter = () => {
  const filteredCompanyNames = filteredComapanyReports.value.map((rpt) => rpt.company.toLowerCase());
  const filteredData = filteredReports.value.filter((report) => {
    return filteredCompanyNames.includes(report.company.toLowerCase());
  });
  reports.value = filteredData;
};
const applyFilter2 = () => {
  const filteredBrancNames = filteredBranchReports.value.map((rpt) => rpt.branch.toLowerCase());
  const filteredData = filteredReports.value.filter((report) => {
    return filteredBrancNames.includes(report.branch.toLowerCase());
  });
  reports.value = filteredData;
};

const filterCompanyUpdate = (filterValue) => {
  console.log(filterValue);
  const crudeValue = filterValue.replace(/^<p>/, "").replace(/<\/p>$/, "");
  filteredComapanyReports.value = reports.value.filter((report) => {
    return report.company.toLowerCase().includes(crudeValue.toLowerCase());
  });
};
const filterBranchUpdate = (filterBranchValue) => {
  const crudeValue = filterBranchValue.replace(/^<p>/, "").replace(/<\/p>$/, "");
  filteredBranchReports.value = reports.value.filter((report) => {
    return report.branch.toLowerCase().includes(crudeValue.toLowerCase());
  });
};
const filter = ref({
  company: "",
});
// seçilen kolonları gosterdim
const toggleColumn = (column) => {
  if (selectedColumns.value.includes(column)) {
    selectedColumns.value = selectedColumns.value.filter((col) => col !== column);
  } else {
    selectedColumns.value.push(column);
  }
};
const isModalOpen = ref(false);
const isFilterOpen = ref(false);
const filterOpenModal = () => {
  isFilterOpen.value = true;
};
const filterCloseModal = () => {
  isFilterOpen.value = false;
};

const openModal = () => {
  isModalOpen.value = true;
  content.value = "Başlangıç İçeriği";
};
const closeModal = () => {
  isModalOpen.value = false;
};
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
  width: 120px;
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
  transition: all 0.3s ease;
}

li:hover {
  text-decoration: underline;
  color: #1d4ed8;
}
.text-blue-600 {
  color: #2563eb;
}
.font-semibold {
  font-weight: 600;
}
.test {
  min-height: 200px;
  max-height: 200px;
  width: 240px;
  margin-right: 10px;
}
.test1 {
  display: flex;
}
.test3 {
  margin-left: 125px;
  width: 90px;
  height: 33px;
  border-radius: 10px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.btnCnt {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
}
</style>
