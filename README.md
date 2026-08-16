<div align="center">

# ♻️ Kiri IA

### Gestión de residuos tan simple como pedir un servicio

**Identifica → enseña → cotiza → conecta → transporta → traza → demuestra el destino.**

[![App en vivo](https://img.shields.io/badge/App_en_vivo-Vercel-14432A?style=for-the-badge)](https://kiri-ia.vercel.app/)
[![Prototipo](https://img.shields.io/badge/Prototipo-Figma-3FA66A?style=for-the-badge)](https://spent-mud-17002851.figma.site/)

🔗 **App:** https://kiri-ia.vercel.app/ · 🎨 **Prototipo:** https://spent-mud-17002851.figma.site/

</div>

---

## ¿Qué es Kiri IA?

Una plataforma que convierte la gestión de residuos en un servicio **accesible, educativo, trazable y bajo demanda** para Colombia. No es una app de reciclaje genérica: es un ecosistema **marketplace + logística + IA + educación ambiental**, con énfasis en residuos **peligrosos, especiales, hospitalarios y de construcción (RCD)**.

> Cuéntanos qué residuo tienes. Te ayudamos a entenderlo, a saber qué hacer, a encontrar quién lo gestione y a comprobar a dónde llegó.

## El problema

Muchas empresas y pequeños negocios generan residuos pero no saben identificarlos, separarlos, almacenarlos, qué gestor necesitan ni cuánto cuesta. Y en Colombia **el generador es responsable hasta el destino final**. Kiri hace usable lo que la ley ya exige.

## Qué hace la app

- **Describe, no fotografíes.** El usuario cuenta qué tiene con sus palabras y **Solicitud IA** lo traduce a una categoría, le pone un **semáforo** (verde / amarillo / rojo / gris) y le dice cómo empacarlo. La foto es apoyo opcional.
- **Orienta, no certifica.** En residuos peligrosos muestra el aviso de manejo especializado. Nunca dice "tíralo" ni inventa que cumple la ley.
- **Cotiza con gestores reales por zona.** Conecta con el gestor que cubre tu localidad y tu residuo; los precios los pone el gestor, no Kiri.
- **Traza hasta la evidencia.** Sigue el servicio y guarda el certificado de destino.

### Roles
| Rol | Qué hace |
|-----|----------|
| 👤 **Cliente** | Gestionar (7 preguntas en una pantalla) · Inventario · Seguimiento · Analítica |
| 🚛 **Gestor** | Arma rutas libres (días, zonas, categorías) y define sus tarifas |
| ⚙️ **Administrador** | Métricas y solicitudes de la operación |

## Tecnología

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Leaflet + OpenStreetMap** — mapa real con pin arrastrable, sin API key
- Clasificador local basado en el **diccionario de residuos de Kiri** (funciona offline)
- Persistencia en el navegador (localStorage); preparada para conectar **Supabase**
- Desplegada en **Vercel**

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Desplegar en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → importa el repo.
3. Framework: Next.js (se detecta solo) → **Deploy**. No requiere variables de entorno.

## Estructura

```
app/          Páginas (landing, ingresar, cliente, gestor, admin)
components/    UI: Gestionar, SolicitudIA, MapaPin, Inventario, Seguimiento, Analítica…
lib/          Categorías, clasificador, zonas y store (estado + persistencia)
```

## Enfoque responsable

Kiri **orienta de forma general y no reemplaza** la revisión jurídica ni a la autoridad ambiental competente. La responsabilidad legal del generador (identificar, separar, almacenar y entregar a un gestor autorizado) no se transfiere por usar la plataforma.

---

<div align="center">

**Kiri IA** — Hacemos que saber qué hacer con un residuo, encontrar quién lo gestione y comprobar su destino sea tan sencillo como pedir un servicio desde el celular.

Hecho en Colombia 🇨🇴

</div>
