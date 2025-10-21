import type { Metadata } from "next";
import "./globals.css";
import { PageLoader } from "../components/PageLoader";

//1.- Definir metadatos compartidos para todas las pantallas del demo.
export const metadata: Metadata = {
  title: "Demo Red TOSUR",
  description: "Recorrido navegable por las pantallas del prototipo Red TOSUR"
};

//2.- Estructurar el layout raíz que aplica estilos globales y renderiza el contenido dinámico.
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  //3.- Entregar la estructura HTML base con idioma en español y cuerpo estilizado.
  return (
    <html lang="es">
      <body>
        {/* //4.- Insertar un overlay negro reutilizable que oculta el contenido hasta que carguen los estilos e imágenes. */}
        <PageLoader />
        {/* //5.- Renderizar el contenido específico de cada flujo una vez que el loader se retire. */}
        {children}
      </body>
    </html>
  );
}
