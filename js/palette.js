import { CONFIG } from "./config.js";
import { State } from "./state.js";
import { persistColor } from "./storage.js";

export function setupPalette() {
  const el = document.querySelector(CONFIG.paletteSelector);
  if (!el) return;

  const buttons = el.querySelectorAll("button[data-color]");
  buttons.forEach((btn) => {
    const color = btn.dataset.color;
    if (color !== "__eraser__") btn.style.background = color;
    btn.addEventListener("click", () => {
      State.currentColor = color;
      persistColor(color);
      markActivePaletteButton(color);
    });
  });

  // 初期状態のハイライト
  markActivePaletteButton(State.currentColor);
}

export function markActivePaletteButton(color) {
  const el = document.querySelector(CONFIG.paletteSelector);
  if (!el) return;
  el.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
  const active = el.querySelector(`button[data-color="${CSS.escape(color)}"]`);
  if (active) active.classList.add("is-active");
}
