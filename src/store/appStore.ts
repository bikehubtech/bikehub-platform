import type { PageId } from "../types";

export type AppState = {
  activePage: PageId;
  sidebarOpen: boolean;
};

export const initialAppState: Readonly<AppState> = {
  activePage: "dashboard",
  sidebarOpen: false,
};
