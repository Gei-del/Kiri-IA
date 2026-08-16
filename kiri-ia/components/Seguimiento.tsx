"use client";
import { useStore } from "@/lib/store";
import { catById } from "@/lib/categorias";
import { Card, Btn } from "@/components/ui";

const ESTADOS = ["En trámite", "Finalizado"];
const CADENA = ["Solicitado", "Validado", "Asignado", "En camino", "Recolectado", "En tránsito", "Recibido", "Finalizado"];

export default function Seguimiento() {
  const { residuos, updateResiduo } = useStore();
  const activos = residuos.filter((r) => ESTADOS.includes(r.estado));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-bosque">Seguimiento</h1>
      {activos.length === 0 ? (
        <Card><p className="text-sm text-black/50">No tienes servicios en curso. Confirma una solicitud en “Gestionar”.</p></Card>
      ) : activos.map((r) => {
        const c = catById(r.categoriaId);
        const pasoActual = r.estado === "Finalizado" ? CADENA.length - 1 : 3; // demo
        return (
          <Card key={r.id}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-bosque">{c?.nombre ?? "Servicio"}</h3>
              <span className="text-xs text-black/50">{r.localidad} · {r.fecha || "sin fecha"}</span>
            </div>
            <p className="mt-1 text-sm text-black/60">El gestor viene a recoger (no un conductor suelto): {useStore().gestor.nombre}</p>
            <ol className="mt-4 flex flex-wrap gap-2">
              {CADENA.map((p, i) => (
                <li key={p}
                  className={`rounded-full px-3 py-1 text-xs ${i <= pasoActual ? "bg-bosque text-white" : "bg-black/5 text-black/40"}`}>{p}</li>
              ))}
            </ol>
            {r.estado !== "Finalizado" && (
              <div className="mt-3"><Btn onClick={() => updateResiduo(r.id, { estado: "Finalizado" })}>Marcar entregado (genera evidencia)</Btn></div>
            )}
            {r.estado === "Finalizado" && (
              <p className="mt-3 rounded-lg bg-bosque-50 p-2 text-sm text-bosque">✓ Servicio finalizado. Evidencia y certificado disponibles en Inventario.</p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
