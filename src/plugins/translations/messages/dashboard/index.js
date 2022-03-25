import nav from "./nav.js";

const translation = {
  es: {
    dashboard: {
      title: "INVENTARIO",
      ...nav['es'],
    },
  },
  en: {
    dashboard: {
      title: "INVENTORY",
      ...nav['en'],
    },
  },
};
console.log(translation);
export default translation;
