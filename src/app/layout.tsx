import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar";
import { classNameMerger } from "@/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNameMerger(
          inter.className,
          "bg-slate-890 text-slate-300"
        )}
      >
        <Navbar />

        {children}
      </body>
    </html>
  );
}
