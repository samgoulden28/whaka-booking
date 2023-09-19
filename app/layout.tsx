import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sam And Zoes wedding booking website",
  description: "Whaka Lodge bookings Sep 2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4 overflow-x-hidden">
            <a href="/" className="flex items-center">
              <span className="text-center text-2xl font-semibold dark:text-white">
                Sam And Zoes wedding booking website
              </span>
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
