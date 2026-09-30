# Web Tolén — Centro de Psicomotricidad (Gijón)

Sitio estático (Astro) con una sección de eventos autogestionable por el cliente vía Decap CMS.

## Estructura

```text
/
├── public/
│   └── admin/            # Decap CMS (formulario para publicar/despublicar eventos)
├── src/
│   ├── content/events/   # Un archivo .md + imagen por evento
│   ├── content.config.ts # Schema de la colección "events"
│   ├── pages/eventos.astro
│   └── site.config.ts    # Número de WhatsApp y helper de enlace
├── netlify/functions/    # Rebuild diario programado (auto-caducidad de eventos)
└── netlify.toml
```

## Comandos

| Comando           | Acción                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Instala dependencias                          |
| `npm run dev`       | Servidor local en `localhost:4321`            |
| `npm run build`     | Genera el sitio en `./dist/`                  |
| `npm run preview`   | Previsualiza el build localmente              |

## Puesta en marcha (pasos manuales, una sola vez)

Estos pasos requieren cuentas propias (GitHub/Netlify) y no se pueden automatizar desde aquí:

1. **Número de WhatsApp real:** editar `src/site.config.ts` y sustituir `WHATSAPP_NUMBER` por el número del centro.
2. **Subir el repo a GitHub** y actualizar `repo: TODO/TODO` en `public/admin/config.yml` con `usuario-u-org/nombre-repo`.
3. **Conectar el repo a Netlify** (nuevo sitio desde Git), build command `npm run build`, publish directory `dist`.
4. **Registrar una GitHub OAuth App para Decap CMS:** en GitHub → Settings → Developer settings → OAuth Apps → New OAuth App, con "Authorization callback URL" = `https://api.netlify.com/auth/done`. Copiar el Client ID y Client Secret generados y pegarlos en Netlify: Project configuration → Security → OAuth → Install provider (elegir GitHub). Esto permite que el cliente inicie sesión en `/admin` con su cuenta de GitHub sin que montemos backend propio.
   - Ojo con el Client ID: el prefijo nuevo de GitHub es `Ov23li...` (letra O mayúscula), fácil de confundir visualmente con un cero.
5. **Build hook para el rebuild diario:** en Netlify, Site settings → Build & deploy → Build hooks → crear uno (ej. "rebuild-diario") y copiar la URL.
6. **Variable de entorno `BUILD_HOOK_URL`:** en Netlify, Site settings → Environment variables, añadir `BUILD_HOOK_URL` con la URL del paso anterior. Esto hace que `netlify/functions/rebuild-diario.ts` reconstruya el sitio cada día a las 04:00 UTC y oculte los eventos ya pasados sin que el cliente tenga que hacer nada.
7. **Acceso del cliente al CMS:** el cliente entra a `tudominio.com/admin`, inicia sesión con una cuenta de GitHub (crear una para el cliente si no tiene) y gestiona eventos desde ahí — publicar/despublicar es marcar o desmarcar la casilla "Publicado".

## Verificación end-to-end

1. Crear un evento de prueba desde `/admin`, guardar y confirmar que aparece en `/eventos` tras el deploy.
2. Desmarcar "Publicado" y confirmar que desaparece.
3. Crear uno con fecha pasada y `publicado: true`; disparar el build hook manualmente (o esperar al cron diario) y confirmar que se oculta solo.
