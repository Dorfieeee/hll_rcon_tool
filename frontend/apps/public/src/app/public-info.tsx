"use client"

import { usePublicInfoQuery } from './public-info-query';
import { Spinner } from "@shared/components/spinner"

export default function PublicInfo() {
  const [publicInfo, { isFetching }] = usePublicInfoQuery();

  return (
    <div>
      <span>{publicInfo.name.name}</span> {isFetching && <Spinner />}
    </div>
  );
}
