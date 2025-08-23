"use client";

import { Sidebar, MobileSidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslation } from "@/contexts/translation-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, Bell, Settings, Monitor, Wifi, Power, Activity } from "lucide-react";

export default function DevicesPage() {
  const { t } = useTranslation();
  const devices = [
    { id: 1, name: "Pantalla Principal", location: "Lobby Principal", status: "online", ip: "192.168.1.101", content: "Promoción Navideña" },
    { id: 2, name: "Pantalla Lobby", location: "Entrada Principal", status: "online", ip: "192.168.1.102", content: "Video Corporativo" },
    { id: 3, name: "Pantalla Cafetería", location: "Área de Descanso", status: "offline", ip: "192.168.1.103", content: "Menú del Día" },
    { id: 4, name: "Pantalla Recepción", location: "Recepción", status: "warning", ip: "192.168.1.104", content: "Información General" },
    { id: 5, name: "Pantalla Sala de Juntas", location: "Piso 2", status: "online", ip: "192.168.1.105", content: "Horarios de Reuniones" },
    { id: 6, name: "Pantalla Ascensor", location: "Ascensor Principal", status: "online", ip: "192.168.1.106", content: "Noticias Internas" },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      online: { variant: "default" as const, label: t("devices.status.online"), color: "text-green-600" },
      offline: { variant: "destructive" as const, label: t("devices.status.offline"), color: "text-red-600" },
      warning: { variant: "secondary" as const, label: t("devices.status.warning"), color: "text-yellow-600" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;
  };

  const getDeviceName = (name: string) => {
    const nameMap: { [key: string]: string } = {
      "Pantalla Principal": "devices.device_names.main_screen",
      "Pantalla Lobby": "devices.device_names.lobby_screen",
      "Pantalla Cafetería": "devices.device_names.cafeteria_screen",
      "Pantalla Recepción": "devices.device_names.reception_screen",
      "Pantalla Sala de Juntas": "devices.device_names.meeting_room_screen",
      "Pantalla Ascensor": "devices.device_names.elevator_screen"
    };
    return nameMap[name] ? t(nameMap[name]) : name;
  };

  const getLocationName = (location: string) => {
    const locationMap: { [key: string]: string } = {
      "Lobby Principal": "devices.locations.main_lobby",
      "Entrada Principal": "devices.locations.main_entrance",
      "Área de Descanso": "devices.locations.break_area",
      "Recepción": "devices.locations.reception",
      "Piso 2": "devices.locations.floor_2",
      "Ascensor Principal": "devices.locations.main_elevator"
    };
    return locationMap[location] ? t(locationMap[location]) : location;
  };

  const getContentName = (content: string) => {
    const contentMap: { [key: string]: string } = {
      "Promoción Navideña": "devices.content_items.christmas_promo",
      "Video Corporativo": "devices.content_items.corporate_video",
      "Menú del Día": "devices.content_items.daily_menu",
      "Información General": "devices.content_items.general_info",
      "Horarios de Reuniones": "devices.content_items.meeting_schedule",
      "Noticias Internas": "devices.content_items.internal_news"
    };
    return contentMap[content] ? t(contentMap[content]) : content;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar Desktop */}
        <div className="hidden md:block w-64 bg-muted/40 border-r">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-4 md:px-6">
              <div className="flex items-center space-x-4">
                <MobileSidebar />
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold">{t("common.dashboard")}</h2>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-sm text-muted-foreground">{t("devices.title")}</span>
                </div>
              </div>
              <div className="ml-auto flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <ThemeToggle />
                <LanguageSelector />

                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">{t("devices.main_title")}</h1>
              <Button>
                <Monitor className="h-4 w-4 mr-2" />
                {t("devices.add_device_button")}
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="ds-dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("devices.stats.total_devices")}</CardTitle>
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">{t("devices.stats.total_devices_desc")}</p>
                </CardContent>
              </Card>

              <Card className="ds-dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("devices.stats.online")}</CardTitle>
                  <Wifi className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold ds-status-online">4</div>
                  <p className="text-xs text-muted-foreground">{t("devices.stats.online_desc")}</p>
                </CardContent>
              </Card>

              <Card className="ds-dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("devices.stats.offline")}</CardTitle>
                  <Power className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold ds-status-offline">1</div>
                  <p className="text-xs text-muted-foreground">{t("devices.stats.offline_desc")}</p>
                </CardContent>
              </Card>

              <Card className="ds-dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("devices.stats.warnings")}</CardTitle>
                  <Activity className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold ds-status-warning">1</div>
                  <p className="text-xs text-muted-foreground">{t("devices.stats.warnings_desc")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Devices Grid */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {devices.map((device) => {
                const statusConfig = getStatusBadge(device.status);
                return (
                  <Card key={device.id} className="ds-dashboard-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{getDeviceName(device.name)}</CardTitle>
                        <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                      </div>
                      <CardDescription>{getLocationName(device.location)}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("devices.device_card.ip")}</span>
                          <span className="font-mono">{device.ip}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-muted-foreground">{t("devices.device_card.current_content")}</span>
                                                      <span className="sm:text-right break-words">{getContentName(device.content)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            defaultChecked={device.status === "online"} 
                            disabled={device.status === "offline"}
                          />
                          <span className="text-sm">{t("devices.device_card.active")}</span>
                        </div>
                        <div className="flex space-x-2">
                                                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              {t("devices.device_card.configure")}
                            </Button>
                                                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              {t("devices.device_card.view_details")}
                            </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
