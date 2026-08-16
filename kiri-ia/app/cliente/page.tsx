"use client";
import { useState } from "react";
import Sidebar, { Item } from "@/components/Sidebar";
import { BackButton } from "@/components/ui";
import Gestionar from "@/components/Gestionar";
import Inventario from "@/components/Inventario";
import Seguimiento from "@/components/Seguimiento";
import Analitica from "@/components/Analitica";

const items: Item[] = [
  { id: "gestionar", label: "Gestionar", icon: "🧭" },
  { id: "inventario", label: "Inventario", icon: "📦" },
  { id: "seguimiento", label: "Seguimiento", icon: "🚚" },
  { id: "analitica", label: "Analítica", icon: "📊" },
];

export default function ClientePage() {
  const [activo, setActivo] = useState("gestionar");
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <Sidebar items={items} activo={activo} setActivo={setActivo} titulo="Cliente" />
      <main className="flex-1 p-5 sm:p-8">
        <div className="mb-4 sm:hidden"><BackButton to="/ingresar" /></div>
        {activo === "gestionar" && <Gestionar />}
        {activo === "inventario" && <Inventario />}
        {activo === "seguimiento" && <Seguimiento />}
        {activo === "analitica" && <Analitica />}
      </main>
    </div>
  );
}
