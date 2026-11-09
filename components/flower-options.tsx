import { useState, type CSSProperties } from "react";
import type { OptionGroup, Selection } from "./flowers/registry";

/* Momento (em segundos desde que a página abriu) em que o seletor de flores
   termina de aparecer, ver `.fade-in` em index.css. As opções entram logo
   depois dele. */
const PICKER_VISIBLE_AT = 5.2;

type FlowerOptionsProps = {
  groups: OptionGroup[];
  selection: Selection;
  onChange: (groupId: string, value: string) => void;
};

/** Segunda fileira do seletor: variações da flor escolhida (ex.: tipo e cor da rosa). */
export const FlowerOptions = ({
  groups,
  selection,
  onChange,
}: FlowerOptionsProps) => {
  /* Na abertura da página, espera o seletor. Se a pessoa chegar na rosa
     depois, a fileira aparece na hora. Calculado uma vez, ao montar. */
  const [delay] = useState(() =>
    Math.max(0, PICKER_VISIBLE_AT - performance.now() / 1000),
  );

  return (
    <div className="options" style={{ animationDelay: `${delay}s` }}>
      {groups.map((group) => (
        <div
          key={group.id}
          role="radiogroup"
          aria-label={group.label}
          className="option-group"
        >
          {group.choices.map((choice) => (
            <button
              key={choice.value}
              type="button"
              role="radio"
              aria-checked={selection[group.id] === choice.value}
              aria-label={choice.label}
              title={choice.label}
              onClick={() => onChange(group.id, choice.value)}
              className="option-item"
            >
              {choice.swatch ? (
                <span
                  className="option-swatch"
                  style={{ "--dot": choice.swatch } as CSSProperties}
                />
              ) : (
                choice.label
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
