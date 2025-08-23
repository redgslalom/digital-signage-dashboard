"use client";

import { useState } from "react";
import { useTranslation } from "@/contexts/translation-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Upload, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Calendar,
  Monitor,
  Image,
  Video,
  FileText
} from "lucide-react";

interface ContentItem {
  id: number;
  name: string;
  type: "image" | "video" | "text";
  status: "active" | "scheduled" | "inactive";
  device: string;
  duration: number;
  created: string;
}

const mockContent: ContentItem[] = [
  {
    id: 1,
    name: "Promoción Navideña",
    type: "image",
    status: "active",
    device: "Pantalla Principal",
    duration: 30,
    created: "2024-01-15"
  },
  {
    id: 2,
    name: "Video Corporativo",
    type: "video",
    status: "scheduled",
    device: "Lobby",
    duration: 120,
    created: "2024-01-14"
  },
  {
    id: 3,
    name: "Anuncio de Seguridad",
    type: "text",
    status: "active",
    device: "Todas las pantallas",
    duration: 15,
    created: "2024-01-13"
  },
];

export function ContentManager() {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [activeTab, setActiveTab] = useState("content");
  const { t } = useTranslation();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "text": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

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
      "Anuncio de Seguridad": "content.content_items.security_announcement"
    };
    return nameMap[name] ? t(nameMap[name]) : name;
  };

  const getDeviceName = (device: string) => {
    const deviceMap: { [key: string]: string } = {
      "Pantalla Principal": "content.devices.main_screen",
      "Lobby": "content.devices.lobby",
      "Todas las pantallas": "content.devices.all_screens",
      "Cafetería": "content.devices.cafeteria"
    };
    return deviceMap[device] ? t(deviceMap[device]) : device;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t("content.main_title")}</h2>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          {t("content.upload_button")}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">{t("content.tabs.content")}</TabsTrigger>
          <TabsTrigger value="schedule">{t("content.tabs.schedule")}</TabsTrigger>
          <TabsTrigger value="devices">{t("content.tabs.devices")}</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("content.library.title")}</CardTitle>
              <CardDescription>
                {t("content.library.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("content.library.table.type")}</TableHead>
                    <TableHead>{t("content.library.table.name")}</TableHead>
                    <TableHead>{t("content.library.table.status")}</TableHead>
                    <TableHead>{t("content.library.table.device")}</TableHead>
                    <TableHead>{t("content.library.table.duration")}</TableHead>
                    <TableHead>{t("content.library.table.created")}</TableHead>
                    <TableHead className="text-right">{t("content.library.table.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(item.type)}
                          <span className="capitalize">{t(`content.library.types.${item.type}`)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{getContentName(item.name)}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{getDeviceName(item.device)}</TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell>{item.created}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            {item.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("content.schedule_tab.schedule_title")}</CardTitle>
                <CardDescription>
                  {t("content.schedule_tab.schedule_description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("content.schedule_tab.select_content")}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("content.schedule_tab.select_content_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promo">{t("content.content_items.christmas_promo")}</SelectItem>
                      <SelectItem value="video">{t("content.content_items.corporate_video")}</SelectItem>
                      <SelectItem value="text">{t("content.content_items.security_announcement")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("content.schedule_tab.target_device")}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("content.schedule_tab.target_device_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">{t("content.devices.main_screen")}</SelectItem>
                      <SelectItem value="lobby">{t("content.devices.lobby")}</SelectItem>
                      <SelectItem value="all">{t("content.devices.all_screens")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("content.schedule_tab.start_date")}</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("content.schedule_tab.start_time")}</label>
                    <Input type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("content.schedule_tab.duration_seconds")}</label>
                  <Input type="number" placeholder="30" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="repeat" />
                  <label htmlFor="repeat" className="text-sm font-medium">{t("content.schedule_tab.repeat_daily")}</label>
                </div>

                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t("content.schedule_tab.schedule_button")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("content.schedule_tab.active_schedule_title")}</CardTitle>
                <CardDescription>
                  {t("content.schedule_tab.active_schedule_description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{t("content.content_items.christmas_promo")}</p>
                      <p className="text-sm text-muted-foreground">{t("content.schedule_tab.time_today")} 14:30 - {t("content.devices.main_screen")}</p>
                    </div>
                    <Badge variant="default">{t("content.status.active")}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{t("content.content_items.corporate_video")}</p>
                      <p className="text-sm text-muted-foreground">{t("content.schedule_tab.time_tomorrow")} 09:00 - {t("content.devices.lobby")}</p>
                    </div>
                    <Badge variant="secondary">{t("content.status.scheduled")}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{t("content.content_items.security_announcement")}</p>
                      <p className="text-sm text-muted-foreground">{t("content.schedule_tab.time_hourly")} - {t("content.devices.all_screens")}</p>
                    </div>
                    <Badge variant="default">{t("content.status.recurring")}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("content.devices_tab.main_screen")}</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{t("content.devices_tab.online")}</div>
                <p className="text-xs text-muted-foreground">
                  {t("content.devices_tab.last_content")}: {t("content.content_items.christmas_promo")}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <Switch defaultChecked />
                  <span className="text-sm">{t("content.devices_tab.active")}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("content.devices_tab.lobby")}</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{t("content.devices_tab.online")}</div>
                <p className="text-xs text-muted-foreground">
                  {t("content.devices_tab.last_content")}: {t("content.content_items.corporate_video")}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <Switch defaultChecked />
                  <span className="text-sm">{t("content.devices_tab.active")}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("content.devices_tab.cafeteria")}</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{t("content.devices_tab.offline")}</div>
                <p className="text-xs text-muted-foreground">
                  {t("content.devices_tab.last_content")}: {t("content.content_items.daily_menu")}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <Switch />
                  <span className="text-sm">{t("content.devices_tab.inactive")}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
