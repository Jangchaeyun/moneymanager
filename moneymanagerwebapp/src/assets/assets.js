import logo from "./logo.png";
import login_bg from "./login-bg.png";
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react";

export const assets = {
  logo,
  login_bg,
};

export const SIDE_BAR_DATA = [
  {
    id: "01",
    label: "대시보드",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "카테고리",
    icon: List,
    path: "/category",
  },
  {
    id: "03",
    label: "소득",
    icon: Wallet,
    path: "/income",
  },
  {
    id: "04",
    label: "비용",
    icon: Coins,
    path: "/expense",
  },
  {
    id: "05",
    label: "필터",
    icon: FunnelPlus,
    path: "/filter",
  },
];
