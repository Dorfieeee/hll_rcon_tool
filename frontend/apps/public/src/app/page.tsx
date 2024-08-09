import { Suspense } from "react";
import { getQueryClient } from "./get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { publicInfoOptions } from "./public-info-query";
import PublicInfo from "./public-info";

export default function Index() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(publicInfoOptions)

  return (
    <div>
      <div>This page is server-side-rendered</div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <PublicInfo />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
