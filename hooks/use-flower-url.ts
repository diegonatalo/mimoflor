import { useCallback } from "react";
import type { FlowerType, Selection } from "@/components/flowers/registry";
import { flowerSearch } from "@/lib/flower-url";

/** Escreve a flor e as opções escolhidas na URL, sem criar entrada no histórico. */
export const useFlowerUrl = () =>
  useCallback((flower: FlowerType, selection: Selection) => {
    window.history.replaceState(null, "", `${window.location.pathname}${flowerSearch(flower, selection)}`);
  }, []);
