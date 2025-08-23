"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Activity, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar as CalendarIcon,
  Settings,
  Bell,
  Search,
  FileImage,
  Menu
} from "lucide-react";
import { useState } from "react";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ActivityChart } from "@/components/charts/activity-chart";
import { Sidebar, MobileSidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslation } from "@/contexts/translation-context";

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { t } = useTranslation();

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
                <h2 className="text-lg font-semibold">{t("common.dashboard")}</h2>
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

          {/* Main Dashboard */}
          <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="ds-dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.metrics.total_revenue")}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +20.1%
                </span>
                {t("dashboard.metrics.since_last_month")}
              </p>
            </CardContent>
          </Card>

          <Card className="ds-dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.metrics.subscriptions")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +180.1%
                </span>
                {t("dashboard.metrics.since_last_month")}
              </p>
            </CardContent>
          </Card>

          <Card className="ds-dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.metrics.sales")}</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +19%
                </span>
                {t("dashboard.metrics.since_last_month")}
              </p>
            </CardContent>
          </Card>

          <Card className="ds-dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.metrics.active_now")}</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -2%
                </span>
                {t("dashboard.metrics.since_last_hour")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Calendar Row */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
          <Card className="lg:col-span-4 ds-dashboard-card">
            <CardHeader>
              <CardTitle>{t("dashboard.charts.revenue_summary")}</CardTitle>
              <CardDescription>
                {t("dashboard.charts.revenue_summary_desc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <RevenueChart />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 ds-dashboard-card">
            <CardHeader>
              <CardTitle>{t("dashboard.calendar.title")}</CardTitle>
              <CardDescription>
                {t("dashboard.calendar.description")}
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
        </div>

        {/* Activity and Goals Row */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
          <Card className="lg:col-span-4 ds-dashboard-card">
            <CardHeader>
              <CardTitle>{t("dashboard.activity.recent_activity")}</CardTitle>
              <CardDescription>
                {t("dashboard.activity.recent_activity_desc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("dashboard.table.status")}</TableHead>
                    <TableHead>{t("dashboard.table.email")}</TableHead>
                    <TableHead>{t("dashboard.table.amount")}</TableHead>
                    <TableHead className="text-right">{t("dashboard.table.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="default">{t("dashboard.status_values.successful")}</Badge>
                    </TableCell>
                    <TableCell>ken99@example.com</TableCell>
                    <TableCell>$316.00</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">{t("common.actions.view")}</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="default">{t("dashboard.status_values.successful")}</Badge>
                    </TableCell>
                    <TableCell>abe45@example.com</TableCell>
                    <TableCell>$242.00</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">{t("common.actions.view")}</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary">{t("dashboard.status_values.processing")}</Badge>
                    </TableCell>
                    <TableCell>monserrat44@example.com</TableCell>
                    <TableCell>$837.00</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">{t("common.actions.view")}</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="destructive">{t("dashboard.status_values.failed")}</Badge>
                    </TableCell>
                    <TableCell>carmella@example.com</TableCell>
                    <TableCell>$721.00</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">{t("common.actions.view")}</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 ds-dashboard-card">
            <CardHeader>
              <CardTitle>{t("dashboard.activity.activity_goals")}</CardTitle>
              <CardDescription>
                {t("dashboard.activity.activity_goals_desc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t("dashboard.activity.content_published")}</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t("dashboard.activity.engagement_rate")}</span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t("dashboard.activity.active_devices")}</span>
                  <span className="text-sm text-muted-foreground">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              
              <div className="pt-4">
                <Button className="w-full" size="sm">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {t("common.actions.establish_goal")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart */}
        <Card className="ds-dashboard-card">
          <CardHeader>
            <CardTitle>{t("dashboard.charts.activity_analytics")}</CardTitle>
            <CardDescription>
              {t("dashboard.charts.activity_analytics_desc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityChart />
          </CardContent>
        </Card>
          </main>
        </div>
      </div>
    </div>
  );
}