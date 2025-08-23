"use client";

import { Sidebar, MobileSidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslation } from "@/contexts/translation-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Bell, Settings, Calendar as CalendarIcon, Clock, Plus } from "lucide-react";
import { useState } from "react";

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { t } = useTranslation();

  const scheduleItems = [
    { id: 1, content: "Promoción Navideña", device: "Todas las pantallas", time: "09:00 - 17:00", date: "2024-01-22", status: "active", repeat: "Diario" },
    { id: 2, content: "Video Corporativo", device: "Lobby Principal", time: "12:00 - 12:05", date: "2024-01-22", status: "scheduled", repeat: "Lunes a Viernes" },
    { id: 3, content: "Menú del Día", device: "Cafetería", time: "11:00 - 15:00", date: "2024-01-22", status: "active", repeat: "Lunes a Viernes" },
    { id: 4, content: "Anuncio de Seguridad", device: "Todas las pantallas", time: "Cada hora", date: "2024-01-22", status: "active", repeat: "Diario" },
    { id: 5, content: "Horarios de Reuniones", device: "Sala de Juntas", time: "08:00 - 18:00", date: "2024-01-23", status: "scheduled", repeat: "Lunes a Viernes" },
  ];

  const upcomingEvents = [
    { time: "14:30", content: "Promoción Navideña", device: "Pantalla Principal" },
    { time: "15:00", content: "Video Corporativo", device: "Lobby" },
    { time: "15:30", content: "Anuncio de Seguridad", device: "Todas las pantallas" },
    { time: "16:00", content: "Menú del Día", device: "Cafetería" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default" as const,
      scheduled: "secondary" as const,
      inactive: "outline" as const
    };
    return <Badge variant={variants[status as keyof typeof variants]}>{t(`content.status.${status}`)}</Badge>;
  };

  const getContentName = (name: string) => {
    const nameMap: { [key: string]: string } = {
      "Promoción Navideña": "content.content_items.christmas_promo",
      "Video Corporativo": "content.content_items.corporate_video",
      "Menú del Día": "content.content_items.daily_menu",
      "Anuncio de Seguridad": "content.content_items.security_announcement",
      "Horarios de Reuniones": "schedule.content_items.meeting_schedule"
    };
    return nameMap[name] ? t(nameMap[name]) : name;
  };

  const getDeviceName = (device: string) => {
    const deviceMap: { [key: string]: string } = {
      "Todas las pantallas": "content.devices.all_screens",
      "Lobby Principal": "schedule.devices.main_lobby",
      "Cafetería": "content.devices.cafeteria",
      "Sala de Juntas": "schedule.devices.meeting_room",
      "Pantalla Principal": "content.devices.main_screen",
      "Lobby": "content.devices.lobby"
    };
    return deviceMap[device] ? t(deviceMap[device]) : device;
  };

  const getRepeatName = (repeat: string) => {
    const repeatMap: { [key: string]: string } = {
      "Diario": "schedule.repeat_options.daily",
      "Lunes a Viernes": "schedule.repeat_options.weekdays",
      "Cada hora": "schedule.repeat_options.hourly"
    };
    return repeatMap[repeat] ? t(repeatMap[repeat]) : repeat;
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
                  <span className="text-sm text-muted-foreground">{t("schedule.title")}</span>
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
              <h1 className="text-2xl font-bold tracking-tight">{t("schedule.main_title")}</h1>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t("schedule.new_schedule_button")}
              </Button>
            </div>

            <Tabs defaultValue="schedule" className="space-y-4">
              <TabsList>
                <TabsTrigger value="schedule">{t("schedule.tabs.schedule")}</TabsTrigger>
                <TabsTrigger value="calendar">{t("schedule.tabs.calendar")}</TabsTrigger>
                <TabsTrigger value="events">{t("schedule.tabs.events")}</TabsTrigger>
              </TabsList>

              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("schedule.scheduled_content.title")}</CardTitle>
                    <CardDescription>
                      {t("schedule.scheduled_content.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[150px]">{t("schedule.scheduled_content.table.content")}</TableHead>
                          <TableHead className="min-w-[120px]">{t("schedule.scheduled_content.table.device")}</TableHead>
                          <TableHead className="min-w-[100px]">{t("schedule.scheduled_content.table.schedule")}</TableHead>
                          <TableHead className="hidden sm:table-cell min-w-[100px]">{t("schedule.scheduled_content.table.date")}</TableHead>
                          <TableHead className="hidden md:table-cell min-w-[120px]">{t("schedule.scheduled_content.table.repeat")}</TableHead>
                          <TableHead className="min-w-[80px]">{t("schedule.scheduled_content.table.status")}</TableHead>
                          <TableHead className="text-right min-w-[120px]">{t("schedule.scheduled_content.table.actions")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scheduleItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{getContentName(item.content)}</TableCell>
                            <TableCell>{getDeviceName(item.device)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                {item.time}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{item.date}</TableCell>
                            <TableCell className="hidden md:table-cell">{getRepeatName(item.repeat)}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <Button variant="ghost" size="sm" className="px-2">{t("common.actions.edit")}</Button>
                                <Button variant="ghost" size="sm" className="px-2">{t("common.actions.delete")}</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-4">
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>{t("schedule.calendar_view.title")}</CardTitle>
                      <CardDescription>
                        {t("schedule.calendar_view.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("schedule.calendar_view.selected_day_title")}</CardTitle>
                      <CardDescription>
                        {date ? date.toLocaleDateString('es-ES') : t("schedule.calendar_view.select_date")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {scheduleItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{getContentName(item.content)}</p>
                            <p className="text-sm text-muted-foreground">{item.time} - {getDeviceName(item.device)}</p>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("schedule.upcoming_events.title")}</CardTitle>
                      <CardDescription>
                        {t("schedule.upcoming_events.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 border rounded">
                          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                            <CalendarIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{getContentName(event.content)}</p>
                            <p className="text-sm text-muted-foreground">{getDeviceName(event.device)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold">{event.time}</p>
                            <p className="text-xs text-muted-foreground">{t("schedule.time_labels.today")}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("schedule.day_stats.title")}</CardTitle>
                      <CardDescription>
                        {t("schedule.day_stats.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t("schedule.day_stats.total_events")}</span>
                        <span className="text-2xl font-bold">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t("schedule.day_stats.active_events")}</span>
                        <span className="text-2xl font-bold text-green-600">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t("schedule.day_stats.pending")}</span>
                        <span className="text-2xl font-bold text-yellow-600">4</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t("schedule.day_stats.devices_used")}</span>
                        <span className="text-2xl font-bold">6</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
