import type { Config } from '@netlify/functions';

// Dispara un rebuild diario para que los eventos con fecha pasada
// dejen de mostrarse aunque el cliente no haya tocado el CMS.
export default async () => {
  const hookUrl = process.env.BUILD_HOOK_URL;
  if (!hookUrl) {
    console.error('Falta la variable de entorno BUILD_HOOK_URL');
    return;
  }
  await fetch(hookUrl, { method: 'POST' });
};

export const config: Config = {
  schedule: '0 4 * * *',
};
