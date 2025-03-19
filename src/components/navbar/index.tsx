"use client";

import Tabs from "../tabs";
import { Logo } from "./logo";
import { NavigationSheet } from "./navigation-sheet";
import SerachButton from "./search";

export default function NavigationBar() {
  return (
    <nav className="sticky top-0 inset-x-4 h-16 border-b  dark:border-slate-700/70 mx-auto z-50 bg-[url(/bg-slider.png)] bg-center">
      <div className="h-full flex items-center justify-between mx-auto px-4 max-w-screen-xl">
        <Logo />
        <Tabs />
        <div className="flex items-center gap-3">
          <SerachButton />
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
