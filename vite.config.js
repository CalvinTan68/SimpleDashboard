import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("axios")) {
            return "@axios";
          } else if (id.includes("react-icons")) {
            return "@react-icons";
          } else if (id.includes("react-router-dom")) {
            return "@react-router";
          } else if (id.includes("@ant-design/icons")) {
            return "@icons";
          } else if (id.includes("@ant-design/charts")) {
            return "@charts";
          } else if (id.includes("dayjs")) {
            return "dayjs";
          }
        },
      },
    },
  },
});
