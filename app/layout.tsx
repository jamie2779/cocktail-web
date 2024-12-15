import type { Metadata } from "next";
import { Providers } from "@/providers/Providers";
import { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "칵테일메이커",
  description: "기초창의공학설계 6조 프로젝트",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
