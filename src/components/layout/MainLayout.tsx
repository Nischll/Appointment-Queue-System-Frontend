import { Suspense, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Menu,
  X,
  LogOut,
  Bolt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApiMutation } from "../ApiCall/ApiMutation";
import { API_ENDPOINTS } from "../constants/ApiEndpoints/apiEndpoints";
import { useAuth } from "../ContextApi/AuthContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { LoadingData } from "@/helper/loadingData";
import { SidebarNav } from "./SidebarNav";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const { mutate: postLogout, isPending } = useApiMutation(
    "post",
    API_ENDPOINTS.AUTH.LOGOUT,
  );

  const handleLogout = () => {
    postLogout(undefined, {
      onSuccess: () => {
        navigate("/");
        logout();
      },
    });
  };

  if (isPending) return <LoadingData />;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-65 transform bg-card border-r border-border transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border bg-card">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">AQMS</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 py-1 column-scrollbar">
            <SidebarNav modules={user?.moduleList || []} />
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2025 AQMS</p>
              <p>Nepal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 h-full">
        {/* Top bar */}
        <div className="sticky w-inherit top-0 z-20 h-16 border-b-2 border-border/50 bg-background/95 backdrop-blur-sm shadow-sm">
          <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden h-9 w-9 p-0 hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="ml-auto flex gap-5">
              <div className="text-sm text-muted-foreground">
                Welcome to Appointment & Queue Management System
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <LogOut
                    size={20}
                    onClick={handleLogout}
                    className="cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent side="top">Log out</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Scrollable Page Content */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden column-scrollbar py-2 px-3">
          <Suspense fallback={<LoadingData />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
