import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ReceivedGift } from "@/components/received/received-gift";
import { getSealedGift } from "@/lib/data/queries";

// Cada flor é lida do banco na hora: a página espera por ela.
export const instant = false;

// A prévia do link é sempre a mesma: nome e mensagem nunca aparecem fora da flor.
export const metadata: Metadata = {
  title: "Chegou uma flor pra você",
  description: "Alguém pensou em você hoje. Abra para ver a flor nascer.",
  robots: { index: false, follow: false },
  openGraph: { title: "Chegou uma flor pra você 🌸", description: "Alguém pensou em você hoje. Abra para ver a flor nascer." },
  twitter: { title: "Chegou uma flor pra você 🌸", description: "Alguém pensou em você hoje. Abra para ver a flor nascer." },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function ReceivedPage({ params }: PageProps) {
  const { id } = await params;
  // a consulta é sempre na hora do pedido (o driver lê o relógio)
  await connection();
  const sealed = await getSealedGift(id);
  if (!sealed) notFound();
  return <ReceivedGift sealed={sealed} />;
}
