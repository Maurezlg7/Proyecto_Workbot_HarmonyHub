import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            name: "Bulma Theme",
            fileName: (format) => {
                return `bulma-theme.${format}.js`;
            },
            entry: path.resolve(__dirname, "src/index.js"),
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
