import { CONFIG } from "./config.js";

// cellSizeDeg の小数桁数を自動判定（キー安定化に使用）
const DECIMALS = (() => {
  const s = String(CONFIG.cellSizeDeg);
  const dot = s.indexOf(".");
  return dot >= 0 ? s.length - dot - 1 : 0;
})();

export const toFixedDeg = (value) => Number(value.toFixed(DECIMALS));

export const snapToGrid = (value, cell) => {
  // 例: 135.12349 -> 135.123（cell=0.001）
  const snapped = Math.floor(value / cell) * cell;
  return toFixedDeg(snapped);
};

export const gridKey = (lon, lat) => `${toFixedDeg(lon)}_${toFixedDeg(lat)}`;

export const cellFeature = (lon, lat, color) => {
  const x1 = toFixedDeg(lon);
  const y1 = toFixedDeg(lat);
  const x2 = toFixedDeg(lon + CONFIG.cellSizeDeg);
  const y2 = toFixedDeg(lat + CONFIG.cellSizeDeg);
  return {
    type: "Feature",
    properties: { color },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [x1, y1],
          [x2, y1],
          [x2, y2],
          [x1, y2],
          [x1, y1],
        ],
      ],
    },
  };
};

export const buildGeoJSONFromCells = (cells) => {
  const features = [];
  for (const [key, color] of Object.entries(cells)) {
    const [lonStr, latStr] = key.split("_");
    const lon = Number(lonStr);
    const lat = Number(latStr);
    features.push(cellFeature(lon, lat, color));
  }
  return { type: "FeatureCollection", features };
};
