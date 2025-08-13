import { CONFIG } from "./config.js";
import { State } from "./state.js";
import { safeJsonParse, safeLocalGet, safeLocalSet } from "./utils.js";

export const loadInitialView = () => {
  let center = CONFIG.defaultCenter;
  let zoom = CONFIG.defaultZoom;
  const savedCenter = safeLocalGet(CONFIG.ls.center, null);
  const savedZoom = safeLocalGet(CONFIG.ls.zoom, null);
  if (savedCenter) center = safeJsonParse(savedCenter, CONFIG.defaultCenter);
  if (savedZoom) zoom = parseFloat(savedZoom) || CONFIG.defaultZoom;
  return { center, zoom };
};

export const loadCells = () => {
  const raw = safeLocalGet(CONFIG.ls.cells, null);
  return raw ? safeJsonParse(raw, {}) : {};
};

export const persistCells = () => {
  safeLocalSet(CONFIG.ls.cells, JSON.stringify(State.coloredCells));
};

export const persistView = () => {
  const c = State.map.getCenter().toArray();
  safeLocalSet(CONFIG.ls.center, JSON.stringify(c));
  safeLocalSet(CONFIG.ls.zoom, String(State.map.getZoom()));
};

export const loadColor = () => safeLocalGet(CONFIG.ls.color, "#ff0000");
export const persistColor = (color) => safeLocalSet(CONFIG.ls.color, color);
