# Kiri IA — Plataforma de gestión de residuos

App web (Next.js 14 + TypeScript + Tailwind) lista para desplegar en Vercel.
Funciona sin base de datos ni llaves: los datos se guardan en el navegador.

## Qué incluye
- **Landing** con la propuesta de Kiri IA.
- **3 roles**: Cliente, Gestor, Administrador.
- **Cliente**: Gestionar (7 preguntas en una sola pantalla) · Inventario · Seguimiento · Analítica.
  - Describe el residuo (o sube foto opcional). Si no sabe, abre el agente **Solicitud IA**, que orienta con el diccionario de Kiri (qué es, categoría, semáforo, cómo tratarlo).
  - Mapa real con pin arrastrable (Leaflet + OpenStreetMap, sin API key).
  - Embalaje: Caja / Bolsa / Caneca (todo sellado).
  - Cotización con las tarifas del gestor (nunca precios inventados por Kiri).
- **Gestor**: arma rutas libres (días, zonas, categorías) y define sus tarifas.
- **Admin**: métricas y últimas solicitudes.

## Correr en local
```bash
npm install
npm run dev
```
Abre http://localhost:3000

## Desplegar en Vercel (fácil)
1. Sube esta carpeta a un repositorio de GitHub.
2. En vercel.com → New Project → importa el repo.
3. Framework: Next.js (se detecta solo). Dale **Deploy**. No requiere variables de entorno.

## Notas
- Los datos viven en el navegador (localStorage). Para producción real, se conecta a Supabase.
- Kiri **orienta**, no certifica. En residuos peligrosos muestra el aviso de manejo especializado.
