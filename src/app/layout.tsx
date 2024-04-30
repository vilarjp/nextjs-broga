import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar";
import { getSession } from "@/modules/auth/utils/cookies";
import { classNameMerger } from "@/utils/classNameMerger";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="en">
      <body
        className={classNameMerger(
          inter.className,
          "bg-slate-890 text-slate-300"
        )}
      >
        <Navbar user={user} />

        {children}
      </body>
    </html>
  );
}
