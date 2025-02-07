import NavigationEvents from "airbnb/components/common/NavigationEvents";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Analytics } from "@vercel/analytics/react";

//import { Nunito } from "next/font/google";
import { Suspense } from "react";
//const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Votre Salles",
  description: "Votre Salles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
          precedence="default"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
          type="text/css"
          precedence="default"
        />
      </head>

      <body>
        {children}
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
