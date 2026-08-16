"use client";
import { BackButton, Card, Logo } from "@/components/ui";
import { useStore } from "@/lib/store";
import { catById } from "@/lib/categorias";

export default function AdminPage() {
  const { residuos, gestor } = useStore();
  const metric = (label: string, val: number | string) => (
    <Card><p className="text-sm text-black/50">{label}</p><p className="text-3xl font-bold text-bosque">{val}</p></Card>
  );
  return (
    <main className="mx-auto max-w-5xl px-5">
      <header className="flex items-center justify-between py-6">
        <Logo /><BackButton to="/ingresar" />
      </header>
      <h1 className="mb-4 text-2xl font-bold text-bosque">Administrador Kiri IA</h1>
      <div className="grid gap-4 sm:grid-cols-4">
        {metric("Solicitudes", residuos.length)}
        {metric("En trámite", residuos.filter(r=>r.estado==="En trámite").length)}
        {metric("Finalizadas", residuos.filter(r=>r.estado==="Finalizado").length)}
        {metric("Gestores", 1)}
      </div>
      <h2 className="mb-3 mt-8 font-semibold text-bosque">Últimas solicitudes</h2>
      <div className="space-y-2">
        {residuos.length === 0 ? <Card><p className="text-sm text-black/50">Sin actividad aún.</p></Card> :
          residuos.slice(0, 10).map((r) => (
            <Card key={r.id}>
              <div className="flex items-center justify-between text-sm">
                <b className="text-bosque">{catById(r.categoriaId)?.nombre}</b>
                <span className="text-black/50">{r.localidad || "—"} · {r.estado}</span>
              </div>
            </Card>
          ))}
      </div>
      <h2 className="mb-3 mt-8 font-semibold text-bosque">Gestor conectado</h2>
      <Card><p className="text-sm text-black/70">{gestor.nombre} · {gestor.rutas.length} ruta(s) · {gestor.tarifasTratamiento.filter(t=>t.activo).length} categorías activas</p></Card>
    </main>
  );
}
