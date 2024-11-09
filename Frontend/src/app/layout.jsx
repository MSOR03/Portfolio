import jetBrains_Mono, { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Sebastian Olarte",
  description: "Generated by create next app",
  icons: {
    icon: [
      { url: '/Logo.png', sizes: '100x100', type: 'image/png' },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          <StairTransition />
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer className="mt-auto" />
      </body>
    </html>
  );
}