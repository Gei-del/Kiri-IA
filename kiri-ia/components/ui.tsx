"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Semaforo, semaforoColor, semaforoLabel } from "@/lib/categorias";

export function Btn({ children, onClick, href, variant = "primary", type = "button", disabled }: {
  children: React.ReactNode; onClick?: () => void; href?: string;
  variant?: "primary" | "ghost" | "outline"; type?: "button" | "submit"; disabled?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-bosque text-white hover:bg-bosque-700",
    ghost: "text-bosque hover:bg-bosque-50",
    outline: "border border-bosque/30 text-bosque hover:bg-bosque-50",
  }[variant];
  if (href) return <Link href={href} className={`${base} ${styles}`}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>{children}</button>;
}

export function BackButton({ to }: { to?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => (to ? router.push(to) : router.back())}
      className="inline-flex items-center gap-1 text-sm font-medium text-bosque hover:underline"
    >
      <span aria-hidden>←</span> Volver
    </button>
  );
}

export function SemaforoPill({ s }: { s: Semaforo }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: semaforoColor[s] + "22", color: semaforoColor[s] }}>
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: semaforoColor[s] }} />
      {semaforoLabel[s]}
    </span>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-black/5 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-hoja text-white text-lg">♻</span>
      <span className="text-lg font-bold text-bosque">Kiri IA</span>
    </div>
  );
}
