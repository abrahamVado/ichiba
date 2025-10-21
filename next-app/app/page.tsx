import { redirect } from "next/navigation";

//1.- Redirigir inmediatamente al punto de entrada del flujo principal.
export default function HomePage() {
  //2.- Garantizar que la experiencia inicie en la pantalla de acceso.
  redirect("/login-oscuro");
}
