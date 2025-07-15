/**
 * Convierte una URL del CDN de Sanity en un nombre de archivo usable en el proxy
 */
export function getProxiedSanityImageUrl(cdnUrl: string): string {
  try {
    if (cdnUrl.includes('cdn.shopify.com')) {
        const parts = cdnUrl.split('cdn.shopify.com/')[1];
        return `/images/shopify/${parts}`;
    }
    if (cdnUrl.includes('cdn.sanity.io')) {
        const parts = cdnUrl.split('cdn.sanity.io/')[1];
        return `/images/sanity/${parts}`;
    }
    return cdnUrl;
  } catch {
    return cdnUrl; // fallback si falla el parseo
  }
}