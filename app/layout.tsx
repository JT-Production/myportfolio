import type { Metadata } from "next";
import "./globals.css";
import localfont from "next/font/local";
const NeueHaasGrotesk = localfont({
  src: [
    {
      path: "../public/assets/fonts/NeueHaasGrotDisp-45Light-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/NeueHaasGrotDisp-65Medium-Trial.otf",
      weight: "500",
      style: "bold",
    },
  ],
  variable: "--font-neue-haas-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joey | Senior Frontend & Design Engineer Portfolio",
  description:
    "Interactive portfolio of Joey, a Senior Frontend & Design Engineer specializing in clean typography, custom responsive design systems, WebGL, and premium user experiences.",
  keywords: [
    "Frontend Engineer",
    "Design Engineer",
    "Portfolio",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Joey" }],
  openGraph: {
    title: "Joey | Senior Frontend & Design Engineer Portfolio",
    description:
      "Interactive portfolio of Joey, a Senior Frontend & Design Engineer.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joey | Senior Frontend & Design Engineer Portfolio",
    description:
      "Interactive portfolio of Joey, a Senior Frontend & Design Engineer.",
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
      className={`${NeueHaasGrotesk.variable} ${NeueHaasGrotesk.className} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-white selection:bg-white/10 selection:text-white ">
        {children}
      </body>
    </html>
  );
}
