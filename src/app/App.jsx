import { Suspense, lazy , useEffect } from "react";
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
  const themeString = import.meta.env.VITE_THEME;
  let theme=null;
  if(themeString) theme = JSON.parse(themeString);
  console.log('theme',theme)
  useEffect(() => {
    const root = document.documentElement;

    // Apply colors
    for (const [key, value] of Object.entries(theme?.colors || {})) {
      root.style.setProperty(`--theme-color-${key}`, value);
    }

    // Apply fonts
    for (const [key, value] of Object.entries(theme?.fonts || {})) {
      root.style.setProperty(`--theme-font-${key}`, value);
    }

    // Apply msgs
    if (theme?.msg) {
      root.style.setProperty('--msg-text', theme.msg.text );
      root.style.setProperty('--msg-bg', theme.msg.bg );
      root.style.setProperty('--msg-radius', theme.msg.radius);
    }

    // Apply details
    if (theme?.details) {
      root.style.setProperty('--border-color', theme.details.borderColor || '#6b7280');
      root.style.setProperty('--border-width', theme.details.borderWidth || '1px');
      root.style.setProperty('--border-style', theme.details.borderStyle || 'solid');
    }

  }, [theme]);
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
