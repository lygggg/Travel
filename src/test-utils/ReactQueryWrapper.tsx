import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
  },
});
const ReactQueryWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryWrapper;
