import { describe, it, expect } from "vitest";
import { createQuiz } from "./quiz.js";
import { ROLES, ABSTRACT_ROLES } from "./roles.js";

describe("ROLES の定義", () => {
  it("重複のないロール一覧である", () => {
    expect(new Set(ROLES).size).toBe(ROLES.length);
  });

  it("すべて小文字のロール名である", () => {
    for (const role of ROLES) {
      expect(role).toMatch(/^[a-z]+$/);
    }
  });

  it("abstract ロールは含まない", () => {
    for (const role of ABSTRACT_ROLES) {
      expect(ROLES).not.toContain(role);
    }
  });
});

describe("ABSTRACT_ROLES の定義", () => {
  it("重複のないロール一覧である", () => {
    expect(new Set(ABSTRACT_ROLES).size).toBe(ABSTRACT_ROLES.length);
  });

  it("すべて小文字のロール名である", () => {
    for (const role of ABSTRACT_ROLES) {
      expect(role).toMatch(/^[a-z]+$/);
    }
  });
});

describe("createQuiz と組み合わせた場合", () => {
  it("ROLES に含まれるロールは正解として判定される", () => {
    const quiz = createQuiz({ items: ROLES, abstractItems: ABSTRACT_ROLES });
    expect(quiz.guess("button")).toEqual({ status: "correct", item: "button" });
  });

  it("abstract ロールは abstract として判定され、正解にはならない", () => {
    const quiz = createQuiz({ items: ROLES, abstractItems: ABSTRACT_ROLES });
    expect(quiz.guess("widget")).toEqual({ status: "abstract", item: "widget" });
  });

  it("仕様に存在しないロールは unknown として判定される", () => {
    const quiz = createQuiz({ items: ROLES, abstractItems: ABSTRACT_ROLES });
    expect(quiz.guess("footer")).toEqual({ status: "unknown", item: "footer" });
  });
});
