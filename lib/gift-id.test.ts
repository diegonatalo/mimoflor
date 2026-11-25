import { describe, expect, it } from "vitest";
import { GIFT_ID_LENGTH, isGiftId, newGiftId } from "@/lib/gift-id";

describe("newGiftId", () => {
  it("gera códigos curtos, só com letras e números", () => {
    const id = newGiftId();
    expect(id).toHaveLength(GIFT_ID_LENGTH);
    expect(isGiftId(id)).toBe(true);
  });

  it("não repete", () => {
    const ids = new Set(Array.from({ length: 500 }, newGiftId));
    expect(ids.size).toBe(500);
  });
});

describe("isGiftId", () => {
  it.each(["", "abc", "abcdefghij1", "abcde-ghij", "abcdé fghi", 42, null])("recusa %s", (value) => {
    expect(isGiftId(value)).toBe(false);
  });
});
