import { UserData } from "../ContextApi/AuthContext";
import { useApiGet } from "./ApiGet";

export type ApiListResponse<T> = {
  statusCode: number;
  message: string;
  data: T | T[];
};

export const useGetInit = () => {
  return useApiGet<ApiListResponse<UserData>>("/api/init", {
    retry: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
