import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/theme-provider";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});
const space_Grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space_grotesk",
});
export const metadata: Metadata = {
  title: "Developer Media",
  description:
    "A social media platform for developers.where you share your ideas and thoughts with other developers.Speak what's in your mind no need to worry about what others will think about it",
  icons: {
    icon: "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient,hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable}${space_Grotesk.variable}`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
