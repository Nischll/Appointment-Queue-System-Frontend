import { apiService } from '@/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

interface UseGetApiConfig<TData = unknown> {
  queryParams?: Record<string, any>;
  enabled?: boolean;
  axiosConfig?: AxiosRequestConfig;
  staleTime?: number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  select?: UseQueryOptions<TData, Error>['select'];
  retry?: UseQueryOptions<TData, Error>['retry'];
}

export const useApiGet = <T>(
  endpoint: string | string[],
  config?: UseGetApiConfig<T>
) => {
  const {
    queryParams,
    enabled = true,
    axiosConfig,
    staleTime = Infinity,
    refetchOnMount = false,
    refetchOnWindowFocus = false,
    refetchOnReconnect = false,
    select,
    retry,
  } = config || {};

  const queryKey = queryParams
    ? [
        Array.isArray(endpoint) ? endpoint[0] : endpoint,
        JSON.stringify(queryParams),
      ]
    : [Array.isArray(endpoint) ? endpoint[0] : endpoint];

  const options: UseQueryOptions<T, Error, T, typeof queryKey> = {
    queryKey,
    enabled,
    staleTime,
    refetchOnMount,
    refetchOnWindowFocus,
    refetchOnReconnect,
    select,
    retry,
    queryFn: async () => {
      try {
        const response = await apiService.get<T>(
          Array.isArray(endpoint) ? endpoint[0] : endpoint,
          {
            params: queryParams,
            ...axiosConfig,
          }
        );
        return response.data;
      } catch (error: any) {
        // const message =
        //   error?.response?.data?.message || 'Something went wrong';
        // toast.error(message, {
        //   autoClose: 2000,
        //   position: 'bottom-center',
        //   className: 'black-background',
        //   progressClassName: 'fancy-progress-bar',
        // });
        // toast.clearWaitingQueue();
        throw error;
      }
    },
  };

  return useQuery(options);
};
