import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Providers } from "@/components/ui/providers";

export const metadata: Metadata = {
  title: "LVXIN | AI Legal Technology",
  description: "Pioneering advanced AI-powered legal solutions for modern businesses",
  icons: {
    icon: "/assets/logo2.png",       
    shortcut: "/assets/logo2.png",   
    apple: "/assets/logo2.png",     
  },
  openGraph: {
    title: "LVXIN | AI Legal Technology",
    description: "Pioneering advanced AI-powered legal solutions for modern businesses",
    images: [
      {
        url: "/assets/logo.png",   
        width: 1200,
        height: 630,
        alt: "LVXIN Logo",
      },
    ],
  },
};


export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-neutral-900 transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
