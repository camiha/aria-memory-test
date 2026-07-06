import { describe, it, expect } from "vitest";
import { createQuiz } from "./quiz.js";
import { ATTRIBUTES, normalizeAttribute } from "./attributes.js";

describe("ATTRIBUTES の定義", () => {
  it("53 個の aria-* 属性が重複なく定義されている", () => {
    expect(ATTRIBUTES).toHaveLength(53);
    expect(new Set(ATTRIBUTES).size).toBe(ATTRIBUTES.length);
  });

  it("すべて aria- で始まる小文字の属性名である", () => {
    for (const attribute of ATTRIBUTES) {
      expect(attribute).toMatch(/^aria-[a-z]+$/);
    }
  });

  it("deprecated の aria-dropeffect と aria-grabbed も仕様の定義として含む", () => {
    expect(ATTRIBUTES).toContain("aria-dropeffect");
    expect(ATTRIBUTES).toContain("aria-grabbed");
  });
});

describe("normalizeAttribute", () => {
  it("aria- なしの入力に aria- を補う", () => {
    expect(normalizeAttribute("checked")).toBe("aria-checked");
  });

  it("aria- 付きの入力はそのまま返す", () => {
    expect(normalizeAttribute("aria-checked")).toBe("aria-checked");
  });

  it("createQuiz と組み合わせると、aria- の有無にかかわらず同じ属性として判定する", () => {
    const quiz = createQuiz({ items: ATTRIBUTES, normalize: normalizeAttribute });
    expect(quiz.guess("labelledby")).toEqual({ status: "correct", item: "aria-labelledby" });
    expect(quiz.guess("ARIA-LabelledBy").status).toBe("duplicate");
    expect(quiz.guess("blogroll").status).toBe("unknown");
  });
});
