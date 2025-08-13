export const CONFIG = {
  defaultCenter: [13.388, 52.517],
  defaultZoom: 9.5,
  styleUrl: "https://tiles.openfreemap.org/styles/liberty",
  // 小さいほど細かく塗れる（度）。0.0005 ≒ 約55m
  cellSizeDeg: 0.0005,
  ls: {
    center: "mapCenter",
    zoom: "mapZoom",
    cells: "coloredCells",
    color: "selectedColor",
  },
  paletteSelector: "#palette",
  sourceId: "paint-cells",
  layerId: "paint-cells-fill",
  rAFBatch: true, // クリック連打時に再描画を1フレームへバッチ
};
