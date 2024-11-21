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
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    },

    async writeJsonFile(formData) {
      try {
        const newReport = {
          id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
          company: formData.companyName,
          branch: formData.branch,
          department: formData.department,
          person: formData.person,
          invoice_items: formData.invoiceItem,
          content: formData.content,
          details: formData.detail,
        };

        const response = await axios.post("http://localhost:3001/reports", newReport);
        this.reports.push(response.data);
        return response.data;
      } catch (error) {
        console.error("Error writing report:", error);
        throw error;
      }
    },
  },
});
