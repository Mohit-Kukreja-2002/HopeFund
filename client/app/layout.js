"use client";
import { Josefin_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Loader from './components/Loader/loader.jsx';
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
          <SessionProvider>
            <Custom>
              {children}
            </Custom>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
          </SessionProvider>
        </Providers>
      </body>
    </html >
  );
}

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  // useEffect(() => {
  //   socketId.on("connection", () => { });
  // }, []);

  return (isLoading ? <Loader /> : children);
};
