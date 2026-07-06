export function createQuiz({ items, abstractItems = [], normalize = (value) => value }) {
  const guessed = [];

  return {
    get guessed() {
      return [...guessed];
    },
    get total() {
      return items.length;
    },
    get remaining() {
      return items.length - guessed.length;
    },
    get isComplete() {
      return guessed.length === items.length;
    },
    guess(rawInput) {
      const trimmed = String(rawInput ?? "").trim().toLowerCase();
      if (!trimmed) {
        return { status: "empty", item: trimmed };
      }
      const item = normalize(trimmed);
      if (guessed.includes(item)) {
        return { status: "duplicate", item };
      }
      if (abstractItems.includes(item)) {
        return { status: "abstract", item };
      }
      if (!items.includes(item)) {
        return { status: "unknown", item };
      }
      guessed.push(item);
      return { status: "correct", item };
    }
  };
}
