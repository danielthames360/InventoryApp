import nav from "./nav.js";

const translation = {
  es: {
    dashboard: {
      title: "Inventario",
      ...nav['es'],
    },
  },
  en: {
    dashboard: {
      title: "Inventory",
      ...nav['en'],
    },
  },
};

export default translation;
