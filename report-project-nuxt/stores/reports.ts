import axios from "axios";

export const useReportStore = defineStore("reportStore", {
  state: () => ({
    reports: [],
  }),
  actions: {
    async fetchReports() {
      try {
        const response = await axios.get("http://localhost:3001/reports");
        this.reports = response.data;
        console.log("s");
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    },
  },
});
