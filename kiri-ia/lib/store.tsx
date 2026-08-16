"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type EstadoItem = "Pendiente" | "En trámite" | "Finalizado";

export interface Residuo {
  id: string;
  categoriaId: string;
  descripcion: string;
  fotoDataUrl?: string;
  contacto: "Sí" | "No" | "No sé" | "";
  condicion: string;
  cantidad: string;
  embalaje: string;
  localidad: string;
  zonaId: string | null;
  direccion: string;
  complemento: string;
  indicaciones: string;
  contactoNombre: string;
  contactoCel: string;
  lat: number | null;
  lng: number | null;
  estado: EstadoItem;
  fecha: string;
  createdAt: number;
}

export interface TarifaTratamiento { categoriaId: string; precioKg: number | null; activo: boolean; }
export interface Ruta { id: string; nombre: string; dias: string[]; zonas: string[]; horario: string; categorias: string[]; }
export interface GestorPerfil {
  nombre: string;
  rutas: Ruta[];
  tarifasViaje: Record<string, number | null>;
  tarifasTratamiento: TarifaTratamiento[];
}

interface StoreShape {
  residuos: Residuo[];
  addResiduo: (r: Residuo) => void;
  updateResiduo: (id: string, patch: Partial<Residuo>) => void;
  gestor: GestorPerfil;
  setGestor: (g: GestorPerfil) => void;
  ready: boolean;
}

const defaultGestor: GestorPerfil = {
  nombre: "GestorVerde SAS",
  rutas: [
    { id: "r1", nombre: "Jueves Fontibón", dias: ["Jueves", "Viernes"], zonas: ["zona4", "zona5"], horario: "7:00-15:00",
      categorias: ["aceites_usados", "cortopunzantes", "toner", "reciclables_limpios", "llantas"] },
  ],
  tarifasViaje: { "1-50": 130000, "51-500": 220000, "501-1000": 320000, "1001-3000": 400000, "perimetral": 500000 },
  tarifasTratamiento: [
    { categoriaId: "aceites_usados", precioKg: 1000, activo: true },
    { categoriaId: "cortopunzantes", precioKg: 1800, activo: true },
    { categoriaId: "toner", precioKg: 1200, activo: true },
    { categoriaId: "reciclables_limpios", precioKg: 0, activo: true },
    { categoriaId: "llantas", precioKg: 900, activo: true },
  ],
};

const StoreCtx = createContext<StoreShape | null>(null);
const KEY = "kiri-ia-store-v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [residuos, setResiduos] = useState<Residuo[]>([]);
  const [gestor, setGestorState] = useState<GestorPerfil>(defaultGestor);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.residuos)) setResiduos(data.residuos);
        if (data.gestor) setGestorState(data.gestor);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ residuos, gestor })); } catch {}
  }, [residuos, gestor, ready]);

  const addResiduo = (r: Residuo) => setResiduos((prev) => [r, ...prev]);
  const updateResiduo = (id: string, patch: Partial<Residuo>) =>
    setResiduos((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const setGestor = (g: GestorPerfil) => setGestorState(g);

  return (
    <StoreCtx.Provider value={{ residuos, addResiduo, updateResiduo, gestor, setGestor, ready }}>
      {children}
    </StoreCtx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}
