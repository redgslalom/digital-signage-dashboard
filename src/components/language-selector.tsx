"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "@/contexts/translation-context";

export function LanguageSelector() {
  const { currentLanguage, changeLanguage, getLanguageInfo, availableLanguages, t } = useTranslation();
  const currentLangInfo = getLanguageInfo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Languages className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{currentLangInfo.code.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{language.code.toUpperCase()}</span>
              <span className="text-sm text-muted-foreground">{language.name}</span>
            </div>
            {currentLanguage === language.code && (
              <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
