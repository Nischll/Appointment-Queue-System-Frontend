// vite.config.ts
import { defineConfig } from "file:///D:/College/6th-sem/6th_sem_Project/AQMS-Frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/College/6th-sem/6th_sem_Project/AQMS-Frontend/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import fs from "fs";
import tailwindcss from "file:///D:/College/6th-sem/6th_sem_Project/AQMS-Frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\College\\6th-sem\\6th_sem_Project\\AQMS-Frontend";
var envPath = path.resolve(__vite_injected_original_dirname, "env.development.json");
var envConfig = {};
if (fs.existsSync(envPath)) {
  envConfig = JSON.parse(fs.readFileSync(envPath, "utf-8"));
  process.env.VITE_BASE_URL = envConfig.VITE_BASE_URL;
} else {
  console.error("Error: env.development.json not found");
}
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: parseInt(envConfig.VITE_PORT || "5000", 10)
  },
  plugins: [
    react(),
    tailwindcss()
    // mode === "development" && componentTagger(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   devOptions: {
    //     enabled: false,
    //   },
    //   manifest: {
    //     name: "NSSM",
    //     short_name: "NSSM",
    //     description: "App for billing system",
    //     theme_color: "#ffffff",
    //     background_color: "#ffffff",
    //     display: "standalone",
    //     scope: "/",
    //     start_url: "/",
    //     icons: [
    //       {
    //         src: "/icons/android-chrome-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/icons/android-chrome-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //     ],
    //   },
    //   workbox: {
    //     navigateFallback: "/index.html",
    //     maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    //     navigateFallbackAllowlist: [/^\/dashboard/, /^\/login/],
    //   },
    // }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "esnext",
    outDir: "dist"
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2xsZWdlXFxcXDZ0aC1zZW1cXFxcNnRoX3NlbV9Qcm9qZWN0XFxcXEFRTVMtRnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENvbGxlZ2VcXFxcNnRoLXNlbVxcXFw2dGhfc2VtX1Byb2plY3RcXFxcQVFNUy1Gcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29sbGVnZS82dGgtc2VtLzZ0aF9zZW1fUHJvamVjdC9BUU1TLUZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XHJcblxyXG5pbnRlcmZhY2UgRW52Q29uZmlnIHtcclxuICBWSVRFX0JBU0VfVVJMPzogc3RyaW5nO1xyXG4gIFZJVEVfUE9SVD86IHN0cmluZztcclxufVxyXG5cclxuLy8gUmVzb2x2ZSB0aGUgSlNPTiBmaWxlIHBhdGhcclxuY29uc3QgZW52UGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiZW52LmRldmVsb3BtZW50Lmpzb25cIik7XHJcblxyXG4vLyBSZWFkIEpTT04gY29uZmlnIHNhZmVseSB3aXRoIHR5cGVcclxubGV0IGVudkNvbmZpZzogRW52Q29uZmlnID0ge307XHJcbmlmIChmcy5leGlzdHNTeW5jKGVudlBhdGgpKSB7XHJcbiAgZW52Q29uZmlnID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoZW52UGF0aCwgXCJ1dGYtOFwiKSkgYXMgRW52Q29uZmlnO1xyXG4gIHByb2Nlc3MuZW52LlZJVEVfQkFTRV9VUkwgPSBlbnZDb25maWcuVklURV9CQVNFX1VSTDtcclxufSBlbHNlIHtcclxuICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IGVudi5kZXZlbG9wbWVudC5qc29uIG5vdCBmb3VuZFwiKTtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiOjpcIixcclxuICAgIHBvcnQ6IHBhcnNlSW50KGVudkNvbmZpZy5WSVRFX1BPUlQgfHwgXCI1MDAwXCIsIDEwKSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICB0YWlsd2luZGNzcygpLFxyXG4gICAgLy8gbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpLFxyXG4gICAgLy8gVml0ZVBXQSh7XHJcbiAgICAvLyAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXHJcbiAgICAvLyAgIGRldk9wdGlvbnM6IHtcclxuICAgIC8vICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgIC8vICAgfSxcclxuICAgIC8vICAgbWFuaWZlc3Q6IHtcclxuICAgIC8vICAgICBuYW1lOiBcIk5TU01cIixcclxuICAgIC8vICAgICBzaG9ydF9uYW1lOiBcIk5TU01cIixcclxuICAgIC8vICAgICBkZXNjcmlwdGlvbjogXCJBcHAgZm9yIGJpbGxpbmcgc3lzdGVtXCIsXHJcbiAgICAvLyAgICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgLy8gICAgIGJhY2tncm91bmRfY29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgLy8gICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxyXG4gICAgLy8gICAgIHNjb3BlOiBcIi9cIixcclxuICAgIC8vICAgICBzdGFydF91cmw6IFwiL1wiLFxyXG4gICAgLy8gICAgIGljb25zOiBbXHJcbiAgICAvLyAgICAgICB7XHJcbiAgICAvLyAgICAgICAgIHNyYzogXCIvaWNvbnMvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcclxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgLy8gICAgICAgfSxcclxuICAgIC8vICAgICAgIHtcclxuICAgIC8vICAgICAgICAgc3JjOiBcIi9pY29ucy9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxyXG4gICAgLy8gICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAvLyAgICAgICB9LFxyXG4gICAgLy8gICAgIF0sXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIHdvcmtib3g6IHtcclxuICAgIC8vICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiBcIi9pbmRleC5odG1sXCIsXHJcbiAgICAvLyAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDUgKiAxMDI0ICogMTAyNCxcclxuICAgIC8vICAgICBuYXZpZ2F0ZUZhbGxiYWNrQWxsb3dsaXN0OiBbL15cXC9kYXNoYm9hcmQvLCAvXlxcL2xvZ2luL10sXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyB9KSxcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxyXG4gICAgb3V0RGlyOiBcImRpc3RcIixcclxuICB9LFxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFUsU0FBUyxvQkFBb0I7QUFDelcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFFBQVE7QUFDZixPQUFPLGlCQUFpQjtBQUp4QixJQUFNLG1DQUFtQztBQVl6QyxJQUFNLFVBQVUsS0FBSyxRQUFRLGtDQUFXLHNCQUFzQjtBQUc5RCxJQUFJLFlBQXVCLENBQUM7QUFDNUIsSUFBSSxHQUFHLFdBQVcsT0FBTyxHQUFHO0FBQzFCLGNBQVksS0FBSyxNQUFNLEdBQUcsYUFBYSxTQUFTLE9BQU8sQ0FBQztBQUN4RCxVQUFRLElBQUksZ0JBQWdCLFVBQVU7QUFDeEMsT0FBTztBQUNMLFVBQVEsTUFBTSx1Q0FBdUM7QUFDdkQ7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU0sU0FBUyxVQUFVLGFBQWEsUUFBUSxFQUFFO0FBQUEsRUFDbEQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBbUNkLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
