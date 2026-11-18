"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Stage } from "@/components/stage";

type ErrorScreenProps = {
  error: unknown;
  retry: () => void;
};

export const ErrorScreen = ({ error, retry }: ErrorScreenProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Stage theme="lost">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <h1 className="message font-allura text-4xl sm:text-6xl leading-tight px-2 pb-1">
          Algo murchou por aqui
        </h1>
        <p className="text-base sm:text-lg italic text-stone-600 dark:text-white/55">
          Esta página encontrou um erro inesperado.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => retry()} className="pill-link cursor-pointer">
          Tentar de novo
        </button>
        <Link href="/" className="pill-link">
          Voltar ao jardim
        </Link>
      </div>
    </Stage>
  );
};
