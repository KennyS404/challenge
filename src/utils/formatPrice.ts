export function formatPrice(price: number | bigint, language: string | string[] | undefined) {
    const currency = language === 'en' ? 'USD' : 'BRL';
    return new Intl.NumberFormat(language, { style: 'currency', currency }).format(price);
  }
  