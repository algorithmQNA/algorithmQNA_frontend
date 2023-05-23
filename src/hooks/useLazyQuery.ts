import type { QueryFunction, QueryKey, UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';

type UseQueryParams = Parameters<typeof useQuery>;

export default function useLazyQuery<TData, TError>(
  key: UseQueryParams[0],
  fetchFn: QueryFunction<TData, QueryKey>,
  options: Omit<
    UseQueryOptions<TData, TError, unknown, QueryKey>,
    'queryKey' | 'queryFn'
  > = {}
) {
  const query = useQuery(key, fetchFn, {
    ...options,
    enabled: false,
  });

  return [query.refetch, query] as const;
}

/**
 * typescript 출처 : https://gist.github.com/pureliani/8e46afbf47a1285d16724d997905f965
 */
