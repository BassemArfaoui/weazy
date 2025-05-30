import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";


import Main from "../components/layouts/Main";
import Test from "../components/test/Test";
import "./App.css";
import Loading from "../components/tools/Loading";
import { ConversationProvider } from "../Contexts/ConversationContext";
import PromptAreaSkeleton from "../components/tools/PromptAreaSKeleton";
import CustomToaster from "../components/tools/CustomToaster";
const queryClient = new QueryClient();

// Lazy-loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const ChatPage = lazy(() => import("../pages/ChatPage"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <div className="text-3xl font-bold *:font-inter">
          <Router>
      <ConversationProvider>
            <CustomToaster />
            <Main>
              <Suspense
                fallback={
                  <div className="w-full h-[80%] flex items-center justify-center">
                    <Loading size={0.7} />
                  </div>
                }
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Suspense
                        fallback={
                          <div className="w-full h-[80%] flex items-center justify-center">
                            <Loading size={0.7} />
                          </div>
                        }
                      >
                        <HomePage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/chat/:chatId"
                    element={
                      <Suspense fallback={<PromptAreaSkeleton />}>
                        <ChatPage />
                      </Suspense>
                    }
                  />
                  <Route path="/test" element={<Test />} />
                </Routes>
              </Suspense>
            </Main>
      </ConversationProvider>
          </Router>
        </div>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
