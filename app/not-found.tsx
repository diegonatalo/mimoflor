import type { Metadata } from "next";
import { NotFoundScreen } from "@/components/not-found-screen";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <NotFoundScreen
      title="Esta flor ainda não brotou"
      text="O endereço pode estar incompleto, ou a flor foi plantada em outro canteiro."
    />
  );
}
