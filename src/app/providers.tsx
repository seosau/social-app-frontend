'use client'

import { ReduxProvider } from "@/lib/redux/provider";
import HydrateUser from "@/components/HydrateUser";
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from "@/lib/queryClient";

export default function Providers({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <HydrateUser />
        {children}
        {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && <ReactQueryDevtools />}
      </ReduxProvider>
    </QueryClientProvider>
  );
}
