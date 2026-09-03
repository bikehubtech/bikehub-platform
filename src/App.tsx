import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./layout/Sidebar";
import { Topbar } from "./layout/Topbar";
import { Access } from "./pages/Access";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Bike } from "./pages/Bike";
import { Club, Benefits, Workshops, Marketplace, Events, Stations, Notifications, Profile, Settings } from "./pages/Modules";
import { useAuth } from "./hooks";
import type { PageId } from "./types";

type Stage = "access" | "login";

export default function App() {
  const { user, isLoading } = useAuth();
  const [stage, setStage] = useState<Stage>("access");
  const [page, setPage] = useState<PageId>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user, stage, page]);

  useEffect(() => {
    if (!user) {
      setStage("access");
      setPage("dashboard");
    }
  }, [user]);

  if (isLoading) {
    return (
      <main className="auth-loading">
        <div className="auth-loading__spinner" />
      </main>
    );
  }

  if (!user) {
    if (stage === "login") {
      return <Login onBack={() => setStage("access")} />;
    }
    return <Access onLogin={() => setStage("login")} />;
  }

  const pages: Record<PageId, ReactNode> = {
    dashboard: (
      <Dashboard
        onOpenBike={() => setPage("bike")}
        onOpenStations={() => setPage("stations")}
        onOpenBenefits={() => setPage("benefits")}
        onOpenEvents={() => setPage("events")}
      />
    ),
    bike: <Bike />,
    club: <Club />,
    benefits: <Benefits />,
    workshops: <Workshops />,
    marketplace: <Marketplace />,
    events: <Events />,
    stations: <Stations />,
    notifications: <Notifications />,
    profile: <Profile />,
    settings: <Settings />,
  };

  return (
    <div className="app-shell">
      <Sidebar active={page} onChange={setPage} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="app-main">
        <Topbar onMenu={() => setMenuOpen(true)} onNotifications={() => setPage("notifications")} />
        {pages[page]}
      </main>
    </div>
  );
}
