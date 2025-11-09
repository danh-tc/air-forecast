import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./layout.scss";
import { AqiProvider } from "../../context/AqiContext";
import { PredictAqiProvider } from "../../context/PredictAqiContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Air Forecast",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AqiProvider>
          <PredictAqiProvider>{children}</PredictAqiProvider>
        </AqiProvider>
      </body>
    </html>
  );
}
