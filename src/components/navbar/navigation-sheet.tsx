"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tabs } from "../tabs";
import { Logo } from "./logo";

export const NavigationSheet = () => {
  const pathname = usePathname();
  const activeIndex = tabs.findIndex((tab) => tab.slug === pathname);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-primary/10"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetTitle className="hidden">Navigation</SheetTitle>
      <SheetContent
        side="bottom"
        className="rounded-t-xl border-t-2 border-primary/20 pb-8"
      >
        <div className="flex items-center justify-between border-b mb-3 pb-3">
          <Logo />
        </div>

        <NavigationMenu orientation="vertical" className="w-full">
          <NavigationMenuList className="gap-4 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start w-full">
            {tabs.map((tab, i) => (
              <NavigationMenuItem key={i} className="w-full ">
                <NavigationMenuLink>
                  <SheetClose asChild>
                    <Link
                      href={tab.slug}
                      className={cn(
                        "flex items-center w-full rounded-lg transition-colors hover:text-blue-400",
                        i == activeIndex && "text-blue-600"
                      )}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.title}</span>
                    </Link>
                  </SheetClose>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
};
