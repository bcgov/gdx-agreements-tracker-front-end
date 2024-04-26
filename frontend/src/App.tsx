import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SubTitleProvider, TitleProvider } from "./context";

// Create a client
const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <SubTitleProvider>
      <TitleProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="pmo-app">
              <AppRouter />
            </div>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </TitleProvider>
    </SubTitleProvider>
  );
};

export default App;
