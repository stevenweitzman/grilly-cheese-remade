import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Upload,
  DollarSign,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/clients", label: "Clients", icon: Users },
    { path: "/admin/quotes", label: "Quotes", icon: FileText },
    { path: "/admin/messages", label: "Messages", icon: MessageSquare },
    { path: "/admin/documents", label: "Documents", icon: Upload },
    { path: "/admin/billing", label: "Billing", icon: DollarSign },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-4 border-b">
          <Link to="/admin/dashboard" className="text-xl font-bold text-primary">
            Admin Panel
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          <Button asChild variant="outline" className="w-full justify-start mb-4">
            <Link to="/portal/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Client Portal
            </Link>
          </Button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                asChild
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Link to={item.path}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}