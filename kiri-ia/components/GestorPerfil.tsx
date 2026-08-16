"use client";
import { useState } from "react";
import { useStore, Ruta } from "@/lib/store";
import { CATEGORIAS } from "@/lib/categorias";
import { ZONAS } from "@/lib/zonas";
import { Card, Btn } from "@/components/ui";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const RANGOS = ["1-50", "51-500", "501-1000", "1001-3000", "perimetral"];
const money = (n: number) => "$" + n.toLocaleString("es-CO");

export default function GestorPerfilComp() {
  const { gestor, setGestor } = useStore();
  const [msg, setMsg] = useState("");

  const addRuta = () => setGestor({ ...gestor, rutas: [...gestor.rutas, {
    id: crypto.randomUUID(), nombre: "Nueva ruta", dias: [], zonas: [], horario: "", categorias: [],
  }] });
  const delRuta = (id: string) => setGestor({ ...gestor, rutas: gestor.rutas.filter((r) => r.id !== id) });
  const setRuta = (id: string, patch: Partial<Ruta>) =>
    setGestor({ ...gestor, rutas: gestor.rutas.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  const toggle = (arr: string[], v: string) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-bosque">Perfil del gestor</h1>
        <Btn onClick={() => { setGestor(gestor); setMsg("Perfil guardado."); }}>Guardar perfil</Btn>
      </div>
      {msg && <p className="rounded-lg bg-bosque-50 p-2 text-sm text-bosque">{msg}</p>}

      <Card>
        <label className="text-xs font-medium text-black/60">Nombre del gestor</label>
        <input value={gestor.nombre} onChange={(e) => setGestor({ ...gestor, nombre: e.target.value })}
          className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque" />
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-bosque">Rutas</h2>
        <Btn variant="outline" onClick={addRuta}>+ Agregar ruta</Btn>
      </div>

      {gestor.rutas.map((r) => (
        <Card key={r.id}>
          <div className="flex items-center justify-between gap-2">
            <input value={r.nombre} onChange={(e) => setRuta(r.id, { nombre: e.target.value })}
              className="flex-1 rounded-lg border border-black/10 px-2 py-1.5 text-sm font-semibold outline-none focus:border-bosque" />
            <button onClick={() => delRuta(r.id)} className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50">Borrar</button>
          </div>

          <p className="mt-3 text-xs font-medium text-black/50">Días</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {DIAS.map((d) => (
              <button key={d} onClick={() => setRuta(r.id, { dias: toggle(r.dias, d) })}
                className={`rounded-full border px-2.5 py-1 text-xs ${r.dias.includes(d) ? "border-bosque bg-bosque text-white" : "border-black/15"}`}>{d.slice(0, 3)}</button>
            ))}
          </div>

          <p className="mt-3 text-xs font-medium text-black/50">Zonas (atajos; puede combinar)</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {ZONAS.map((z) => (
              <button key={z.id} onClick={() => setRuta(r.id, { zonas: toggle(r.zonas, z.id) })}
                className={`rounded-full border px-2.5 py-1 text-xs ${r.zonas.includes(z.id) ? "border-bosque bg-bosque text-white" : "border-black/15"}`}>
                {z.nombre} ({z.localidades.join(", ")})</button>
            ))}
          </div>

          <p className="mt-3 text-xs font-medium text-black/50">Categorías que recoge en esta ruta</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {CATEGORIAS.map((c) => (
              <button key={c.id} onClick={() => setRuta(r.id, { categorias: toggle(r.categorias, c.id) })}
                className={`rounded-full border px-2.5 py-1 text-xs ${r.categorias.includes(c.id) ? "border-bosque bg-bosque text-white" : "border-black/15"}`}>{c.nombre}</button>
            ))}
          </div>

          <div className="mt-3">
            <label className="text-xs font-medium text-black/50">Horario</label>
            <input value={r.horario} onChange={(e) => setRuta(r.id, { horario: e.target.value })} placeholder="7:00-15:00"
              className="mt-1 w-40 rounded-lg border border-black/15 px-2 py-1.5 text-sm outline-none focus:border-bosque" />
          </div>
        </Card>
      ))}

      <h2 className="font-semibold text-bosque">Mis tarifas <span className="text-xs font-normal text-black/50">(las defines tú, no Kiri)</span></h2>
      <Card>
        <p className="text-sm font-medium text-black/70">Viaje (por visita)</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {RANGOS.map((rg) => (
            <div key={rg} className="flex items-center gap-2">
              <span className="w-28 text-sm text-black/60">{rg} kg</span>
              <input type="number" value={gestor.tarifasViaje[rg] ?? ""} placeholder="$"
                onChange={(e) => setGestor({ ...gestor, tarifasViaje: { ...gestor.tarifasViaje, [rg]: e.target.value ? Number(e.target.value) : null } })}
                className="flex-1 rounded-lg border border-black/15 px-2 py-1.5 text-sm outline-none focus:border-bosque" />
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <p className="text-sm font-medium text-black/70">Tratamiento (por kg, por categoría)</p>
        <div className="mt-2 space-y-1.5">
          {CATEGORIAS.map((c) => {
            const t = gestor.tarifasTratamiento.find((x) => x.categoriaId === c.id);
            return (
              <div key={c.id} className="flex items-center gap-2">
                <input type="checkbox" checked={t?.activo ?? false}
                  onChange={(e) => {
                    const otras = gestor.tarifasTratamiento.filter((x) => x.categoriaId !== c.id);
                    setGestor({ ...gestor, tarifasTratamiento: [...otras, { categoriaId: c.id, precioKg: t?.precioKg ?? null, activo: e.target.checked }] });
                  }} />
                <span className="flex-1 text-sm text-black/70">{c.nombre}</span>
                <input type="number" value={t?.precioKg ?? ""} placeholder="$/kg"
                  onChange={(e) => {
                    const otras = gestor.tarifasTratamiento.filter((x) => x.categoriaId !== c.id);
                    setGestor({ ...gestor, tarifasTratamiento: [...otras, { categoriaId: c.id, precioKg: e.target.value ? Number(e.target.value) : null, activo: t?.activo ?? true }] });
                  }}
                  className="w-28 rounded-lg border border-black/15 px-2 py-1.5 text-sm outline-none focus:border-bosque" />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
