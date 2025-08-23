"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "@/contexts/translation-context";
import { 
  Home, 
  FileImage, 
  Calendar,
  BarChart3,
  Settings,
  Monitor,
  Users,
  Bell,
  HelpCircle,
  Menu,
  Wifi
} from "lucide-react";

const getSidebarItems = (t: (key: string) => string) => [
  {
    title: t("common.menu.dashboard"),
    href: "/",
    icon: Home,
    description: "Vista general del sistema"
  },
  {
    title: t("content.title"),
    href: "/content",
    icon: FileImage,
    description: "Administrar archivos multimedia"
  },
  {
    title: t("common.menu.schedule"),
    href: "/schedule",
    icon: Calendar,
    description: "Programar contenido y eventos"
  },
  {
    title: t("common.menu.devices"),
    href: "/devices",
    icon: Monitor,
    description: "Monitorear pantallas digitales"
  },
  {
    title: t("common.menu.analytics"),
    href: "/analytics",
    icon: BarChart3,
    description: "Reportes y estadísticas"
  },
  {
    title: t("common.menu.users"),
    href: "/users",
    icon: Users,
    description: "Gestión de usuarios y roles"
  },
  {
    title: t("common.menu.connectivity"),
    href: "/connectivity",
    icon: Wifi,
    description: "Estado de red y conexiones"
  },
  {
    title: t("common.menu.notifications"),
    href: "/notifications",
    icon: Bell,
    description: "Alertas y notificaciones"
  },
  {
    title: t("common.menu.settings"),
    href: "/settings",
    icon: Settings,
    description: "Configuración del sistema"
  },
  {
    title: "Ayuda",
    href: "/help",
    icon: HelpCircle,
    description: "Documentación y soporte"
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const sidebarItems = getSidebarItems(t);

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Digital Signage
            </h2>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "ds-sidebar-item flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MobileSidebarProps {
  className?: string;
}

export function MobileSidebar({ className }: MobileSidebarProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const sidebarItems = getSidebarItems(t);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("md:hidden", className)}>
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Digital Signage
            </h2>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "ds-sidebar-item flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>{item.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
