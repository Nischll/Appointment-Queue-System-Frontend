import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { useState } from "react";
import { ModuleItem } from "../ContextApi/AuthContext";

function getIcon(name?: string) {
  if (!name) return Icons.Circle; // fallback

  // lucide icons exist as keys of this object
  const Icon = (Icons as Record<string, any>)[name];

  return Icon ?? Icons.Circle;
}

export function SidebarNav({ modules }: { modules: ModuleItem[] }) {
  return (
    <ul className="space-y-1">
      {modules.map((item) => (
        <SidebarItem key={item.name} item={item} />
      ))}
    </ul>
  );
}

function SidebarItem({
  item,
  level = 0,
}: {
  item: ModuleItem;
  level?: number;
}) {
  const Icon = getIcon(item.icon);
  const hasChildren = item.moduleList && item.moduleList.length > 0;

  const [open, setOpen] = useState(false);

  const isParent = hasChildren;
  const fontClass =
    level === 0
      ? isParent
        ? "font-semibold"
        : "font-semibold"
      : "font-medium";

  return (
    <li>
      {hasChildren ? (
        <>
          {/* Parent Item */}
          <div
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200 group text-muted-foreground hover:bg-accent hover:text-foreground",
              open && "bg-primary/5 text-foreground",
              fontClass,
            )}
            onClick={() => setOpen(!open)}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  open
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary",
                )}
              />{" "}
              {item.name}
            </div>
            <Icons.ChevronDown
              className={cn(
                "h-4 w-4 transition-all duration-200 text-muted-foreground group-hover:text-primary",
                open ? "rotate-180 text-primary" : "",
              )}
            />
          </div>

          {/* Nested Items */}
          {open && (
            <ul className="ml-6 mt-1 space-y-0.5 border-l-2 border-primary/20 pl-4">
              {item.moduleList
                .filter((child) => child.code !== "PROF")
                .map((child) => (
                  <SidebarItem
                    key={child.name}
                    item={child}
                    level={level + 1}
                  />
                ))}
            </ul>
          )}
        </>
      ) : (
        // Childless item -> NavLink
        <NavLink
          to={item.path?.startsWith("/") ? item.path : `/${item.path}`}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 group relative",
              fontClass,
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              {/* {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full" />
              )} */}
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors shrink-0",
                  isActive
                    ? ""
                    : "text-muted-foreground group-hover:text-primary",
                )}
              />
              <span className="truncate">{item.name}</span>
            </>
          )}
        </NavLink>
      )}
    </li>
  );
}
