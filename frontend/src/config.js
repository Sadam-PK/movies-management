// src/config.js

const apiConfigBaseUrl =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

export default apiConfigBaseUrl;
