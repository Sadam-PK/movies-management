const apiConfigUrl =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_URL
    : import.meta.env.VITE_PROD_BASE_URL;

export default apiConfigUrl;
