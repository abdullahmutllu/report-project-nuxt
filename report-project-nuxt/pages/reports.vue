<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Raporlar</h2>
      <button @click="resetFilter" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
        Filtreleri Sıfırla
      </button>
    </div>

    <div class="mb-6 border rounded-lg overflow-hidden">
      <div class="bg-white">
        <div class="border-b">
          <button
            @click="togglePanel('company')"
            class="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
          >
            <span class="font-medium">Şirket Filtresi</span>
            <span class="transform transition-transform" :class="{ 'rotate-180': openPanels.company }"> ▼ </span>
          </button>
          <div v-show="openPanels.company" class="px-4 py-3 bg-gray-50">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              <button
                v-for="company in uniqueCompanies"
                :key="company"
                class="px-3 py-2 rounded-lg text-sm"
                :class="[selectedCompany === company ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50']"
                @click="filterByCompany(company)"
              >
                {{ company }}
              </button>
            </div>
          </div>
        </div>
        <div class="border-b">
          <button
            @click="togglePanel('branch')"
            class="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
          >
            <span class="font-medium">Şube Filtresi</span>
            <span class="transform transition-transform" :class="{ 'rotate-180': openPanels.branch }"> ▼ </span>
          </button>
          <div v-show="openPanels.branch" class="px-4 py-3 bg-gray-50">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              <button
                v-for="branch in uniqueBranches"
                :key="branch"
                class="px-3 py-2 rounded-lg text-sm"
                :class="[selectedBranch === branch ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50']"
                @click="filterByBranch(branch)"
              >
                {{ branch }}
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            @click="togglePanel('department')"
            class="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
          >
            <span class="font-medium">Departman Filtresi</span>
            <span class="transform transition-transform" :class="{ 'rotate-180': openPanels.department }"> ▼ </span>
          </button>
          <div v-show="openPanels.department" class="px-4 py-3 bg-gray-50">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              <button
                v-for="department in uniqueDepartments"
                :key="department"
                class="px-3 py-2 rounded-lg text-sm"
                :class="[
                  selectedDepartment === department ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50',
                ]"
                @click="filterByDepartment(department)"
              >
                {{ department }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasActiveFilters" class="mb-4 flex flex-wrap gap-2">
      <div v-if="selectedCompany" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2">
        Şirket: {{ selectedCompany }}
        <button @click="removeFilter('company')" class="text-blue-600 hover:text-blue-800">×</button>
      </div>
      <div v-if="selectedBranch" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2">
        Şube: {{ selectedBranch }}
        <button @click="removeFilter('branch')" class="text-blue-600 hover:text-blue-800">×</button>
      </div>
      <div v-if="selectedDepartment" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2">
        Departman: {{ selectedDepartment }}
        <button @click="removeFilter('department')" class="text-blue-600 hover:text-blue-800">×</button>
      </div>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th
              v-for="column in visibleColumns"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="report in filteredReports" :key="report.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ report.id }}
            </td>
            <td
              v-for="column in visibleColumns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ report[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const reports = ref([]);
const selectedCompany = ref(null);
const selectedBranch = ref(null);
const selectedDepartment = ref(null);
const openPanels = ref({
  company: false,
  branch: false,
  department: false,
});

const columns = ref([
  { key: "company", label: "Şirket" },
  { key: "branch", label: "Şube" },
  { key: "department", label: "Departman" },
  { key: "person", label: "Kişi" },
  { key: "invoice_items", label: "Fatura Kalemi" },
  { key: "content", label: "İçerik" },
  { key: "details", label: "Detaylar" },
]);

const uniqueCompanies = computed(() => [...new Set(reports.value.map((report) => report.company))]);

const uniqueBranches = computed(() => [...new Set(reports.value.map((report) => report.branch))]);

const uniqueDepartments = computed(() => [...new Set(reports.value.map((report) => report.department))]);

const hasActiveFilters = computed(() => selectedCompany.value || selectedBranch.value || selectedDepartment.value);

const filteredReports = computed(() => {
  let filtered = reports.value;

  if (selectedCompany.value) {
    filtered = filtered.filter((report) => report.company === selectedCompany.value);
  }
  if (selectedBranch.value) {
    filtered = filtered.filter((report) => report.branch === selectedBranch.value);
  }
  if (selectedDepartment.value) {
    filtered = filtered.filter((report) => report.department === selectedDepartment.value);
  }

  return filtered;
});

const visibleColumns = computed(() => {
  let visibleKeys = ["company", "branch", "department"];

  if (selectedCompany.value) {
    visibleKeys = visibleKeys.filter((key) => key !== "company");
  }
  if (selectedBranch.value) {
    visibleKeys = visibleKeys.filter((key) => key !== "branch");
  }
  if (selectedDepartment.value) {
    visibleKeys = visibleKeys.filter((key) => key !== "department");
  }

  visibleKeys.push("person", "invoice_items", "content", "details");

  return columns.value.filter((col) => visibleKeys.includes(col.key));
});

const togglePanel = (panel) => {
  openPanels.value[panel] = !openPanels.value[panel];
};

const filterByCompany = (company) => {
  selectedCompany.value = company;
  openPanels.value.company = false;
};

const filterByBranch = (branch) => {
  selectedBranch.value = branch;
  openPanels.value.branch = false;
};

const filterByDepartment = (department) => {
  selectedDepartment.value = department;
  openPanels.value.department = false;
};

const removeFilter = (filter) => {
  if (filter === "company") selectedCompany.value = null;
  if (filter === "branch") selectedBranch.value = null;
  if (filter === "department") selectedDepartment.value = null;
};

const resetFilter = () => {
  selectedCompany.value = null;
  selectedBranch.value = null;
  selectedDepartment.value = null;
  Object.keys(openPanels.value).forEach((key) => {
    openPanels.value[key] = false;
  });
};

const fetchReports = async () => {
  try {
    const { data } = await axios.get("http://localhost:3001/reports");
    reports.value = data;
  } catch (error) {
    console.error("Veri çekme hatası:", error);
  }
};

onMounted(() => {
  fetchReports();
});
</script>

<style>
/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Table hover effects */
.table-row-hover {
  transition: all 0.2s ease-in-out;
}

.table-row-hover:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Button transitions */
button {
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.98);
}

/* Focus styles */
input:focus,
button:focus {
  outline: none;
  ring-color: #3b82f6;
  ring-offset-color: #ffffff;
}
</style>
