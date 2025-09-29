

import React from "react";
import "./globals.css";
import { Urbanist } from "next/font/google";
import Footer from "@/components/footer"; // Yorum satırı kaldırıldı
import Navbar from "@/components/navbar"; // Yorum satırı kaldırıldı
import ModalProvider from "@/providers/modal-provider"; // Yorum satırı kaldırıldı
import ToastProvider from "@/providers/toast-provider"; // Yorum satırı kaldırıldı
import { ClerkProvider } from '@clerk/nextjs';
// import { SearchProvider } from '@/providers/search-modal-provider'; // Yorum satırı kaldırıldı

const font = Urbanist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* <SearchProvider> */}
        <html lang="en">
          <body className={font.className}>
            <ModalProvider/>
            <ToastProvider/>
            {/* <SearchProvider> */}
              <Navbar/>
            {/* </SearchProvider> */}
            {children}
            <Footer />
          </body>
        </html>
      {/* </SearchProvider> */}
    </ClerkProvider>
  );
}
