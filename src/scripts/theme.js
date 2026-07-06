const STORAGE_KEY = "theme";

// 初期テーマの反映は各ページ <head> のインラインスクリプトが行う
// （モジュール読み込みを待つと描画後に切り替わってちらつくため）。
export function setupThemeToggle(button) {
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === "dark" : media.matches;

  const render = () => {
    button.setAttribute("aria-pressed", String(isDark()));
  };

  button.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // プライベートモードなどで保存できなくても切り替え自体は有効
    }
    render();
  });

  media.addEventListener("change", render);
  render();
}
