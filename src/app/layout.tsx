import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { SITE } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${SITE.name} | Creators & Brands, Matched`,
  description:
    "Digifox Influencer Network is a two-sided marketplace connecting verified creators with brands for campaign collaboration — discovery, verification, campaign management, content approval, and payments in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 sm:pb-0">
        <AuthModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <StickyMobileCta />
          <AuthModal />
        </AuthModalProvider>
      </body>
    </html>
  );
}
