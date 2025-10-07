import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ClickSpark from "@/components/ClickSpark";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alfayad - Full Stack Developer",
  description: "Portfolio of Alfayad, a passionate full-stack developer specializing in modern web technologies and innovative solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <LanguageProvider>
          <ClickSpark
            sparkColor='#fff'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <Header />
            {children}
          </ClickSpark>
        </LanguageProvider>
      </body>
    </html>
  );
}
