import type { Metadata } from "next";
import { Creator } from "@/components/creator/creator";

export const metadata: Metadata = {
  title: "Criar uma flor",
  description: "Escolha a flor, escreva para quem é e, se quiser, um bilhete surpresa. O link sai curto e cifrado.",
  alternates: { canonical: "/app" },
};

export default function AppPage() {
  return <Creator />;
}
