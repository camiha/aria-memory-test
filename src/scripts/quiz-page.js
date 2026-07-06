import { createQuiz } from "./quiz.js";
import { setupThemeToggle } from "./theme.js";

export function setupQuizPage({ items, abstractItems, normalize, messages }) {
  setupThemeToggle(document.querySelector("#theme-toggle"));

  const quiz = createQuiz({ items, abstractItems, normalize });

  const form = document.querySelector("#form");
  const input = document.querySelector("#guess");
  const button = form.querySelector("button");
  const feedback = document.querySelector("#feedback");
  const guessedList = document.querySelector("#guessed");
  const progress = document.querySelector("progress");
  const countEl = document.querySelector("[data-count]");
  const remainEl = document.querySelector("[data-remain]");

  for (const el of document.querySelectorAll("[data-total]")) {
    el.textContent = quiz.total;
  }
  progress.max = quiz.total;

  function messageFor(result) {
    const render = messages[result.status];
    return render ? render(result.item, quiz.remaining) : "";
  }

  function renderScore() {
    const count = quiz.total - quiz.remaining;
    countEl.textContent = count;
    remainEl.textContent = quiz.remaining;
    progress.value = count;
  }

  // ライブリージョンの div は空のまま保ち、メッセージは配下の p として入れ替える
  function renderFeedback(text) {
    feedback.replaceChildren();
    if (text) {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      feedback.append(paragraph);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = quiz.guess(input.value);

    if (result.status === "correct") {
      const item = document.createElement("li");
      item.textContent = result.item;
      guessedList.append(item);
      input.value = "";
      renderScore();
    }

    renderFeedback(messageFor(result));

    if (quiz.isComplete) {
      renderFeedback(messages.complete(quiz.total));
      input.disabled = true;
      button.disabled = true;
      // disabled でフォーカスが body に落ちるのを防ぎ、完了を読み上げさせる
      feedback.focus();
      return;
    }

    input.focus();
  });
}
