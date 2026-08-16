"use client";
import { useRouter } from "next/navigation";
import { BackButton, Card, Logo } from "@/components/ui";

const roles = [
  { id: "cliente", icon: "👤", title: "Cliente", desc: "Gestiona tus residuos: describe, cotiza y sigue el servicio.", to: "/cliente" },
  { id: "gestor", icon: "🚛", title: "Gestor", desc: "Recolecta y trata. Configura tus rutas, zonas y tarifas.", to: "/gestor" },
  { id: "admin", icon: "⚙️", title: "Administrador Kiri IA", desc: "Operación, usuarios, servicios y métricas.", to: "/admin" },
];

export default function Ingresar() {
  const router = useRouter();
  return (
    <main className="mx-auto max-w-4xl px-5">
      <header className="flex items-center justify-between py-6">
        <Logo />
        <BackButton to="/" />
      </header>
      <h1 className="mb-1 text-3xl font-bold text-bosque">¿Cómo vas a usar Kiri IA?</h1>
      <p className="mb-8 text-black/60">Para clientes y gestores.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {roles.map((r) => (
          <button key={r.id} onClick={() => router.push(r.to)} className="text-left">
            <Card className="h-full transition hover:border-bosque/40 hover:shadow-md">
              <div className="mb-3 text-3xl">{r.icon}</div>
              <h2 className="font-bold text-bosque">{r.title}</h2>
              <p className="mt-1 text-sm text-black/60">{r.desc}</p>
            </Card>
          </button>
        ))}
      </div>
    </main>
  );
}
