// TODO: sustituir por el número real del centro (formato internacional, sin +, sin espacios)
export const WHATSAPP_NUMBER = '34600000000';

export function whatsappLink(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
