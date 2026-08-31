

<div align="center">

# ♻️ Kiri IA

### Gestión de residuos tan simple como pedir un servicio

**Identifica → enseña → cotiza → conecta → transporta → traza → demuestra el destino.**

[![App en vivo](https://img.shields.io/badge/App_en_vivo-Vercel-14432A?style=for-the-badge)](https://kiri-ia.vercel.app/)
[![Prototipo](https://img.shields.io/badge/Prototipo-Figma-3FA66A?style=for-the-badge)](https://spent-mud-17002851.figma.site/)

🔗 **App:** https://kiri-ia.vercel.app/  
🎨 **Prototipo:** https://spent-mud-17002851.figma.site/

</div>

---

## 💡 ¿Qué es Kiri IA?

**Kiri IA** es una plataforma web orientada a facilitar la gestión de residuos de forma accesible, educativa y trazable.

La solución busca acompañar al usuario desde la identificación del residuo hasta su gestión final, conectando generadores y gestores mediante una experiencia digital sencilla.

El proyecto integra:

- ♻️ Gestión de residuos
- 🚚 Logística
- 🤖 Asistencia inteligente
- 📊 Trazabilidad
- 🗺️ Geolocalización
- 📚 Educación ambiental

---

## 🎯 El problema

Empresas, pequeños negocios y otros generadores de residuos pueden enfrentar dificultades para:

- Identificar correctamente un residuo.
- Saber cómo separarlo o almacenarlo.
- Encontrar un gestor adecuado.
- Conocer costos aproximados de gestión.
- Hacer seguimiento al proceso.
- Mantener evidencia del destino final.

Kiri IA busca centralizar ese proceso en una experiencia digital más clara y accesible.

---

## ✨ ¿Qué hace la aplicación?

### 🤖 Identificación asistida

El usuario describe el residuo con sus propias palabras y **Solicitud IA** lo orienta hacia una categoría utilizando el diccionario interno de Kiri.

La plataforma muestra información general sobre manejo y clasificación.

### 🚚 Conexión con gestores

Permite relacionar solicitudes con gestores según:

- Zona
- Categoría del residuo
- Cobertura
- Tarifas

### 📦 Inventario

Los usuarios pueden mantener un registro de los residuos asociados a su operación.

### 🔎 Seguimiento y trazabilidad

Permite consultar el estado del proceso y conservar información relacionada con la gestión realizada.

### 📊 Analítica

Incluye visualizaciones para facilitar el seguimiento de información operativa.

---

## 👥 Roles

| Rol | ¿Qué puede hacer? |
| --- | --- |
| 👤 **Cliente** | Gestionar residuos, consultar inventario, seguimiento y analítica |
| 🚛 **Gestor** | Configurar rutas, zonas, categorías y tarifas |
| ⚙️ **Administrador** | Supervisar métricas, usuarios y solicitudes de la operación |

---

## 🧠 Asistencia inteligente

Cuando el usuario no conoce la clasificación de un residuo, puede utilizar **Solicitud IA** para recibir orientación basada en el diccionario de residuos de Kiri.

La lógica de clasificación está diseñada como una herramienta de apoyo y no como sustituto de una evaluación especializada.

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

### Datos

- Persistencia local mediante **localStorage**
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
