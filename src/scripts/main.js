import "../style.css";
import { setupThemeToggle } from "./theme.js";
import { setupQuizPage } from "./quiz-page.js";
import { ROLES, ABSTRACT_ROLES } from "./roles.js";
import { ATTRIBUTES, normalizeAttribute } from "./attributes.js";

// 全ページ共通の単一バンドル。どのクイズを起動するかは body の data-page で分岐する
const page = document.body.dataset.page;

if (page === "roles") {
  setupQuizPage({
    items: ROLES,
    abstractItems: ABSTRACT_ROLES,
    messages: {
      correct: (item, remaining) => `“${item}” is correct. ${remaining} to go.`,
      duplicate: (item) => `You already recalled “${item}”.`,
      abstract: (item) => `“${item}” is an abstract role — authors must not use it.`,
      unknown: (item) => `“${item}” is not a role in WAI-ARIA 1.3.`,
      complete: (total) => `You recalled all ${total} roles. Congratulations!`
    }
  });
} else if (page === "attributes") {
  setupQuizPage({
    items: ATTRIBUTES,
    normalize: normalizeAttribute,
    messages: {
      correct: (item, remaining) => `“${item}” is correct. ${remaining} to go.`,
      duplicate: (item) => `You already recalled “${item}”.`,
      unknown: (item) => `“${item}” is not an aria-* attribute in WAI-ARIA 1.3.`,
      complete: (total) => `You recalled all ${total} attributes. Congratulations!`
    }
  });
} else {
  setupThemeToggle(document.querySelector("#theme-toggle"));
}
