import { createI18n } from 'vue-i18n'
import en from '@/locals/en.json'
import gu from '@/locals/gu.json'
export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',

  messages: {
    en,
    gu
  },

  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    in: {
      currency: {
        style: 'currency',
        currency: 'INR'
      }
    }
  }
})
