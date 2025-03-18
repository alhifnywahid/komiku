"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Tabs from "../tabs";
import { Logo } from "./logo";
import { NavigationSheet } from "./navigation-sheet";

export default function NavigationBar() {
  return (
    <nav className="sticky top-0 inset-x-4 h-16 border-b  dark:border-slate-700/70 mx-auto z-50 bg-[url(/bg-slider.png)] bg-center">
      <div className="h-full flex items-center justify-between mx-auto px-4 max-w-screen-xl">
        <Logo /> 
        <Tabs /> 
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="sm:inline-flex rounded-full"
          >
            Cari komik 
            <Search />
          </Button> 
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
