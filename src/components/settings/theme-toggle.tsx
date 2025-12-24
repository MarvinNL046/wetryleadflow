"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-3">
        <Label>Theme</Label>
        <div className="flex gap-2">
          <div className="h-10 w-24 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-10 w-24 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-10 w-24 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="space-y-3">
      <Label>Theme</Label>
      <div className="flex gap-2">
        {themes.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTheme(value)}
            className={cn(
              "flex-1",
              theme === value && "border-zinc-900 bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-800"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>
      <p className="text-xs text-zinc-500">
        Choose how LeadFlow looks to you. Select a single theme, or sync with your system settings.
      </p>
    </div>
  );
}
