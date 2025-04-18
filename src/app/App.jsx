import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Main from "../components/layouts/Main";
import Test from "../components/test/Test";
import "./App.css";

const queryClient = new QueryClient();

// Lazy-loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-3xl font-bold">
        <Router>
          <Main>
            <Suspense fallback={<div className="text-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/test" element={<Test />} />
              </Routes>
            </Suspense>
          </Main>
        </Router>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
