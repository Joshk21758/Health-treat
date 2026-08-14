"use client";

import { Metadata } from "next";
import "./globals.css"; // Global styles
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const metadata = {
  title: "New Life Medical Centre",
  description: "My Health Care App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <NavBar />
        <Toaster position="top-right" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
