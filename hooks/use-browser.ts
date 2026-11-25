import { useSyncExternalStore } from "react";

/*
 * Leituras do navegador que não existem no servidor. Cada uma devolve um valor
 * neutro na renderização do servidor e o valor real logo depois da hidratação.
 */

const noop = () => () => {};

const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};

/** O que vem depois do `#` na URL (a chave da flor), sem o `#`. */
export const useLocationHash = () =>
  useSyncExternalStore(
    subscribeHash,
    () => window.location.hash.slice(1),
    () => "",
  );

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeMotion = (onChange: () => void) => {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/** A pessoa pediu menos movimento no sistema. */
export const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

/** O navegador tem a folha de compartilhar do sistema (`navigator.share`). */
export const useCanShare = () =>
  useSyncExternalStore(
    noop,
    () => typeof navigator.share === "function",
    () => false,
  );

