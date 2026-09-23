import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SetupBanner } from "@/components/SetupBanner";
import { SiteEffects } from "@/components/SiteEffects";
import { getCurrentUser } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "SerenFeed - Share Your Story",
    template: "%s | SerenFeed",
  },
  description: "Discover articles from passionate writers or publish your own thoughts with SerenFeed.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Navbar user={user} />
        <SetupBanner />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
