import { CONFIG } from "./config.js";
import { State } from "./state.js";
import { snapToGrid, gridKey, buildGeoJSONFromCells } from "./geo.js";
import { setupPalette, markActivePaletteButton } from "./palette.js";
import {
  loadInitialView,
  loadCells,
  persistCells,
  persistView,
  loadColor,
} from "./storage.js";

export function initMap() {
  const { center, zoom } = loadInitialView();
  State.coloredCells = loadCells();
  State.currentColor = loadColor();

  State.map = new maplibregl.Map({
    style: CONFIG.styleUrl,
    center,
    zoom,
    container: "map",
  });

  State.map.addControl(
    new maplibregl.NavigationControl({ showCompass: false }),
    "top-right"
  );
  State.map.addControl(new maplibregl.FullscreenControl(), "top-right");

  State.map.on("moveend", persistView);

  State.map.on("load", () => {
    State.map.addSource(CONFIG.sourceId, {
      type: "geojson",
      data: buildGeoJSONFromCells(State.coloredCells),
    });

    State.map.addLayer({
      id: CONFIG.layerId,
      type: "fill",
      source: CONFIG.sourceId,
      paint: {
        // 値欠損時のフォールバックを入れて堅牢化
        "fill-color": [
          "case",
          ["has", "color"],
          ["to-color", ["get", "color"]],
          "#ff0000",
        ],
        "fill-opacity": 0.9,
      },
    });

    // 初期選択中のパレット表示
    markActivePaletteButton(State.currentColor);
  });

  State.map.on("click", (e) => {
    const [lon, lat] = e.lngLat.toArray();
    const slon = snapToGrid(lon, CONFIG.cellSizeDeg);
    const slat = snapToGrid(lat, CONFIG.cellSizeDeg);
    const key = gridKey(slon, slat);

    if (State.currentColor === "__eraser__") {
      delete State.coloredCells[key];
    } else {
      State.coloredCells[key] = State.currentColor;
    }

    persistCells();
    requestUpdate();
  });

  // 欠損アイコンを握りつぶす（必要なら）
  State.map.on("styleimagemissing", (e) => {
    if (State.map.hasImage(e.id)) return;
    const data = new Uint8Array(4); // 透明1px
    State.map.addImage(e.id, { width: 1, height: 1, data });
  });

  setupPalette();
}

function requestUpdate() {
  if (!CONFIG.rAFBatch) {
    updateSource();
    return;
  }
  if (State._updateScheduled) return;
  State._updateScheduled = true;
  requestAnimationFrame(() => {
    updateSource();
    State._updateScheduled = false;
  });
}

function updateSource() {
  const src = State.map.getSource(CONFIG.sourceId);
  if (!src) return;
  src.setData(buildGeoJSONFromCells(State.coloredCells));
}
