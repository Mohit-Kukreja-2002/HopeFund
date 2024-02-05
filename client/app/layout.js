"use client";
import { Josefin_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import { useEffect, useState } from "react";
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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`bg-white ${poppins.variable} ${josefin.variable} bg-no-repeat`}>
        <Providers>
          <SessionProvider>
            <Custom>
              <div>{children}</div>
            </Custom>
            <Toaster position="top-center" reverseOrder={false} />
          </SessionProvider>
        </Providers>
      </body>
    </html >
  );
}

const Custom = ({ children }) => {
  // const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoad } = useLoadUserQuery({});

  useEffect(() => {
    setIsLoading(isLoad);
    // setIsClient(true);
  }, []);

  // return (
    return <>{isLoading ? <Loader /> : <div>{children}</div>}</>;
    // <>
    //   {isLoading ? <div><Loader /></div> : isClient && children}
    // </>
  // );
};
