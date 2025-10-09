

import React from "react";
import "./globals.css";
import { Urbanist } from "next/font/google";
import Footer from "@/components/footer"; 
import Navbar from "@/components/navbar"; 
import ModalProvider from "@/providers/modal-provider"; 
import ToastProvider from "@/providers/toast-provider"; 
import { ClerkProvider } from '@clerk/nextjs';
import { SearchProvider } from '@/providers/search-modal-provider'; 

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
      <SearchProvider> {}
        <html lang="en">
          <body className={`${font.className} bg-[#FDF8F6] min-h-screen`}>
            <ModalProvider/>
            <ToastProvider/>
            <Navbar/>
            {children}
            <Footer />
          </body>
        </html>
      </SearchProvider>
    </ClerkProvider>
  );
}
