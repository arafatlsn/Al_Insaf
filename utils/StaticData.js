import BagIcon from "@/components/Icons/BagIcon";
import DashboardIcon from "@/components/Icons/DashboardIcon";
import DolorIcon from "@/components/Icons/DolorIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import ShopIcon from "@/components/Icons/ShopIcon";

export const sidebarOptions = [
  {
    id: 1,
    title: "Dashboard",
    route: "/",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    title: "shop",
    route: "shop",
    icon: <ShopIcon />,
  },
  {
    id: 3,
    title: "orders",
    route: "orders",
    icon: <DolorIcon />,
  },
  {
    id: 4,
    title: "products",
    route: "all-products",
    icon: <BagIcon />,
  },
  {
    id: 5,
    title: "create product",
    route: "create-product",
    icon: <PlusIcon />,
  },
];
