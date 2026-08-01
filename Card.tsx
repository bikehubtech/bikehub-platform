import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Access } from "./pages/Access";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Bike } from "./pages/Bike";
import { Club, Benefits, Workshops, Marketplace, Events, Stations, Notifications, Profile, Settings } from "./pages/Modules";
import type { PageId } from "./types";

type Stage = "access" | "login" | "app";

export default function App() {
  const [stage, setStage] = useState<Stage>("access");
  const [page, setPage] = useState<PageId>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  if (stage === "access") {
    return <Access onEnter={() => setStage("app")} onLogin={() => setStage("login")} />;
  }

  if (stage === "login") {
    return <Login onSuccess={() => setStage("app")} onBack={() => setStage("access")} />;
  }

  const pages: Record<PageId, React.ReactNode> = {
    dashboard: <Dashboard onOpenBike={() => setPage("bike")} onOpenStations={() => setPage("stations")} onOpenBenefits={() => setPage("benefits")} />,
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
