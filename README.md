# Frontend para publicar anuncios en SemiNuevos.com

> ⚠️ **Advertencia:** Antes de iniciar el proyecto, asegúrate de que la API del backend esté en ejecución y accesible en:
>
> - `http://localhost:3333/api/publish`

**🚀 Empezando**

  1. Instala las dependencias:
     ```bash
     npm install
     ```
  2. Inicia el servidor de desarrollo:
     ```bash
     npm run dev
     ```
  3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**📂 Estructura del Proyecto**

  - Rutas de API:

    - `/src/app/api/posts/route.ts` — Redirige solicitudes POST al backend:

      ```ts
      import { NextRequest, NextResponse } from "next/server";

      export async function POST(req: NextRequest) {
        // Implementación del proxy mostrada en el código original
      }
      ```

**🔍 Más Información**
- Proyecto Next.js creado con [create-next-app](https://nextjs.org/).
  - Tecnologías clave:
    - Next.js App Router
    - TypeScript
    - MUI (Material-UI)
    - Tailwind CSS
    - Turbopack

## Evidencias de funcionalidad
<img width="1384" alt="Screenshot 2025-05-14 at 12 20 19 a m" src="https://github.com/user-attachments/assets/b3bb2a63-7126-4fec-abf9-b744d4a25aee" />
<img width="1384" alt="Screenshot 2025-05-14 at 12 20 33 a m" src="https://github.com/user-attachments/assets/b5f59161-5c8c-4452-beea-d85924bf3630" />
<img width="1383" alt="Screenshot 2025-05-14 at 12 22 32 a m" src="https://github.com/user-attachments/assets/62ce0c73-64a2-475d-96e1-718dc877c284" />



