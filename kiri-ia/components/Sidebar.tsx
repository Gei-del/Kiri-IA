"use client";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui";

export interface Item { id: string; label: string; icon: string; }

export default function Sidebar({ items, activo, setActivo, titulo }: {
  items: Item[]; activo: string; setActivo: (id: string) => void; titulo: string;
}) {
  const router = useRouter();
  return (
    <aside className="flex w-full shrink-0 flex-col gap-1 border-b border-black/5 bg-white p-4 sm:w-64 sm:border-b-0 sm:border-r">
      <div className="mb-4 hidden sm:block"><Logo /></div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/40">{titulo}</p>
      <nav className="flex gap-1 overflow-x-auto sm:flex-col">
        {items.map((it) => (
          <button key={it.id} onClick={() => setActivo(it.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition ${activo === it.id ? "bg-bosque text-white" : "text-black/70 hover:bg-bosque-50"}`}>
            <span>{it.icon}</span> {it.label}
          </button>
        ))}
      </nav>
      <button onClick={() => router.push("/ingresar")}
        className="mt-auto hidden rounded-xl px-3 py-2.5 text-left text-sm text-black/50 hover:bg-black/5 sm:block">
        ← Cambiar de usuario
      </button>
    </aside>
  );
}
