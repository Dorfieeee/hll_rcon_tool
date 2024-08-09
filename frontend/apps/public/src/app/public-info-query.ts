import axios from 'axios';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getBaseURL } from '@shared/lib/getBaseURL';
import { MapMode } from './types';

const baseURL = getBaseURL();

type UNIX_Timestamp = number;

export type PublicInfoResponse = {
  error: string | null;
  result: {
    name: {
      name: string;
      short_name: string;
    };
    current_map: {
      id: string;
      map: MapMode;
      start: UNIX_Timestamp;
    };
    next_map: {
      id: string;
      map: MapMode;
      start: UNIX_Timestamp;
    };
  };
  // other values
};

export async function fetchPublicInfo() {
  const { data } = await axios.get<PublicInfoResponse>(
    `${baseURL}/api/get_public_info`
  );

  if (data && data.error) {
    throw new Error(data.error);
  }

  return data;
}

export const publicInfoOptions = queryOptions({
  queryKey: [{ queryIdentifier: 'public-info' }],
  queryFn: fetchPublicInfo,
  staleTime: 5 * 1000,
  refetchInterval: 15 * 1000,
});

export function usePublicInfoQuery() {
  const query = useSuspenseQuery(publicInfoOptions);

  return [query.data.result, query] as const;
}
