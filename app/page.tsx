import { notFound } from "next/navigation";
import { Home } from "@/components/home";
import { readFlowerUrl } from "@/lib/flower-url";

// A flor vem da query string, então a página é gerada a cada visita (não há versão estática).
export const instant = false;

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

/* uma flor (ou opção) que não existe na URL cai na 404; o título vem do not-found.tsx */
export default async function Page({ searchParams }: PageProps) {
  const url = await readUrl(searchParams);
  if (url.status === "invalid") notFound();

  return <Home url={url} />;
}
