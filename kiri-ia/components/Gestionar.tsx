"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { CATEGORIAS, catById, semaforoColor } from "@/lib/categorias";
import { clasificar } from "@/lib/clasificar";
import { TODAS_LOCALIDADES, zonaDeLocalidad, ZONAS } from "@/lib/zonas";
import { useStore, Residuo } from "@/lib/store";
import { Btn, Card, SemaforoPill } from "@/components/ui";
import SolicitudIA from "@/components/SolicitudIA";

const MapaPin = dynamic(() => import("@/components/MapaPin"), { ssr: false, loading: () => (
  <div className="grid h-64 w-full place-items-center rounded-xl border border-black/10 bg-black/5 text-sm text-black/40">Cargando mapa…</div>
) });

const CHIPS = ["ropa sucia", "dotación", "aceite", "agujas", "escombro", "tóner", "llantas", "icopor", "medicamentos"];
const CONTACTO = ["Sí", "No", "No sé"] as const;
const CONDICIONES = ["Íntegro", "Roto", "Vencido", "Con fuga", "Mezclado", "No sé"];
const CANTIDADES = ["Bolsa", "Caneca", "Tambor", "kg", "litros", "unidades"];
const EMPAQUES = ["Caja", "Bolsa", "Caneca"];

const money = (n: number) => "$" + n.toLocaleString("es-CO");

