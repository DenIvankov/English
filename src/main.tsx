import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import WordsPage from "./pages/WordsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import Authorization from "./pages/Authorization.tsx";
import Test from "./pages/Test.tsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.tsx";
import GuestRoute from "./components/routes/GuestRoute.tsx";
import CoursesPage from "./pages/CoursesPage.tsx";
import AudioPage from "./pages/AudioPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/" element={<Authorization />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<App />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/words" element={<WordsPage />} />
            <Route path="/audio" element={<AudioPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </QueryClientProvider>,
);
