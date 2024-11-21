<template>
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
          <div class="editor-container">
            <div class="editor-item">
              <label>Şirket ismine göre</label>
              <div class="editor-item-content">
                <ck-editor
                  class="test"
                  @updateContent="filterCompanyUpdate"
                  :is-simple-mode="true"
                  v-model="companyFilter"
                />
              </div>
            </div>
            <div class="editor-item tab">
              <label>Şubeye Göre Filtrele</label>
              <div class="editor-item-content">
                <ck-editor
                  class="test"
                  @updateContent="filterBranchUpdate"
                  :is-simple-mode="true"
                  v-model="branchFilter"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="filterCloseModal">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  isFilterOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "applyFilter", "filterCompanyUpdate", "filterBranchUpdate"]);

const companyFilter = ref("");
const branchFilter = ref("");

const filterCompanyUpdate = (filterValue) => {
  companyFilter.value = filterValue;
  emit("filterCompanyUpdate", filterValue);
  applyFilter();
};

const filterBranchUpdate = (filterValue) => {
  branchFilter.value = filterValue;
  emit("filterBranchUpdate", filterValue);
  applyFilter2();
};

const applyFilter = () => {
  emit("applyFilter", {
    companyFilter: companyFilter.value,
    branchFilter: branchFilter.value,
  });
};

const applyFilter2 = () => {
  emit("applyFilter2", {
    companyFilter: companyFilter.value,
    branchFilter: branchFilter.value,
  });
};

const filterCloseModal = () => {
  emit("close");
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-left: 500px;
}
.modal-dialog {
  max-width: 800px;
  width: 600px;
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #6c757d;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 5px;
  display: inline-block;
  color: #333;
}

.editor-container {
  display: flex;
}

.editor-item-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 240px;
}

.ck-editor__editable {
  min-height: 130px;
}

.modal-footer {
  padding: 10px;
  background-color: #f8f9fa;
  border-top: 1px solid #e1e1e1;
  text-align: right;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
.test {
  width: 200px;
}
.tab {
  margin-left: 20px;
}
</style>
