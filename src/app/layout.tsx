import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { ShapeFollower } from "@/components/shared/ShapeFollower";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Adeeb",
  description: "Creative developer building performant web experiences.",
  icons: {
    icon: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Adeeb&backgroundColor=b6e3f4",
    apple: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Adeeb&backgroundColor=b6e3f4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen selection:bg-primary selection:text-primary-foreground text-step-1`}
      >
        <SmoothScrollProvider>
          <div className="noise" />
          <ShapeFollower />
          <Navbar />

          <main className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-48 relative">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}


