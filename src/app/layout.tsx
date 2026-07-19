import type { Metadata } from "next";
// CHANGED: Use / instead of -
import { Plus_Jakarta_Sans } from "next/font/google"; 
import { AuthProvider } from "@/presentation/context/AuthContext";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Fold&Go | Freshly Managed Logistics",
  description: "The ultimate logistics infrastructure for modern laundry business ops.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      {/* Note: Tailwind v4 handles the background automatically now from your globals.css layout layer, so you can strip out explicit classes here if preferred */}
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}