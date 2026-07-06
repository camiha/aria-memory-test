import { describe, it, expect } from "vitest";
import { createQuiz } from "./quiz.js";
import { ROLES, ABSTRACT_ROLES } from "./roles.js";

describe("ROLES の定義", () => {
  it("abstract ロールを含まない 88 個のロールが重複なく定義されている", () => {
    expect(ROLES).toHaveLength(88);
    expect(new Set(ROLES).size).toBe(ROLES.length);
    for (const role of ROLES) {
      expect(ABSTRACT_ROLES).not.toContain(role);
    }
  });

  it("abstract ロールは 12 個定義されている", () => {
    expect(ABSTRACT_ROLES).toHaveLength(12);
    expect(new Set(ABSTRACT_ROLES).size).toBe(ABSTRACT_ROLES.length);
  });
});

describe("createQuiz", () => {
  const makeQuiz = () => createQuiz({ items: ROLES, abstractItems: ABSTRACT_ROLES });

  it("正しい項目を回答すると correct になり、残り数が 1 減る", () => {
    const quiz = makeQuiz();
    const result = quiz.guess("button");
    expect(result).toEqual({ status: "correct", item: "button" });
    expect(quiz.guessed).toEqual(["button"]);
    expect(quiz.remaining).toBe(ROLES.length - 1);
  });

  it("大文字や前後の空白を含む入力も同じ項目として受理する", () => {
    const quiz = makeQuiz();
    const result = quiz.guess("  TabPanel ");
    expect(result).toEqual({ status: "correct", item: "tabpanel" });
  });

  it("回答済みの項目は duplicate になり、正解数は変わらない", () => {
    const quiz = makeQuiz();
    quiz.guess("button");
    const result = quiz.guess("button");
    expect(result).toEqual({ status: "duplicate", item: "button" });
    expect(quiz.guessed).toEqual(["button"]);
  });

  it("仕様に存在しない名前は unknown になる", () => {
    const quiz = makeQuiz();
    const result = quiz.guess("blogroll");
    expect(result).toEqual({ status: "unknown", item: "blogroll" });
    expect(quiz.guessed).toEqual([]);
  });

  it("abstract の項目は対象外として abstract を返し、正解に数えない", () => {
    const quiz = makeQuiz();
    const result = quiz.guess("widget");
    expect(result).toEqual({ status: "abstract", item: "widget" });
    expect(quiz.guessed).toEqual([]);
  });

  it("空文字や空白のみの入力は empty になる", () => {
    const quiz = makeQuiz();
    expect(quiz.guess("").status).toBe("empty");
    expect(quiz.guess("   ").status).toBe("empty");
    expect(quiz.guessed).toEqual([]);
  });

  it("normalize オプションで入力を正規化してから判定する", () => {
    const quiz = createQuiz({
      items: ["aria-checked"],
      normalize: (value) => (value.startsWith("aria-") ? value : `aria-${value}`)
    });
    expect(quiz.guess("checked")).toEqual({ status: "correct", item: "aria-checked" });
    expect(quiz.guess("aria-checked").status).toBe("duplicate");
  });

  it("全項目を回答すると isComplete が true になる", () => {
    const quiz = makeQuiz();
    expect(quiz.isComplete).toBe(false);
    for (const role of ROLES) {
      quiz.guess(role);
    }
    expect(quiz.isComplete).toBe(true);
    expect(quiz.remaining).toBe(0);
  });
});
