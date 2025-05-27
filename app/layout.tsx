import type { Metadata } from "next";
import localFont from "next/font/local";

import { Separator } from "@/components/ui/separator";
import { Header } from "./_/components/Header";
import { Providers } from "./_/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Long Covid Labs :: Connect Wallet",
  description: "Register for Your Long Covid Labs Survey Participation Reward"
};

const fontSterling = localFont({
  src: [
    {
      path: "../public/fonts/FT-Sterling-Regular.otf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/FT-Sterling-Medium.otf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../public/fonts/FT-Sterling-Semi-Bold.otf",
      weight: "700",
      style: "normal"
    }
  ]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontSterling.className} suppressHydrationWarning>
      <body>
        <div className="md:container md:mx-auto p-4 sm:px-6 lg:px-8">
          <Providers>
            <Header />
            <Separator className="mb-4" />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
