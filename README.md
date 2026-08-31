

<div align="center">

# ♻️ Kiri IA

### Gestión de residuos tan simple como pedir un servicio

**Identifica → orienta → conecta → gestiona → traza**

[![App en vivo](https://img.shields.io/badge/App_en_vivo-Vercel-black?style=for-the-badge&logo=vercel)](https://kiri-ia.vercel.app/)
[![Prototipo](https://img.shields.io/badge/Prototipo-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://spent-mud-17002851.figma.site/)

</div>

---

## 💡 ¿Qué es Kiri IA?

**Kiri IA** es una plataforma web orientada a facilitar la gestión de residuos mediante una experiencia accesible, educativa y trazable.

La solución acompaña al usuario desde la identificación inicial del residuo hasta el seguimiento de su gestión, integrando herramientas digitales para conectar generadores y gestores.

El proyecto combina **gestión ambiental, logística, geolocalización, trazabilidad y asistencia inteligente**.

---

## 🎯 Problema

Empresas, pequeños negocios y otros generadores de residuos pueden encontrar dificultades para:

- Identificar correctamente sus residuos.
- Saber cómo clasificarlos o almacenarlos.
- Encontrar gestores adecuados.
- Consultar opciones según zona y categoría.
- Hacer seguimiento al proceso.
- Mantener información sobre la gestión realizada.

Kiri IA busca centralizar estas necesidades en una experiencia digital sencilla y comprensible.

---

## ✨ Funcionalidades

### 🤖 Identificación asistida

El usuario describe el residuo con sus propias palabras y **Solicitud IA** ofrece orientación utilizando el diccionario interno de residuos de Kiri.

### 📦 Inventario

Permite registrar y consultar información relacionada con los residuos asociados al usuario.

### 🚚 Conexión con gestores

La plataforma contempla la relación entre solicitudes y gestores según criterios como:

- Zona
- Categoría del residuo
- Cobertura
- Tarifas

### 🗺️ Geolocalización

Integra mapas mediante **Leaflet y OpenStreetMap** para apoyar la ubicación dentro de la experiencia.

### 🔎 Seguimiento y trazabilidad

Permite consultar información relacionada con el estado y evolución de la gestión.

### 📊 Analítica

Incluye visualizaciones para facilitar la comprensión de información operativa.

---

## 👥 Roles

| Rol | Funciones principales |
| --- | --- |
| 👤 **Cliente** | Gestionar residuos, consultar inventario, seguimiento y analítica |
| 🚛 **Gestor** | Gestionar rutas, zonas, categorías y tarifas |
| ⚙️ **Administrador** | Consultar métricas y supervisar solicitudes de la operación |

---

## 🧠 Asistencia inteligente

Cuando el usuario no conoce la clasificación de un residuo, puede utilizar **Solicitud IA** como herramienta de orientación.

La versión actual utiliza un **clasificador local basado en el diccionario de residuos de Kiri**, permitiendo apoyar la clasificación incluso sin depender de una API externa.

> Kiri IA orienta de forma general y no certifica procesos ambientales ni reemplaza la evaluación de especialistas o autoridades competentes.

---

## 🛠️ Tecnologías

### Frontend

- **Next.js 14**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Mapas

- **Leaflet**
- **OpenStreetMap**

### Persistencia

- **localStorage** en la versión actual
- Arquitectura preparada para futura integración con **Supabase**

### Despliegue

- **Vercel**

---

## 🏗️ Estructura del proyecto

```text
Kiri-IA/
│
├── README.md
│
└── kiri-ia/
    ├── app/
    ├── components/
    ├── lib/
    ├── public/
    ├── README.md
    ├── package.json
    ├── next.config.mjs
    ├── tailwind.config.ts
    └── tsconfig.json
```

---

## 🚀 Demo

🌐 **Aplicación:**  
https://kiri-ia.vercel.app/

🎨 **Prototipo:**  
https://spent-mud-17002851.figma.site/

---

## 💻 Ejecutar en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Gei-del/Kiri-IA.git
```

### 2. Entrar al proyecto

```bash
cd Kiri-IA/kiri-ia
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar

```bash
npm run dev
```

Abre en el navegador:

```text
http://localhost:3000
```

---

## ☁️ Despliegue

La aplicación está desplegada en **Vercel**.

La versión actual utiliza **Next.js** y no requiere variables de entorno para ejecutarse.

---

## 🌱 Enfoque

Kiri IA explora cómo la tecnología puede facilitar una gestión de residuos más comprensible mediante:

- Educación ambiental.
- Organización de información.
- Trazabilidad.
- Geolocalización.
- Conexión entre actores.
- Herramientas digitales de apoyo.

---

## 🛡️ Uso responsable

Kiri IA funciona como una herramienta de **orientación general**.

No certifica el cumplimiento de obligaciones ambientales ni sustituye la evaluación de gestores autorizados, especialistas o autoridades competentes.

Para residuos peligrosos o especiales, la plataforma promueve la búsqueda de manejo especializado.

---

## 📌 Estado del proyecto

🟢 **Prototipo funcional en evolución**

La versión actual incluye:

- ✅ Gestión por roles
- ✅ Inventario
- ✅ Solicitud IA / clasificación asistida
- ✅ Seguimiento
- ✅ Analítica
- ✅ Mapas y geolocalización
- ✅ Persistencia local
- ✅ Demo desplegada en Vercel

---

## 🔮 Próximos pasos

- [ ] Integrar Supabase como backend persistente.
- [ ] Implementar autenticación real de usuarios.
- [ ] Mejorar operaciones multiusuario.
- [ ] Fortalecer la trazabilidad.
- [ ] Incorporar historial de gestiones.
- [ ] Añadir pruebas automatizadas.
- [ ] Mejorar accesibilidad.
- [ ] Ampliar analítica y métricas.

---

## 👩‍💻 Desarrollo

Proyecto desarrollado como una propuesta tecnológica que integra:

`Next.js` · `TypeScript` · `React` · `Tailwind CSS` · `Leaflet` · `OpenStreetMap` · `IA aplicada`

---

<div align="center">

### ♻️ Kiri IA

**Tecnología para hacer más comprensible y trazable la gestión de residuos.**

Hecho en Colombia 🇨🇴

</div>
