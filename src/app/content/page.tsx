"use client";

import { ContentManager } from "@/components/content-manager";
import { Sidebar, MobileSidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslation } from "@/contexts/translation-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, Settings } from "lucide-react";

export default function ContentPage() {
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
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold">{t("common.dashboard")}</h2>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-sm text-muted-foreground">{t("content.title")}</span>
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
            <ContentManager />
          </main>
        </div>
      </div>
    </div>
  );
}
