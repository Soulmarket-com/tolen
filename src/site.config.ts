// TODO: número de pruebas, sustituir por el número real del centro antes de publicar
export const WHATSAPP_NUMBER = '34625030452';

export function whatsappLink(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
