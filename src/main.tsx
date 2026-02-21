import { StrictMode } from "react";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/main" element={<App />} />
          <Route path="/words" element={<WordsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
