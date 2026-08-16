import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bitemaadi.local"),
  title: "Bite Maadi — Fast Food & Restaurant",
  description:
    "Bite Maadi is a restaurant in Manipal serving burgers, pizza, catering, and flavorful dining.",
  icons: {
    icon: "/images/XDhymzkEA6AaDsbEusR7acKypTQ.svg",
    apple: "/images/X5hDat06E74iJTnTptDu3q5suYg.png",
  },
  openGraph: {
    title: "Bite Maadi — Fast Food & Restaurant",
    description: "Crafted for cravings. Served with perfection.",
    images: ["/images/88MPTeWoZPXJQAtG5sf59gE45JE.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream text-brown font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
