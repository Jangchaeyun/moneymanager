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
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  ADD_INCOME: "/incomes",
  DELTE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
  EMAIL_INCOME: "/email/income-excel",
  GET_ALL_EXPENSE: "/expenses",
  ADD_EXPENSE: "/expenses",
  DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  EXPENSE_EXCEL_DOWNLOAD: "excel/download/expense",
  EMAIL_EXPENSE: "/email/expense-excel",
  APPLY_FILTERS: "/filter",
  DASHBOARD_DATA: "/dashboard",
  UPLOAD_IMAGE: `https://pi.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
