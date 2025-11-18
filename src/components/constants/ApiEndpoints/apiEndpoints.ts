export const API_ENDPOINTS = {
  // INIT: 'api/auth/init',
  AUTH: {
    LOGIN: "api/auth/login",
    REFRESH: "api/auth/refresh",
    // SIGNUP: "api/auth/signup",
    // FORGOT_PASSWORD: "api/auth/forgot-password",
    // POST_OTP: "api/auth/verify-otp-forget-password",
    // RESEND_OTP: "api/auth/resend-otp",
    // RESET_PASSWORD: "api/auth/reset-password",
    LOGOUT: "api/auth/logout",
  },
  DASHBOARD: {
    GET_HEADER: (branchId: number | null) => `api/dashboard/header/${branchId}`,
  },

  PRODUCT: {
    ADD_PRODUCT: "api/product/save",
    GET_ALL_PRODUCT: "api/product/get-all",
    DELETE_PRODUCT: "api/product/delete",
    ADD_PRODUCT_QUANTITY: (id: number | undefined) =>
      `api/product/add-quantity/${id}`,
    REMOVE_PRODUCT_QUANTITY: (
      branchId: number | undefined,
      productId: number | undefined
    ) => `api/product/remove-quantity/${branchId}/${productId}`,
    UPDATE_PRODUCT: (id: number | undefined) => `api/product/update/${id}`,
    ADD_OFFER_PRICE: (id: number | undefined) => `api/product/add-offer/${id}`,
    REMOVE_OFFER_PRICE: (id: number | undefined) =>
      `api/product/delete-offer/${id}`,
    GET_PRODUCT_QUANTITY: (
      branchId: number | null,
      productId: string | undefined
    ) => `api/product/get-by-product/${branchId}/${productId}`,
    GET_BATCH_NUMBER: (
      branchId: number | undefined,
      productId: number | null
    ) => `/api/product/get-batch/${branchId}/${productId}`,
  },
  BILLING: {
    ADD_SALES: "api/sale/save",
    GET_BATCH_WISE_PRODUCT: (branchId: number | null) =>
      `/api/product/get-batch-product/${branchId}`,
  },
  PATIENT: {
    CREATE_NEW_PATIENT: "api/patient/register",
    GET: "api/patient/get-all",
    UPDATE_PATIENT: (id: number | undefined) => `api/patient/update/${id}`,
  },
  SALES_HISTORY: {
    GET_SALES_HISTORY: (branchId: number | null) =>
      `api/sale/get-all/${branchId}`,
    DELETE_SALES_HISTORY: "api/sale/delete",
    UPDATE_SALES_HISTORY: (saleItemId: number | undefined) =>
      `api/sale/update-item/${saleItemId}`,
    DELETE_SALES_ITEM: "api/sale/delete-items",
    UPDATE_SALES_ITEM: (saleItemId: number | undefined) =>
      `api/sale/update-item/${saleItemId}`,
  },
  REPORTS: {
    GET_HEADER_DATA: (timeframe: string | undefined, branchId: number | null) =>
      `api/report/header/${timeframe}/${branchId}`,
    GET_TOP_SELLING_PRODUCTS: (
      timeframe: string | undefined,
      branchId: number | null
    ) => `api/report/top-selling-products/${timeframe}/${branchId}`,
    GET_TOP_CUSTOMERS: (
      timeframe: string | undefined,
      branchId: number | null
    ) => `api/report/top-customers/${timeframe}/${branchId}`,
    GET_RECENT_TRANSACTIONS: (
      // timeframe: string | undefined,
      branchId: number | null
    ) => `api/report/recent-transactions/${branchId}`,
    EXPORT_PDF_REPORT: (
      timeframe: string | undefined,
      branchId: number | null
    ) => `api/report/generate-pdf/${timeframe}/${branchId}`,
  },
  BRANCH: {
    ADD_BRANCH: "api/branch/save",
    GET_ALL_BRANCH: "api/branch/get-all",
    GET_BRANCH_DROPDOWN: "api/branch/get",
    UPDATE_BRANCH: (id: number | undefined) => `api/branch/update/${id}`,
    DELETE_BRANCH: "api/branch/delete",
  },
  DISCOUNT: {
    ADD_DISCOUNT: "api/discount/save",
    GET_ALL_DISCOUNT: "api/discount/get-all",
    DELETE_DISCOUNT: "api/discount/delete",
    UPDATE_DISCOUNT: (id: number | undefined) => `api/discount/update/${id}`,
  },
};
