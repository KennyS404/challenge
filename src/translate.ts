
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "menu": "Menu",
      "contact": "Contact",
      "login": "Login",
      "cart": "Cart",
      "addToOrder":"Add to order",
      "chooseYourSize": "Choose your size",
      
    }
  },
  pt: {
    translation: {
      "menu": "Menu",
      "contact": "Contato",
      "login": "Entrar",
      "cart": "Carrinho",
      "addToOrder": "Adicionar ao carrinho",
      "chooseYourSize": "Escolha o tamanho",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', 
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;
