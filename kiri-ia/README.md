# ♻️ Kiri IA

### Gestión inteligente y trazable de residuos

Kiri IA es una plataforma web diseñada para facilitar la gestión
de residuos desde su identificación hasta su disposición final.

Permite conectar generadores y gestores, realizar seguimiento,
gestionar inventarios y apoyar la clasificación de residuos
mediante asistencia inteligente.

## 🎯 Problema

La gestión de residuos puede involucrar procesos manuales,
información dispersa y poca trazabilidad entre quienes generan
los residuos y quienes realizan su gestión.

Kiri IA busca centralizar este proceso en una experiencia digital
simple y accesible.

## ✨ Funcionalidades

- 🤖 Asistencia para identificación de residuos
- 📦 Gestión de inventario
- 🔎 Seguimiento y trazabilidad
- 📊 Analítica
- 👤 Gestión por roles
- ♻️ Información para clasificación de residuos
- 🚚 Conexión entre generadores y gestores

## 👥 Roles

### Cliente
Registra residuos, consulta inventario y realiza seguimiento.

### Gestor
Gestiona solicitudes y procesos relacionados con los residuos.

### Administrador
Supervisa usuarios, operaciones y funcionamiento de la plataforma.

## 🧠 Asistencia inteligente

Cuando el usuario no conoce la clasificación de un residuo,
puede utilizar Solicitud IA para recibir orientación basada
en el diccionario de Kiri.

## 🛠️ Tecnologías

- Next.js 14
- TypeScript
- React
- Tailwind CSS
- JavaScript
- Vercel

## 🏗️ Arquitectura

```text
kiri-ia/
├── app/
├── components/
├── lib/
├── public/
├── README.md
├── package.json
├── next.config.mjs
└── tailwind.config.ts
```

## 🚀 Demo

Aplicación desplegada en Vercel.

## 🌱 Impacto

Kiri IA explora cómo la tecnología puede mejorar la gestión
responsable de residuos mediante trazabilidad, información
comprensible y herramientas digitales de apoyo.

## 👩‍💻 Desarrollo

Proyecto desarrollado como solución tecnológica orientada
a sostenibilidad, gestión ambiental e innovación.

Áreas trabajadas:

- Desarrollo frontend
- Diseño de experiencia de usuario
- Arquitectura de aplicaciones web
- Gestión y visualización de información
- Integración de funcionalidades de IA

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
