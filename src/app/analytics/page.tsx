"use client";

import { Sidebar, MobileSidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslation } from "@/contexts/translation-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Bell, Settings, Download, TrendingUp, Users, Eye, Monitor } from "lucide-react";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ActivityChart } from "@/components/charts/activity-chart";
import { ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const deviceUsageData = [
    { name: "Pantalla Principal", value: 35, color: "#8884d8" },
    { name: "Lobby", value: 25, color: "#82ca9d" },
    { name: "Cafetería", value: 20, color: "#ffc658" },
    { name: "Recepción", value: 15, color: "#ff7300" },
    { name: "Otros", value: 5, color: "#0088fe" },
  ];

  const getDeviceName = (name: string) => {
    const nameMap: { [key: string]: string } = {
      "Pantalla Principal": "analytics.device_names.main_screen",
      "Lobby": "analytics.device_names.lobby",
      "Cafetería": "analytics.device_names.cafeteria",
      "Recepción": "analytics.device_names.reception",
      "Otros": "analytics.device_names.others"
    };
    return nameMap[name] ? t(nameMap[name]) : name;
  };

  const getContentName = (content: string) => {
    const contentMap: { [key: string]: string } = {
      "Promoción Navideña": "analytics.content_items.christmas_promo",
      "Video Corporativo": "analytics.content_items.corporate_video",
      "Menú del Día": "analytics.content_items.daily_menu",
      "Anuncio de Seguridad": "analytics.content_items.security_announcement",
      "Horarios de Reuniones": "analytics.content_items.meeting_schedule"
    };
    return contentMap[content] ? t(contentMap[content]) : content;
  };

  const engagementData = [
    { time: "00:00", views: 120, interactions: 25 },
    { time: "04:00", views: 80, interactions: 15 },
    { time: "08:00", views: 300, interactions: 85 },
    { time: "12:00", views: 450, interactions: 120 },
    { time: "16:00", views: 380, interactions: 95 },
    { time: "20:00", views: 200, interactions: 45 },
  ];

  const contentPerformance = [
    { content: "Promoción Navideña", views: 2340, engagement: 85, devices: 4 },
    { content: "Video Corporativo", views: 1890, engagement: 72, devices: 2 },
    { content: "Menú del Día", views: 1650, engagement: 68, devices: 1 },
    { content: "Anuncio de Seguridad", views: 3200, engagement: 45, devices: 6 },
    { content: "Horarios de Reuniones", views: 890, engagement: 92, devices: 1 },
  ];

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
                  <span className="text-sm text-muted-foreground">{t("analytics.title")}</span>
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
              <h1 className="text-2xl font-bold tracking-tight">{t("analytics.main_title")}</h1>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                {t("analytics.export_report_button")}
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("analytics.stats.total_views")}</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24,320</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> {t("analytics.stats.total_views_desc").replace("+12.5% ", "")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("analytics.stats.engagement_rate")}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68.4%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2.1%</span> {t("analytics.stats.engagement_rate_desc").replace("+2.1% ", "")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("analytics.stats.avg_time")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4 min</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">-0.3%</span> {t("analytics.stats.avg_time_desc").replace("-0.3% ", "")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("analytics.stats.active_devices")}</CardTitle>
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5/6</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">83.3%</span> {t("analytics.stats.active_devices_desc").replace("83.3% ", "")}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">{t("analytics.tabs.overview")}</TabsTrigger>
                <TabsTrigger value="devices">{t("analytics.tabs.devices")}</TabsTrigger>
                <TabsTrigger value="content">{t("analytics.tabs.content")}</TabsTrigger>
                <TabsTrigger value="engagement">{t("analytics.tabs.engagement")}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("analytics.overview.views_trend_title")}</CardTitle>
                      <CardDescription>
                        {t("analytics.overview.views_trend_desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <RevenueChart />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("analytics.overview.device_activity_title")}</CardTitle>
                      <CardDescription>
                        {t("analytics.overview.device_activity_desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <ActivityChart />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="devices" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("analytics.devices.usage_title")}</CardTitle>
                      <CardDescription>
                        {t("analytics.devices.usage_desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={deviceUsageData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            dataKey="value"
                            label={({ name, value }) => `${getDeviceName(name)}: ${value}%`}
                          >
                            {deviceUsageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            labelStyle={{ color: "var(--popover-foreground)" }}
                            contentStyle={{
                              backgroundColor: "var(--popover)",
                              border: "1px solid var(--border)",
                              borderRadius: "var(--radius)",
                              color: "var(--popover-foreground)",
                              boxShadow: "var(--shadow-sm)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("analytics.devices.performance_title")}</CardTitle>
                      <CardDescription>
                        {t("analytics.devices.performance_desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {deviceUsageData.map((device) => (
                        <div key={device.name} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{getDeviceName(device.name)}</p>
                            <p className="text-sm text-muted-foreground">{device.value}% {t("analytics.devices.traffic_percent")}</p>
                          </div>
                                                      <div className="text-right">
                              <p className="text-lg font-semibold">{Math.round(24320 * (device.value / 100)).toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{t("analytics.devices.views")}</p>
                            </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("analytics.content.performance_title")}</CardTitle>
                    <CardDescription>
                      {t("analytics.content.performance_desc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contentPerformance.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded">
                          <div>
                            <p className="font-medium">{getContentName(item.content)}</p>
                            <p className="text-sm text-muted-foreground">{item.devices} {t("analytics.content.devices")}</p>
                          </div>
                          <div className="flex items-center space-x-8">
                            <div className="text-center">
                              <p className="text-lg font-semibold">{item.views.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{t("analytics.content.views")}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-semibold">{item.engagement}%</p>
                              <p className="text-xs text-muted-foreground">{t("analytics.content.engagement")}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("analytics.engagement.trends_title")}</CardTitle>
                    <CardDescription>
                      {t("analytics.engagement.trends_desc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={engagementData} style={{ backgroundColor: 'transparent' }}>
                        <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          labelStyle={{ color: "var(--popover-foreground)" }}
                          contentStyle={{
                            backgroundColor: "var(--popover)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius)",
                            color: "var(--popover-foreground)",
                            boxShadow: "var(--shadow-sm)",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="views"
                          stackId="1"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                          name={t("analytics.engagement.views")}
                        />
                        <Area
                          type="monotone"
                          dataKey="interactions"
                          stackId="2"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.6}
                          name={t("analytics.engagement.interactions")}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
