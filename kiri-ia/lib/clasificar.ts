// Clasificador local basado en el diccionario de Kiri IA (sin API).
export interface Regla { palabras: string[]; categoria: string; }

export const REGLAS: Regla[] = [
  { palabras: ["quimico", "químico", "laboratorio", "reactivo", "bolsa roja", "clinico", "clínico"], categoria: "quimicos_lab_clinicos" },
  { palabras: ["toner", "tóner", "cartucho", "tinta de impresora"], categoria: "toner" },
  { palabras: ["icopor", "nevera blanca", "poliestireno"], categoria: "icopor" },
  { palabras: ["agua sucia", "aguas sucias", "lavado de pistola", "liquido contaminado", "líquido contaminado", "efluente"], categoria: "liquidos_contaminados" },
  { palabras: ["aceite con agua", "aceite con thinner", "aceite mezclado", "aceite contaminado"], categoria: "aceites_contaminados" },
  { palabras: ["aceite del carro", "aceite de motor", "aceite del motor", "aceite del taller", "aceite hidraulico", "aceite hidráulico", "aceite usado"], categoria: "aceites_usados" },
  { palabras: ["aceite de cocina", "aceite de freir", "aceite de freír", "aceite vegetal"], categoria: "aceite_cocina" },
  { palabras: ["caneca de pintura", "cuñete", "cunete", "envase de thinner", "envase vacio", "envase vacío", "envase contaminado", "frasco de plaguicida"], categoria: "envases_contaminados" },
  { palabras: ["estiba", "madera sucia", "aserrin", "aserrín", "madera"], categoria: "madera" },
  { palabras: ["llanta", "neumatico", "neumático"], categoria: "llantas" },
  { palabras: ["ropa sucia", "dotacion", "dotación", "overol", "uniforme", "guante de trabajo", "epp"], categoria: "epp_dotacion" },
  { palabras: ["trapo", "estopa", "wipe", "wipes"], categoria: "textiles_contaminados" },
  { palabras: ["pastilla vencida", "medicamento", "jarabe", "farmaco", "fármaco", "vencido"], categoria: "medicamentos_vencidos" },
  { palabras: ["aguja", "jeringa", "bisturi", "bisturí", "ampolleta", "cortopunzante", "lanceta"], categoria: "cortopunzantes" },
  { palabras: ["cascote con aceite", "escombro de taller", "teja eternit", "eternit", "escombro contaminado", "asbesto"], categoria: "escombros_contaminados" },
  { palabras: ["escombro", "cascote", "ladrillo", "demolicion", "demolición", "hormigon", "hormigón"], categoria: "escombros_limpios" },
  { palabras: ["cable", "fibra", "tendido"], categoria: "cable_fibra" },
  { palabras: ["tubo de luz", "bombillo", "ahorradora", "fluorescente", "luminaria"], categoria: "luminarias_rotas" },
  { palabras: ["carton", "cartón", "papel", "pet", "vidrio", "chatarra", "reciclable"], categoria: "reciclables_limpios" },
  { palabras: ["comida", "poda", "resto de cocina", "organico", "orgánico"], categoria: "organicos" },
  { palabras: ["nevera", "computador", "pc", "televisor", "tv", "impresora", "aparato"], categoria: "aparatos_electronicos" },
  { palabras: ["bateria de carro", "batería de carro", "bateria del carro"], categoria: "baterias_carro" },
  { palabras: ["pila", "pilas"], categoria: "pilas" },
];

// Devuelve el id de categoría o null si es vago ("de todo un poco", "sólidos").
export function clasificar(texto: string): string | null {
  const t = texto.toLowerCase().trim();
  if (!t) return null;
  const vago = ["de todo", "solidos", "sólidos", "basura", "no se", "no sé", "varios"];
  // Coincidencia por palabra clave (la primera que aparezca).
  for (const regla of REGLAS) {
    for (const p of regla.palabras) {
      if (t.includes(p)) return regla.categoria;
    }
  }
  if (vago.some((v) => t.includes(v))) return null;
  return null;
}
