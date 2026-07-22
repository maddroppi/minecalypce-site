import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'MineCalypce - Мирное выживание без PvP',
  description: 'Сервер мирного выживания Minecraft. Играй без гриферства и PvP на MineCalypce. Версии 1.18 - 1.21.4.',
  keywords: 'MineCalypce, майнкрафт сервер, мирное выживание, minecraft server, PvP, гриферство, play.minecalypce.online',
  authors: [{ name: 'MineCalypce' }],
  creator: 'MineCalypce',
  publisher: 'MineCalypce',
  robots: 'index, follow',
  openGraph: {
    title: 'MineCalypce - Мирное выживание без PvP',
    description: 'Играй на лучшем мирном сервере Minecraft без гриферства и PvP. Версии 1.18 - 1.21.4.',
    url: 'https://minecalypce.space',
    siteName: 'MineCalypce',
    type: 'website',
    locale: 'ru_RU',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
