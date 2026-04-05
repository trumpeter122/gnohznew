import type React from "react";
import { useEffect } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import TranslationPage from "./pages/TranslationPage";

import "./index.css";
import { useState } from "react";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

const PAGE_NAMES = ["Home", "About", "Translation"] as const;

type PageName = (typeof PAGE_NAMES)[number];

const PAGES: {
  [k in PageName]: {
    route: string;
    component: React.ReactElement;
    hide?: boolean;
  };
} = {
  Home: {
    route: "/home",
    component: <HomePage />,
    hide: true,
  },
  About: {
    route: "/about",
    component: <AboutPage />,
  },
  Translation: {
    route: "/translation",
    component: <TranslationPage />,
  },
};

function App() {
  const [page, setPage] = useState<PageName>(PAGE_NAMES[0]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    for (const [k, v] of Object.entries(PAGES)) {
      if (location.pathname === v.route) {
        setPage(k as PageName);
        return;
      }
    }
    navigate(PAGES.Home.route);
  }, [location, navigate]);

  return (
    <div className="h-dvh flex flex-col bg-background/66 text-foreground overflow-x-auto overscroll-none">
      <header className="sticky top-0 z-50 w-full flex flex-col">
        <div className="p-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-background">
          <button
            type="button"
            className="text-center text-5xl font-extrabold tracking-tight text-balance text-accent cursor-default"
            onClick={() => {
              navigate(PAGES.Home.route);
            }}
          >
            Gnōhznéw
          </button>
          <nav className="flex flex-row align-center gap-3">
            {PAGE_NAMES.filter((p) => !PAGES[p].hide).map((p) => (
              <Button
                key={p}
                variant={page === p ? "link" : "ghost"}
                className={page === p ? "underline" : ""}
                onClick={() => {
                  navigate(PAGES[p].route);
                }}
              >
                {p}
              </Button>
            ))}
          </nav>
        </div>
        <div className="h-10 w-full bg-linear-to-b from-background to-background/0" />
      </header>
      <main className="flex-1 p-9 flex flex-col">{PAGES[page].component}</main>
    </div>
  );
}

export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
