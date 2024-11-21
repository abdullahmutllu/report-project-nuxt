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
      <FilterModal
        :isFilterOpen="isFilterOpen"
        @close="filterCloseModal"
        @applyFilter="applyFilter"
        @applyFilter2="applyFilter2"
        @filterCompanyUpdate="filterCompanyUpdate"
        @filterBranchUpdate="filterBranchUpdate"
      />
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
    <ReportTable :reports="filteredReports" :selectedColumns="selectedColumns" />
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

.btnCnt {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
}
</style>
