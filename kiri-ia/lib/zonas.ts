export interface Zona { id: string; nombre: string; localidades: string[]; dias: string[]; }

export const ZONAS: Zona[] = [
  { id: "zona1", nombre: "Zona 1", localidades: ["Usaquén", "Suba"], dias: ["Lunes"] },
  { id: "zona2", nombre: "Zona 2", localidades: ["Chapinero", "Barrios Unidos", "Teusaquillo"], dias: ["Martes"] },
  { id: "zona3", nombre: "Zona 3", localidades: ["La Candelaria", "Santa Fe", "Los Mártires", "Antonio Nariño", "Puente Aranda"], dias: ["Miércoles"] },
  { id: "zona4", nombre: "Zona 4", localidades: ["Engativá", "Fontibón"], dias: ["Jueves"] },
  { id: "zona5", nombre: "Zona 5", localidades: ["Kennedy", "Bosa"], dias: ["Viernes"] },
];

export const FUERA_ZONA = ["Usme", "Ciudad Bolívar", "San Cristóbal", "Rafael Uribe Uribe", "Tunjuelito", "Sumapaz", "Municipio vecino"];

export const TODAS_LOCALIDADES = [
  ...ZONAS.flatMap((z) => z.localidades), ...FUERA_ZONA,
].sort((a, b) => a.localeCompare(b));

export function zonaDeLocalidad(loc: string): Zona | null {
  return ZONAS.find((z) => z.localidades.includes(loc)) ?? null;
}
