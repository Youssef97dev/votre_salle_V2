import NavigationEvents from "airbnb/components/common/NavigationEvents";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { Nunito } from "next/font/google";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
const nunito = Nunito({ subsets: ["latin", "latin-ext"] });

export const metadata = {
  title: "Votre Salles",
  description: "Votre Salles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
      <body className={nunito.className}>
        {children}
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
