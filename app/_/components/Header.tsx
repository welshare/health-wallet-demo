"use client";

import Image from "next/image";
import Wallet from "../Wallet";

export function Header() {
  return (
    <header>
      <nav
        className="flex items-center justify-between py-4"
        aria-label="Header"
      >
        {/* Logo */}
        <div className="flex flex-1">
          <Image src="/lcl_logo.jpg" alt="LCL" width={150} height={100} />
        </div>

        <div className="flex flex-1 gap-x-4 justify-end items-center">
          <Wallet />
        </div>
      </nav>
    </header>
  );
}
