import type { Metadata } from "next";
import { Aleo, Roboto } from "next/font/google";

import { Separator } from "@/components/ui/separator";
import { Header } from "./_/components/Header";
import { Providers } from "./_/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cerebrum DAO :: Connect Survey Wallet",
  description: "Create or connect a wallet to prove your survey data"
};

const fontAleo = Aleo({
  variable: "--font-aleo",
  subsets: ["latin"]
});

const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontRoboto.className} ${fontAleo.variable}`}
      suppressHydrationWarning
    >
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
