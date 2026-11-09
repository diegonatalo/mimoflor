import type { CSSProperties } from "react";
import { FLOWERS, type FlowerType } from "./flowers/registry";

type FlowerPickerProps = {
  value: FlowerType;
  onChange: (type: FlowerType) => void;
};

export const FlowerPicker = ({ value, onChange }: FlowerPickerProps) => {
  return (
    <div
      role="radiogroup"
      aria-label="Escolha uma flor"
      className="fade-in picker"
    >
      {(Object.keys(FLOWERS) as FlowerType[]).map((type) => (
        <button
          key={type}
          type="button"
          role="radio"
          aria-checked={type === value}
          aria-label={FLOWERS[type].name}
          onClick={() => onChange(type)}
          className="picker-item"
        >
          <span
            className="picker-dot"
            style={{ "--dot": FLOWERS[type].dot } as CSSProperties}
          />
          <span className="picker-label">
            <span>{FLOWERS[type].name}</span>
          </span>
        </button>
      ))}
    </div>
  );
};
