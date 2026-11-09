import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "@/components/home";
import { readFlowerUrl } from "@/lib/flower-url";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const readUrl = async (searchParams: PageProps["searchParams"]) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    const first = Array.isArray(value) ? value[0] : value;
    if (first !== undefined) query.set(key, first);
  }
  return readFlowerUrl(query.toString());
};

/* uma flor (ou opção) que não existe na URL cai na 404, com o título dela */
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const url = await readUrl(searchParams);
  return url.status === "invalid"
    ? { title: "Página não encontrada · Mimoflor" }
    : {};
}

export default async function Page({ searchParams }: PageProps) {
  const url = await readUrl(searchParams);
  if (url.status === "invalid") notFound();

  return <Home url={url} />;
}
