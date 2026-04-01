export const BASE_URL = "http://localhost:8080/api/v1.0";
export const CLOUDINARY_CLOUD_NAME = "dmxnml9p1";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEOGRY: (categoryId) => `/categories/${categoryId}`,
  GET_ALL_INCOMES: "/incomes",
  UPLOAD_IMAGE: `https://pi.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
