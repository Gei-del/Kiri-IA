import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Kiri IA — Gestión de residuos",
  description: "Identifica, aprende, cotiza y sigue tus residuos hasta su destino.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
