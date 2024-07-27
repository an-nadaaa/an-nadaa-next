import colors from 'tailwindcss/colors'

export default defineAppConfig({
  siteName: 'An-Nadaa – Educate Empower Improve',
  siteDescription:
    'An-Nadaa Educational Foundation is an Islamic non-profit organization actively involved in launching and managing educational, da’wah, and welfare projects across underprivileged communities in Nigeria.',
  contact: 'contact@an-nadaa.com',
  siteLang: 'en',
  colorModeFallback: 'dark', // should replace COLOR_MODE_FALLBACK
  currencySymbol: '$', // should replace CURRENCY_SYMBOL
  currencyName: 'USD', // should replace CURRENCY_NAME
  primaryColor: colors.cyan,
})
