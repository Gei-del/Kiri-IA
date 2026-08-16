"use client";
import { useState } from "react";
import { CATEGORIAS, catById, semaforoColor } from "@/lib/categorias";
import { clasificar } from "@/lib/clasificar";
import { Btn, SemaforoPill } from "@/components/ui";

const TIPOS = [
  "Líquido", "Sólido", "Aparato eléctrico", "Pila o batería", "Bombilla", "Llanta",
  "Medicamento", "Envase o caneca", "Escombro", "Residuo de salud", "Orgánico",
  "Ropa / dotación / trapos", "No sé",
];

// Mapa simple de "tipo tocado" -> id de categoría orientativa.
const TIPO_A_CAT: Record<string, string> = {
  "Líquido": "liquidos_contaminados",
  "Sólido": "reciclables_limpios",
  "Aparato eléctrico": "aparatos_electronicos",
  "Pila o batería": "pilas",
  "Bombilla": "luminarias_rotas",
  "Llanta": "llantas",
  "Medicamento": "medicamentos_vencidos",
  "Envase o caneca": "envases_contaminados",
  "Escombro": "escombros_limpios",
  "Residuo de salud": "cortopunzantes",
  "Orgánico": "organicos",
  "Ropa / dotación / trapos": "epp_dotacion",
};

export default function SolicitudIA({ onClose, onPick }: {
  onClose: () => void;
  onPick: (categoriaId: string) => void;
}) {
  const [texto, setTexto] = useState("");
  const [catId, setCatId] = useState<string | null>(null);

  const intentar = () => {
    const id = clasificar(texto);
    setCatId(id);
  };

  const cat = catId ? catById(catId) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-bosque">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-hoja text-white">✦</span>
            Solicitud IA
          </div>
          <button onClick={onClose} className="rounded-lg px-2 py-1 text-black/50 hover:bg-black/5">✕</button>
        </div>

        <p className="text-sm text-black/70">
          Cuéntame qué tienes, como lo dirías normalmente. Te oriento: qué es, su categoría y cómo tratarlo.
          <span className="mt-1 block text-xs text-black/45">Kiri orienta de forma general; no es una certificación legal.</span>
        </p>

        <div className="mt-3 flex gap-2">
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && intentar()}
            placeholder="Ej: aceite del taller, agujas, ropa sucia…"
            className="flex-1 rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque"
          />
          <Btn onClick={intentar}>Identificar</Btn>
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-black/40">O elige un tipo</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <button key={t}
              onClick={() => setCatId(TIPO_A_CAT[t] ?? null)}
              className="rounded-full border border-black/15 px-3 py-1.5 text-sm hover:border-bosque hover:bg-bosque-50">
              {t}
            </button>
          ))}
        </div>

        {catId === null && texto && (
          <div className="mt-4 rounded-xl bg-black/5 p-3 text-sm text-black/70">
            No me alcanza la información para orientarte bien. ¿Puedes concretar un poco más?
            (por ejemplo: de qué proceso salió, si está manchado o mezclado).
          </div>
        )}

        {cat && (
          <div className="mt-4 rounded-xl border p-4" style={{ borderColor: semaforoColor[cat.semaforo] + "55" }}>
            <div className="mb-2"><SemaforoPill s={cat.semaforo} /></div>
            <p className="text-sm"><b>Identificamos:</b> {cat.nombre}</p>
            <p className="mt-1 text-sm"><b>Qué es:</b> {cat.queEs}</p>
            <p className="mt-1 text-sm"><b>Cómo debes tratarlo:</b> {cat.comoTratarlo}</p>
            <p className="mt-1 text-sm"><b>Qué NO hacer:</b> {cat.queNoHacer}</p>
            <p className="mt-1 text-sm"><b>Empaque:</b> {cat.empaque} sellada</p>
            {cat.semaforo === "rojo" && (
              <p className="mt-2 rounded-lg bg-red-50 p-2 text-xs text-red-700">
                Posible residuo de manejo especializado. No compactar ni tirar al agua.
                Conviene validación de un gestor autorizado.
              </p>
            )}
            <div className="mt-3">
              <Btn onClick={() => { onPick(cat.id); onClose(); }}>Usar esta categoría</Btn>
            </div>
          </div>
        )}

        <details className="mt-4 text-xs text-black/50">
          <summary className="cursor-pointer">Ver todas las categorías</summary>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CATEGORIAS.map((c) => (
              <button key={c.id} onClick={() => setCatId(c.id)}
                className="rounded-full border border-black/10 px-2 py-1 hover:bg-black/5">{c.nombre}</button>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
