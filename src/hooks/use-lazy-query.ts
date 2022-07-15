import { useCallback, useState } from "react";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

export const useLazyQuery = <T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T, QueryKey>,
  options?:
    | Omit<UseQueryOptions<T, unknown, T, QueryKey>, "queryKey" | "queryFn">
    | undefined
  // без этого ТС не понимает возвращает функция =))
): [() => void, UseQueryResult<T>] => {
  const [enabled, setEnabled] = useState(false);
  const query = useQuery<T>(queryKey, queryFn, { ...options, enabled });

  const queryHandler = useCallback(() => {
    setEnabled(true);
  }, []);

  return [queryHandler, query];
};
