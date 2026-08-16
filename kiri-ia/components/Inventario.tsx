"use client";
import { useState } from "react";
import { useStore, EstadoItem } from "@/lib/store";
import { catById } from "@/lib/categorias";
import { Card, SemaforoPill, Btn } from "@/components/ui";

const FILTROS: (EstadoItem | "Todos")[] = ["Todos", "Pendiente", "En trámite", "Finalizado"];

export default function Inventario() {
  const { residuos, updateResiduo } = useStore();
  const [filtro, setFiltro] = useState<EstadoItem | "Todos">("Todos");
  const lista = residuos.filter((r) => filtro === "Todos" || r.estado === filtro);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-bosque">Mi inventario</h1>
      <div className="flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <button key={f} onClick={() => setFiltro(f)}
            className={`rounded-xl border px-3 py-1.5 text-sm ${filtro === f ? "border-bosque bg-bosque text-white" : "border-black/15 hover:bg-bosque-50"}`}>{f}</button>
        ))}
      </div>

      {lista.length === 0 ? (
        <Card><p className="text-sm text-black/50">Aún no tienes residuos aquí. Ve a “Gestionar” para crear una solicitud.</p></Card>
      ) : (
        <div className="space-y-3">
          {lista.map((r) => {
            const c = catById(r.categoriaId);
            return (
              <Card key={r.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-bosque">{c?.nombre ?? "Residuo"}</h3>
                      {c && <SemaforoPill s={c.semaforo} />}
                    </div>
                    <p className="mt-1 text-sm text-black/60">
                      {r.cantidad || "—"} · {r.embalaje || "sin embalaje"} · {r.localidad || "sin zona"}
                    </p>
                    <p className="mt-1 text-xs text-black/45">Estado: {r.estado}</p>
                  </div>
                  <div className="text-right">
                    {r.estado === "Finalizado" ? (
                      <span className="rounded-lg bg-bosque-50 px-3 py-1 text-xs font-semibold text-bosque">Certificado ✓</span>
                    ) : (
                      <span className="rounded-lg bg-black/5 px-3 py-1 text-xs text-black/50">Certificado pendiente</span>
                    )}
                    <div className="mt-2 flex justify-end gap-2">
                      {r.estado === "Pendiente" && <Btn variant="outline" onClick={() => updateResiduo(r.id, { estado: "En trámite" })}>Enviar</Btn>}
                      {r.estado === "En trámite" && <Btn onClick={() => updateResiduo(r.id, { estado: "Finalizado" })}>Marcar finalizado</Btn>}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
