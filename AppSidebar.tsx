import { Clock, Code2, Folder, LayoutDashboard, Plus, Settings, Star, Library } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LANGUAGES, type Language } from "@/lib/snippets/types";
import { LANG_DOT } from "./LanguageBadge";

export type Section = "dashboard" | "all" | "favorites" | "recent";

interface Props {
  section: Section;
  onSection: (s: Section) => void;
  language: Language | "all";
  onLanguage: (l: Language | "all") => void;
  category: string;
  onCategory: (c: string) => void;
  categories: { name: string; count: number }[];
  counts: { all: number; favorites: number };
  onNew: () => void;
  onSettings: () => void;
}

export function AppSidebar(p: Props) {
  const { setOpenMobile } = useSidebar();
  const go = (fn: () => void) => () => { fn(); setOpenMobile(false); };
  const nav = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "all" as const, label: "All Snippets", icon: Library, count: p.counts.all },
    { id: "favorites" as const, label: "Favorites", icon: Star, count: p.counts.favorites },
    { id: "recent" as const, label: "Recently Added", icon: Clock },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Code2 className="h-4 w-4" /></div>
          <span className="text-lg font-semibold tracking-tight">CodeKnit</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((n) => (
                <SidebarMenuItem key={n.id}>
                  <SidebarMenuButton isActive={p.section === n.id} onClick={go(() => p.onSection(n.id))}>
                    <n.icon /><span>{n.label}</span>
                  </SidebarMenuButton>
                  {n.count !== undefined && <SidebarMenuBadge>{n.count}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {p.categories.map((c) => (
                <SidebarMenuItem key={c.name}>
                  <SidebarMenuButton isActive={p.category === c.name} onClick={go(() => p.onCategory(p.category === c.name ? "all" : c.name))}>
                    <Folder /><span>{c.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{c.count}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Languages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {LANGUAGES.map((l) => (
                <SidebarMenuItem key={l}>
                  <SidebarMenuButton isActive={p.language === l} onClick={go(() => p.onLanguage(p.language === l ? "all" : l))}>
                    <span className={cn("ml-1 h-2 w-2 rounded-full", LANG_DOT[l])} /><span>{l}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-3 p-3">
        <Button className="w-full" onClick={go(p.onNew)}><Plus className="h-4 w-4" />New Snippet</Button>
        <div className="flex items-center gap-2 rounded-lg border p-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-semibold">ME</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">My workspace</div>
            <div className="truncate text-xs text-muted-foreground">Saved on this device</div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Settings" title="Settings" onClick={go(p.onSettings)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
