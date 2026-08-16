import { Btn, Logo } from "@/components/ui";

const pasos = [
  ["Identifica", "Cuéntanos qué tienes; Kiri lo reconoce."],
  ["Enseña", "Semáforo y cómo empacarlo sin equivocarte."],
  ["Cotiza", "Gestores que sí cubren tu zona y tu residuo."],
  ["Conecta", "Agenda la recolección con un gestor autorizado."],
  ["Transporta", "Sigue el servicio hasta la entrega."],
  ["Traza", "Evidencia y certificado del destino final."],
];

export default function Landing() {
  return (
    <main className="mx-auto max-w-5xl px-5">
      <header className="flex items-center justify-between py-6">
        <Logo />
        <Btn href="/ingresar" variant="outline">Ingresar</Btn>
      </header>

      <section className="py-10 sm:py-16">
        <p className="mb-3 inline-block rounded-full bg-bosque-50 px-3 py-1 text-xs font-semibold text-bosque">
          Bogotá · gestión responsable de residuos
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-bosque sm:text-5xl">
          Gestión de residuos tan simple como pedir un servicio.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70">
          Cuéntanos qué residuo tienes. Te ayudamos a entenderlo, a saber qué hacer,
          a encontrar quién lo gestione y a comprobar a dónde llegó.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Btn href="/ingresar">Comenzar</Btn>
          <Btn href="/ingresar" variant="ghost">Para clientes y gestores</Btn>
        </div>
      </section>

      <section id="solucion" className="py-8">
        <h2 className="mb-6 text-2xl font-bold text-bosque">La solución</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pasos.map(([t, d], i) => (
            <div key={t} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-hoja/15 font-bold text-bosque">{i + 1}</div>
              <h3 className="font-semibold text-bosque">{t}</h3>
              <p className="mt-1 text-sm text-black/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/5 py-8 text-sm text-black/50">
        No solo ayudamos a gestionar residuos: hacemos que saber qué hacer con ellos,
        encontrar quién los gestione y comprobar su destino sea tan sencillo como pedir un servicio. — Kiri IA
      </footer>
    </main>
  );
}
