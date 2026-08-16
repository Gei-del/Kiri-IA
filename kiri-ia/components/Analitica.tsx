"use client";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui";

function Barras({ datos }: { datos: { label: string; valor: number }[] }) {
  const max = Math.max(1, ...datos.map((d) => d.valor));
  return (
    <div className="flex items-end gap-3 pt-2" style={{ height: 160 }}>
      {datos.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center justify-end">
          <div className="w-full rounded-t-md bg-hoja" style={{ height: `${(d.valor / max) * 120}px` }} />
          <span className="mt-1 text-xs text-black/50">{d.label}</span>
          <span className="text-xs font-semibold text-bosque">{d.valor}</span>
        </div>
      ))}
    </div>
  );
}

export default function Analitica() {
  const { residuos } = useStore();
  const total = residuos.length;
  const finalizados = residuos.filter((r) => r.estado === "Finalizado").length;
  const enTramite = residuos.filter((r) => r.estado === "En trámite").length;

  // Servicios por mes (últimos 4 meses, demo).
  const ahora = new Date();
  const meses = [3, 2, 1, 0].map((back) => {
    const d = new Date(ahora.getFullYear(), ahora.getMonth() - back, 1);
    const label = d.toLocaleDateString("es-CO", { month: "short" });
    const valor = residuos.filter((r) => {
      const rd = new Date(r.createdAt);
      return rd.getMonth() === d.getMonth() && rd.getFullYear() === d.getFullYear();
    }).length;
    return { label, valor };
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-bosque">Analítica</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-sm text-black/50">Solicitudes</p><p className="text-3xl font-bold text-bosque">{total}</p></Card>
        <Card><p className="text-sm text-black/50">En trámite</p><p className="text-3xl font-bold text-bosque">{enTramite}</p></Card>
        <Card><p className="text-sm text-black/50">Certificados</p><p className="text-3xl font-bold text-bosque">{finalizados}</p></Card>
      </div>
      <Card>
        <h2 className="font-semibold text-bosque">Servicios por mes</h2>
        <Barras datos={meses} />
      </Card>
    </div>
  );
}
