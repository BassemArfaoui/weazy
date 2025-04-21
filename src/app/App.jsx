import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Main from "../components/layouts/Main";
import Test from "../components/test/Test";
import "./App.css";
import PageLoader from "../components/tools/PageLoader";
import Loading from "../components/tools/Loading";

const queryClient = new QueryClient();

// Lazy-loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-3xl font-bold *:font-inter">
        <Router>
          <Main>
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Loading size={0.9} cN="mb-25"/></div>}>
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
