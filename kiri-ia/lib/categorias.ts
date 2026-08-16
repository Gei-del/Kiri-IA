export type Semaforo = "verde" | "amarillo" | "rojo" | "gris";
export type Empaque = "Caja" | "Bolsa" | "Caneca";

export interface Categoria {
  id: string;
  nombre: string;
  semaforo: Semaforo;
  queEs: string;
  comoTratarlo: string;
  queNoHacer: string;
  empaque: Empaque;
}

export const CATEGORIAS: Categoria[] = [
  { id: "quimicos_lab_clinicos", nombre: "Químicos de laboratorio y clínicos", semaforo: "rojo",
    queEs: "Sustancias de laboratorio o residuos de atención clínica. Pueden ser tóxicos o infecciosos.",
    comoTratarlo: "Caneca rígida tapada y sellada, rotulada con el riesgo.", queNoHacer: "No al desagüe. No mezclar ácidos con otros químicos.", empaque: "Caneca" },
  { id: "toner", nombre: "Tóner", semaforo: "amarillo",
    queEs: "Cartuchos de impresora. Polvo fino que no se debe aspirar en casa.",
    comoTratarlo: "Enteros, en bolsa o caja sellada, sin destapar.", queNoHacer: "No romperlos ni reciclarlos como plástico. No es la impresora.", empaque: "Bolsa" },
  { id: "icopor", nombre: "Icopor", semaforo: "amarillo",
    queEs: "Espuma blanca de empaque. Ocupa mucho, pesa poco.",
    comoTratarlo: "Bolsa sellada. Si trajo muestras o químicos, tratar como contaminado (rojo).", queNoHacer: "No quemar. No mezclar con escombro.", empaque: "Bolsa" },
  { id: "liquidos_contaminados", nombre: "Líquidos contaminados", semaforo: "rojo",
    queEs: "Líquido que arrastra un contaminante: solvente, metal, aceite o biológico.",
    comoTratarlo: "Caneca estanca, tapada, no llena al 100%, rotulada.", queNoHacer: "No al desagüe, suelo ni río.", empaque: "Caneca" },
  { id: "aceites_contaminados", nombre: "Aceites contaminados", semaforo: "rojo",
    queEs: "Aceite usado mezclado con agua, solvente o viruta.",
    comoTratarlo: "Caneca sellada, aparte del aceite 'bueno'.", queNoHacer: "No mezclar con el tambor de aceite limpio. No al desagüe.", empaque: "Caneca" },
  { id: "aceites_usados", nombre: "Aceites usados", semaforo: "rojo",
    queEs: "Aceite de motor, transmisión o hidráulico. Es residuo peligroso.",
    comoTratarlo: "Caneca tapada y sellada, con rótulo 'aceite usado'.", queNoHacer: "No al desagüe ni a la tierra. No es aceite de cocina.", empaque: "Caneca" },
  { id: "envases_contaminados", nombre: "Envases contaminados", semaforo: "rojo",
    queEs: "Envase que tuvo una sustancia peligrosa. Sigue peligroso aunque se vea vacío.",
    comoTratarlo: "Tapados y sellados, rotulados con lo que contuvieron.", queNoHacer: "No lavar en el sifón. No reciclar como plástico.", empaque: "Caneca" },
  { id: "madera", nombre: "Madera", semaforo: "amarillo",
    queEs: "Estibas o madera. Si está impregnada de químico o aceite, es peligrosa.",
    comoTratarlo: "Si está limpia, aprovechable. Si manchada, como sólido peligroso.", queNoHacer: "No quemar madera tratada.", empaque: "Caja" },
  { id: "llantas", nombre: "Llantas", semaforo: "amarillo",
    queEs: "Llantas al final de su vida (posconsumo).",
    comoTratarlo: "Enteras, contar unidades.", queNoHacer: "No quemar. No dejar en un lote.", empaque: "Caja" },
  { id: "epp_dotacion", nombre: "EPP y dotación usados", semaforo: "rojo",
    queEs: "Ropa de trabajo, overoles y guantes usados.",
    comoTratarlo: "Bolsa sellada. Rojo si tocó químico, aceite o sangre.", queNoHacer: "No lavar en la empresa, no donar, no mezclar con reciclaje.", empaque: "Bolsa" },
  { id: "textiles_contaminados", nombre: "Textiles contaminados", semaforo: "rojo",
    queEs: "Trapos, estopa o wipes con contaminante. El trapo ES el residuo.",
    comoTratarlo: "Bolsa sellada de contaminados.", queNoHacer: "No lavar. No a la caneca común.", empaque: "Bolsa" },
  { id: "medicamentos_vencidos", nombre: "Medicamentos vencidos", semaforo: "amarillo",
    queEs: "Fármacos caducos. Rojo si son de clínica o vacunas.",
    comoTratarlo: "En su empaque, sellados.", queNoHacer: "No al sanitario. No triturar.", empaque: "Caja" },
  { id: "cortopunzantes", nombre: "Cortopunzantes", semaforo: "rojo",
    queEs: "Agujas, jeringas, bisturís. Riesgo infeccioso y de corte.",
    comoTratarlo: "Caja rígida cerrada y sellada (guardián).", queNoHacer: "Nunca solo una bolsa. No meter la mano.", empaque: "Caja" },
  { id: "escombros_contaminados", nombre: "Escombros contaminados", semaforo: "rojo",
    queEs: "Escombro con aceite, químico, asbesto o biológico. Ya no es RCD limpio.",
    comoTratarlo: "Aparte del cascote limpio, sellado según el contaminante.", queNoHacer: "No triturar con RCD limpio. No al río.", empaque: "Caneca" },
  { id: "escombros_limpios", nombre: "Escombros limpios", semaforo: "verde",
    queEs: "Cascote inerte: hormigón, ladrillo, cerámica limpios.",
    comoTratarlo: "Separado, sin mezclar con otros residuos.", queNoHacer: "No mezclar con aceite ni hospital. No al río.", empaque: "Caja" },
  { id: "cable_fibra", nombre: "Cable de fibra", semaforo: "amarillo",
    queEs: "Cable de fibra o datos. Rojo si está quemado o con aceite.",
    comoTratarlo: "Rollos atados.", queNoHacer: "No quemar.", empaque: "Bolsa" },
  { id: "luminarias_rotas", nombre: "Luminarias rotas", semaforo: "rojo",
    queEs: "Tubos y bombillas, sobre todo fluorescentes (mercurio).",
    comoTratarlo: "Caja rígida sellada.", queNoHacer: "No barrer en seco. No aspirar en casa.", empaque: "Caja" },
  { id: "reciclables_limpios", nombre: "Reciclables limpios", semaforo: "verde",
    queEs: "Cartón, papel, PET, vidrio y metal limpios.",
    comoTratarlo: "Bolsa o caneca blanca sellada.", queNoHacer: "Sin grasa, aceite ni agujas.", empaque: "Bolsa" },
  { id: "organicos", nombre: "Orgánicos", semaforo: "verde",
    queEs: "Restos de comida y poda.",
    comoTratarlo: "Bolsa o caneca verde sellada.", queNoHacer: "No mezclar con el cartón seco.", empaque: "Bolsa" },
  { id: "aceite_cocina", nombre: "Aceite de cocina", semaforo: "amarillo",
    queEs: "Aceite vegetal de freír. No es el aceite del motor.",
    comoTratarlo: "Caneca sellada.", queNoHacer: "No mezclar con el aceite del carro. No al desagüe.", empaque: "Caneca" },
  { id: "aparatos_electronicos", nombre: "Aparatos electrónicos", semaforo: "amarillo",
    queEs: "Nevera, computador, TV, impresora (posconsumo / RAEE).",
    comoTratarlo: "No compactar. Separado.", queNoHacer: "No pinchar neveras (gases).", empaque: "Caja" },
  { id: "baterias_carro", nombre: "Baterías de carro", semaforo: "rojo",
    queEs: "Baterías plomo-ácido. Peligroso posconsumo.",
    comoTratarlo: "Caja o caneca propia, sellada.", queNoHacer: "No perforar.", empaque: "Caja" },
  { id: "pilas", nombre: "Pilas", semaforo: "amarillo",
    queEs: "Pilas y acumuladores (posconsumo).",
    comoTratarlo: "Caja o caneca propia.", queNoHacer: "No perforar. No a la basura.", empaque: "Caja" },
];

export const catById = (id: string) => CATEGORIAS.find((c) => c.id === id);

export const semaforoColor: Record<Semaforo, string> = {
  verde: "#3FA66A", amarillo: "#E0A70B", rojo: "#D64545", gris: "#9AA0A6",
};
export const semaforoLabel: Record<Semaforo, string> = {
  verde: "Verde · gestión estándar", amarillo: "Amarillo · requiere atención",
  rojo: "Rojo · manejo especializado", gris: "Gris · falta información",
};
