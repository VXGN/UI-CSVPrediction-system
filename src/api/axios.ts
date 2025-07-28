import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url?.includes("/auth/")) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// Fungsi upload file CSV
export const predict = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await API.post("/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default API;