"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Wallet from "../Wallet";

const navigation: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Connections", href: "/connections" },
  // { name: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav
        className="flex items-center justify-between py-4"
        aria-label="Header"
      >
        {/* Logo */}
        <div className="flex md:flex-1">
          <Image
            src="/brand.png"
            alt="Logo"
            className=""
            width={150}
            height={100}
          />
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop action buttons */}
        <div className="hidden md:flex md:flex-1  md:gap-x-4 justify-end items-center">
          <Wallet />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>

            <div className="gap-4 px-4">
              <div className="space-y-2 py-6">
                {/* Mobile action buttons */}
                <div className="flex flex-col gap-4">
                  <Wallet />
                </div>
              </div>
              <div className="py-6 ">
                {/* Mobile navigation */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
}