export default function Gestionar() {
  const { addResiduo, gestor } = useStore();
  const [agente, setAgente] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [catId, setCatId] = useState<string | null>(null);
  const [foto, setFoto] = useState<string | undefined>();
  const [contacto, setContacto] = useState<Residuo["contacto"]>("");
  const [condicion, setCondicion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [embalaje, setEmbalaje] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [complemento, setComplemento] = useState("");
  const [indicaciones, setIndicaciones] = useState("");
  const [cNombre, setCNombre] = useState("");
  const [cCel, setCCel] = useState("");
  const [perimetral, setPerimetral] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [dia, setDia] = useState("");
  const [cotizado, setCotizado] = useState(false);
  const [guardadoMsg, setGuardadoMsg] = useState("");

  // Clasificación en vivo desde la descripción.
  const catAuto = useMemo(() => catId ?? clasificar(descripcion), [catId, descripcion]);
  const cat = catAuto ? catById(catAuto) : null;
  const zona = localidad ? zonaDeLocalidad(localidad) : null;

  const onFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const empaqueAyuda = cat ? `Sugerencia para ${cat.nombre.toLowerCase()}: ${cat.empaque} sellada.` : "";

  // Gestores que cubren zona + categoría, con tarifa.
  const cotizaciones = useMemo(() => {
    if (!zona || !catAuto) return [];
    const cubre = gestor.rutas.some((r) => r.zonas.includes(zona.id) && r.categorias.includes(catAuto));
    if (!cubre) return [];
    const t = gestor.tarifasTratamiento.find((x) => x.categoriaId === catAuto && x.activo);
    return [{
      nombre: gestor.nombre,
      precioKg: t?.precioKg ?? null,
      viaje: gestor.tarifasViaje["51-500"] ?? null,
      dias: gestor.rutas.filter((r) => r.zonas.includes(zona.id)).flatMap((r) => r.dias),
    }];
  }, [zona, catAuto, gestor]);

  const diasDisponibles = zona ? Array.from(new Set([...zona.dias, ...cotizaciones.flatMap((c) => c.dias)])) : [];

  const guardar = (estado: Residuo["estado"]) => {
    if (!catAuto) { setGuardadoMsg("Primero identifica el residuo (pregunta 1)."); return; }
    const r: Residuo = {
      id: crypto.randomUUID(), categoriaId: catAuto, descripcion, fotoDataUrl: foto,
      contacto, condicion, cantidad, embalaje, localidad, zonaId: zona?.id ?? null,
      direccion, complemento, indicaciones, contactoNombre: cNombre, contactoCel: cCel,
      lat, lng, estado, fecha: dia, createdAt: Date.now(),
    };
    addResiduo(r);
    setGuardadoMsg(estado === "Pendiente" ? "Guardado en inventario (Pendiente)." : "Servicio confirmado (En trámite). Revisa Seguimiento e Inventario.");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-bosque">Pedir servicio</h1>
        <p className="text-sm text-black/60">Responde todo aquí mismo. Al final generas la cotización.</p>
      </div>

      {/* P1 */}
      <Card>
        <h2 className="font-semibold text-bosque">1. ¿Qué tienes?</h2>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input value={descripcion} onChange={(e) => { setDescripcion(e.target.value); setCatId(null); }}
            placeholder="Describe el residuo con tus palabras…"
            className="flex-1 rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque" />
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-bosque/30 px-4 py-2.5 text-sm font-semibold text-bosque hover:bg-bosque-50">
            📷 Subir foto
            <input type="file" accept="image/*" className="hidden" onChange={onFoto} />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <button key={c} onClick={() => { setDescripcion(c); setCatId(null); }}
              className="rounded-full border border-black/15 px-3 py-1 text-xs hover:border-bosque hover:bg-bosque-50">{c}</button>
          ))}
          <button onClick={() => setAgente(true)}
            className="rounded-full bg-hoja/15 px-3 py-1 text-xs font-semibold text-bosque hover:bg-hoja/25">
            ✦ No sé qué es — Kiri te ayuda
          </button>
        </div>
        {foto && <img src={foto} alt="residuo" className="mt-3 h-20 w-20 rounded-lg object-cover" />}

        {cat && (
          <div className="mt-4 rounded-xl border p-3" style={{ borderColor: semaforoColor[cat.semaforo] + "55" }}>
            <SemaforoPill s={cat.semaforo} />
            <p className="mt-2 text-sm"><b>{cat.nombre}.</b> {cat.queEs}</p>
            {cat.semaforo === "rojo" && (
              <p className="mt-2 text-xs text-red-700">Posible manejo especializado. No compactar ni tirar al agua.</p>
            )}
          </div>
        )}
        {descripcion && !cat && (
          <p className="mt-3 rounded-lg bg-black/5 p-2 text-sm text-black/60">No pude reconocerlo. Usa “No sé qué es — Kiri te ayuda”.</p>
        )}
      </Card>

      {/* P2 */}
      <Card>
        <h2 className="font-semibold text-bosque">2. ¿Estuvo en contacto con aceite, pintura, químico, combustible, medicamento o sangre?</h2>
        <div className="mt-3 flex gap-2">
          {CONTACTO.map((o) => (
            <button key={o} onClick={() => setContacto(o)}
              className={`rounded-xl border px-4 py-2 text-sm ${contacto === o ? "border-bosque bg-bosque text-white" : "border-black/15 hover:bg-bosque-50"}`}>{o}</button>
          ))}
        </div>
      </Card>

      {/* P3 */}
      <Card>
        <h2 className="font-semibold text-bosque">3. ¿En qué condición está?</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONDICIONES.map((o) => (
            <button key={o} onClick={() => setCondicion(o)}
              className={`rounded-xl border px-4 py-2 text-sm ${condicion === o ? "border-bosque bg-bosque text-white" : "border-black/15 hover:bg-bosque-50"}`}>{o}</button>
          ))}
        </div>
      </Card>

      {/* P4 */}
      <Card>
        <h2 className="font-semibold text-bosque">4. ¿Cuánto tienes, más o menos?</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {CANTIDADES.map((o) => (
            <button key={o} onClick={() => setCantidad(o)}
              className={`rounded-xl border px-4 py-2 text-sm ${cantidad === o ? "border-bosque bg-bosque text-white" : "border-black/15 hover:bg-bosque-50"}`}>{o}</button>
          ))}
        </div>
      </Card>

      {/* P5 */}
      <Card>
        <h2 className="font-semibold text-bosque">5. ¿Cómo se debe hacer el embalaje?</h2>
        <div className="mt-3 flex gap-2">
          {EMPAQUES.map((o) => (
            <button key={o} onClick={() => setEmbalaje(o)}
              className={`flex-1 rounded-xl border px-4 py-4 text-sm font-semibold ${embalaje === o ? "border-bosque bg-bosque text-white" : "border-black/15 hover:bg-bosque-50"}`}>{o}</button>
          ))}
        </div>
        <p className="mt-3 text-xs text-black/60">
          Todo debe ir sellado. Caja cerrada con cinta. Bolsa bien anudada. Caneca con tapa puesta.
          Si gotea o se abre, el gestor puede rechazar la visita.
        </p>
        {empaqueAyuda && <p className="mt-1 text-xs font-medium text-bosque">{empaqueAyuda}</p>}
      </Card>

      {/* P6 */}
      <Card>
        <h2 className="font-semibold text-bosque">6. ¿Dónde vamos a recoger?</h2>
        <div className="mt-3">
          <MapaPin lat={lat} lng={lng} onChange={(la, ln) => { setLat(la); setLng(ln); }} />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-black/60">Localidad</label>
            <select value={localidad} onChange={(e) => setLocalidad(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque">
              <option value="">Selecciona…</option>
              {TODAS_LOCALIDADES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            {localidad && (
              <p className="mt-1 text-xs text-black/50">
                Zona: {zona ? zona.nombre : "Fuera de zona"} {lat && lng ? `· pin ${lat}, ${lng}` : ""}
              </p>
            )}
          </div>
          <div>
            <label className="text-xs font-medium text-black/60">Dirección</label>
            <input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, número"
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque" />
          </div>
          <input value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="Apto / local / bodega"
            className="rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque" />
          <input value={indicaciones} onChange={(e) => setIndicaciones(e.target.value)} placeholder="Indicaciones (conjunto, parqueo, piso)"
            className="rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque" />
          <input value={cNombre} onChange={(e) => setCNombre(e.target.value)} placeholder="Contacto en sitio: nombre"
            className="rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque" />
          <input value={cCel} onChange={(e) => setCCel(e.target.value)} placeholder="Celular"
            className="rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-bosque" />
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-black/70">
          <input type="checkbox" checked={perimetral} onChange={(e) => setPerimetral(e.target.checked)} />
          Es municipio vecino (perimetral)
        </label>
      </Card>

      {/* P7 */}
      <Card>
        <h2 className="font-semibold text-bosque">7. Generar cotización</h2>
        <div className="mt-3 rounded-xl bg-bosque-50 p-3 text-sm">
          <b>Resumen:</b>{" "}
          {cat ? cat.nombre : "residuo sin identificar"}
          {cat && <> · <SemaforoPill s={cat.semaforo} /></>}
          {cantidad && <> · {cantidad}</>} {embalaje && <>· {embalaje} sellada</>}
          {localidad && <> · {localidad} ({zona ? zona.nombre : "fuera de zona"})</>}
        </div>

        {zona && diasDisponibles.length > 0 && (
          <div className="mt-3">
            <label className="text-xs font-medium text-black/60">Próximos días disponibles (según zona)</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {diasDisponibles.map((d) => (
                <button key={d} onClick={() => setDia(d)}
                  className={`rounded-xl border px-3 py-1.5 text-sm ${dia === d ? "border-bosque bg-bosque text-white" : "border-black/15 hover:bg-bosque-50"}`}>{d}</button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <Btn onClick={() => setCotizado(true)}>Generar cotización</Btn>
        </div>

        {cotizado && (
          <div className="mt-4 space-y-2">
            {cotizaciones.length > 0 ? cotizaciones.map((c) => (
              <div key={c.nombre} className="rounded-xl border border-black/10 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <b>{c.nombre}</b>
                  <span className="text-xs text-black/50">{c.dias.join(", ")}</span>
                </div>
                <p className="mt-1 text-black/70">
                  Tratamiento: {c.precioKg != null ? `${money(c.precioKg)}/kg` : "según gestor"} ·
                  Viaje: {c.viaje != null ? money(c.viaje) : "según gestor"}
                </p>
                <p className="mt-1 text-xs text-black/45">Precios definidos por el gestor, no por Kiri.</p>
              </div>
            )) : (
              <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                Nadie cubre esto en tu zona esta semana. Dejamos la solicitud. Mientras tanto no lo tires ni lo mezcles.
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              <Btn variant="outline" onClick={() => guardar("Pendiente")}>Guardar en inventario</Btn>
              <Btn onClick={() => guardar("En trámite")}>Confirmar servicio</Btn>
            </div>
          </div>
        )}
        {guardadoMsg && <p className="mt-3 rounded-lg bg-bosque-50 p-2 text-sm text-bosque">{guardadoMsg}</p>}
      </Card>

      {agente && <SolicitudIA onClose={() => setAgente(false)} onPick={(id) => { setCatId(id); setDescripcion(catById(id)?.nombre ?? ""); }} />}
    </div>
  );
}
