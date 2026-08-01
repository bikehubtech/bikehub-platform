import type { IconName } from "../components/Icon";
import type { PageId } from "../types";

export type NavigationItem = {
  id: PageId;
  label: string;
  icon: IconName;
};

export const navigationItems: readonly NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "bike", label: "Minha Bike", icon: "bike" },
  { id: "club", label: "Clube do Ciclista", icon: "club" },
  { id: "benefits", label: "Benefícios", icon: "gift" },
  { id: "workshops", label: "Oficinas", icon: "tool" },
  { id: "marketplace", label: "Marketplace", icon: "market" },
  { id: "events", label: "Eventos", icon: "calendar" },
  { id: "stations", label: "Estações", icon: "drop" },
  { id: "notifications", label: "Notificações", icon: "bell" },
  { id: "profile", label: "Perfil", icon: "user" },
  { id: "settings", label: "Configurações", icon: "settings" },
] as const;
