import { Caveat_Brush, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "@/components/Head";
import Logout from "@/components/Logout";

const inter = Inter({ subsets: ["latin"] });
const caveat_brush = Caveat_Brush({ subsets: ["latin"], weight:['400']});

export const metadata = {
  title: "Crimson Cat - Mood tracker",
  description: "A simple mood tracker",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 ">
      <Link href="/">
        <div className="flex gap-3 items-baseline ">
          <h1 className={'text-base sm:text-3xl  textGradient '  + caveat_brush.className}>Crimson Cat</h1>
          <i className="fa-solid fa-cat text-[#FF4C4C] text-xl sm:text-2xl "></i>
        </div>
      </Link>
      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-[#FF4C4C] ' + caveat_brush.className}>Created with Next.js</p>
    </footer>
  )

  return (
    <html lang="en">
      <Head/>
      <AuthProvider>
        <body className={'w-full max-w-[1035px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + inter.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
