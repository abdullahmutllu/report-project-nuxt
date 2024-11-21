<template>
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
          <label>Şirket adı giriniz:</label>
          <input type="text" v-model="ckeditorValueForm.companyName" class="form-control mb-3" />

          <div id="accordion">
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

            <!-- Departman Seçimi -->
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

            <!-- Fatura Kalemi Seçimi -->
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

            <!-- Kişi Seçimi -->
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFour">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Kişi Seçiniz
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="headingFour"
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
          </div>

          <label>İçerik Giriniz:</label>
          <input type="text" v-model="ckeditorValueForm.content" class="form-control mb-3" />

          <label>detay giriniz :</label>

          <div class="editor-container">
            <ck-editor @updateContent="handleContentUpdate" />
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Kapat</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">Değişiklikleri Kaydet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useReportStore } from "@/stores/reports";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "save"]);

const isModalOpen = ref(props.isOpen);
const ckValue = ref("");
const ckeditorValueForm = reactive({
  companyName: "",
  branch: "",
  department: "",
  invoiceItem: "",
  person: "",
  content: "",
  detail: "",
});

const reportStore = useReportStore();

const closeModal = () => {
  isModalOpen.value = false;
  emit("close");
};
const handleContentUpdate = (detail) => {
  const cleanedDetail = detail.replace(/<p>/g, "").replace(/<\/p>/g, "");
  ckeditorValueForm.detail = cleanedDetail;
};

const saveChanges = async () => {
  try {
    await reportStore.writeJsonFile({
      ...ckeditorValueForm,
    });
    console.log(ckeditorValueForm);
    emit("save");
    closeModal();
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};

watch(
  () => props.isOpen,
  (newValue) => {
    isModalOpen.value = newValue;
  }
);
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
