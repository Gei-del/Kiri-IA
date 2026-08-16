"use client";
import { useState } from "react";
import Sidebar, { Item } from "@/components/Sidebar";
import { BackButton, Card } from "@/components/ui";
import GestorPerfilComp from "@/components/GestorPerfil";
import { useStore } from "@/lib/store";
import { catById } from "@/lib/categorias";

const items: Item[] = [
  { id: "perfil", label: "Perfil y tarifas", icon: "🧰" },
  { id: "solicitudes", label: "Solicitudes", icon: "📥" },
  { id: "analisis", label: "Análisis", icon: "📊" },
];

function Solicitudes() {
  const { residuos } = useStore();
  const entrantes = residuos.filter((r) => r.estado !== "Pendiente");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-bosque">Solicitudes</h1>
      {entrantes.length === 0 ? (
        <Card><p className="text-sm text-black/50">No hay solicitudes activas todavía.</p></Card>
      ) : entrantes.map((r) => (
        <Card key={r.id}>
          <div className="flex items-center justify-between">
            <b className="text-bosque">{catById(r.categoriaId)?.nombre}</b>
            <span className="text-xs text-black/50">{r.localidad} · {r.fecha || "sin fecha"}</span>
          </div>
          <p className="mt-1 text-sm text-black/60">{r.cantidad} · {r.embalaje} · Estado: {r.estado}</p>
        </Card>
      ))}
    </div>
  );
}

function Analisis() {
  const { residuos } = useStore();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-bosque">Análisis</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-sm text-black/50">Recolecciones</p><p className="text-3xl font-bold text-bosque">{residuos.filter(r=>r.estado!=="Pendiente").length}</p></Card>
        <Card><p className="text-sm text-black/50">Finalizadas</p><p className="text-3xl font-bold text-bosque">{residuos.filter(r=>r.estado==="Finalizado").length}</p></Card>
        <Card><p className="text-sm text-black/50">Zonas activas</p><p className="text-3xl font-bold text-bosque">{new Set(residuos.map(r=>r.zonaId).filter(Boolean)).size}</p></Card>
      </div>
    </div>
  );
}

export default function GestorPage() {
  const [activo, setActivo] = useState("perfil");
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <Sidebar items={items} activo={activo} setActivo={setActivo} titulo="Gestor" />
      <main className="flex-1 p-5 sm:p-8">
        <div className="mb-4 sm:hidden"><BackButton to="/ingresar" /></div>
        {activo === "perfil" && <GestorPerfilComp />}
        {activo === "solicitudes" && <Solicitudes />}
        {activo === "analisis" && <Analisis />}
      </main>
    </div>
  );
}
