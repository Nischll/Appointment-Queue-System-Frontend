import { API_ENDPOINTS } from "../constants/ApiEndpoints/apiEndpoints";
import { useApiMutation } from "./ApiMutation";

export const useLogin = () =>
  useApiMutation("post", API_ENDPOINTS.AUTH.LOGIN);