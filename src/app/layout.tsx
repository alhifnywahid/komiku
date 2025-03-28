import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { ComicProvider } from "@/context/comics-context";
import QueryProvider from "@/provider/react-query";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Komik ID",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scrollbar-none">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-fixed bg-[url('/bg-2.png')] bg-repeat bg-bottom scrollbar-none`}
      >
        <QueryProvider>
          <ComicProvider>
            <NavigationBar />
            <NextTopLoader showSpinner={false} />
            <NuqsAdapter>
              <main className="max-w-screen-xl mx-auto relative">
                {children}
              </main>
            </NuqsAdapter>
            <Footer />
          </ComicProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
