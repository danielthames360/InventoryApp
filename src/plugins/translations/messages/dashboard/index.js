import nav from "./nav.js";

const translation = {
  es: {
    dashboard: {
      title: "INVENTARIO",
      text: "Todo listo para continuar...",
      ...nav["es"],
    },
  },
  en: {
    dashboard: {
      title: "INVENTORY",
      text: "Everything ready to continue...",
      ...nav["en"],
    },
  },
};
console.log(translation);
export default translation;
