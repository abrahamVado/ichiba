//1.- Activar la configuración estricta propuesta por Next.js para el proyecto.
module.exports = {
  extends: ["next", "next/core-web-vitals"],
  //2.- Ignorar carpetas generadas automáticamente durante el build.
  ignorePatterns: ["node_modules", ".next"],
  //3.- Ajustar reglas específicas utilizadas en los componentes del demo.
  rules: {
    "react/jsx-no-useless-fragment": "off",
    "@next/next/no-img-element": "off"
  }
};
