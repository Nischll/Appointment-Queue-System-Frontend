import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarNavProps {
  items: NavigationItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  // const location = useLocation();

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        // const isActive = location.pathname === item.href;

        return (
          <li key={item.name}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
