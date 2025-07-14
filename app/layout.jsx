import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from 'next/font/google';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],//#endregion
});
// You can customize weight, style, subsets, etc.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Add the weights you need
  variable: '--font-poppins',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "food delivery",
  description: "Food Delivery App",
  icons: {
    icon: "/Take Away-rafiki 1.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
