import errorMessages from "./errorMessages.js";

const translation = {
  es: {
    auth: {
      ...errorMessages["es"],
      title: "App de inventario",
      name: "Nombre",
      namePlaceholder: "Ingresa tu nombre",
      email: "Correo",
      emailPlaceholder: "Ingresa tu correo",
      password: "Contraseña",
      passwordPlaceholder: "Elige una contraseña segura",
      passwordPlaceholderLogin: "Ingresa tu contraseña",
      alreadyAccount: `Ya tienes una cuenta?`,
      noAccount: `No tienes una cuenta?`,
      logIn: `Inicia sesión`,
      signUp: `Registrate`,
      authMessage: "con alguna de las siguientes opciones.",
      logInButton: "Iniciar sesión",
      signInButton: "Crear cuenta",
      signInGoogleButton: "con Google",
      signInFacebookButton: "con Facebook",
    },
  },
  en: {
    auth: {
      ...errorMessages["en"],
      title: "Inventory App",
      name: "Name",
      namePlaceholder: "Enter you name",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Pick a strong password",
      passwordPlaceholderLogin: "Enter your password",
      alreadyAccount: `Already have an account?`,
      noAccount: `Don't have an account?`,
      logIn: `Log in`,
      signUp: `Sign up`,
      authMessage: "with one of these options.",
      logInButton: "Log in",
      signInButton: "Create Account",
      signInGoogleButton: "with Google",
      signInFacebookButton: "with Facebook",
    },
  },
};
export default translation;
