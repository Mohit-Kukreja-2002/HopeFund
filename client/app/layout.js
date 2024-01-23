"use client";
import { Josefin_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white ${poppins.variable} ${josefin.variable} bg-no-repeat`}>
        <Providers>
          {children}
          <Toaster position="bottom-center" reverseOrder={false}></Toaster>
        </Providers>
      </body>
    </html >
  );
}
