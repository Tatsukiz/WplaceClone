# WplaceClone

[🇯🇵 日本語](./README.ja.md) | [🇺🇸 English](./README.en.md)

This project is a clone application of **Wplace**, built with [OpenFreeMap](https://openfreemap.org/) and [MapLibre GL JS](https://maplibre.org/).  
It allows you to click on the map to color individual grid cells.  
Using `localStorage`, the map’s last viewed position and your painted colors are saved in the browser.

## Features

- **Map display**: Render maps with OpenFreeMap (Liberty style)
- **Coloring**: Snap the clicked position to a grid (~55m square) and fill with the selected color
- **Eraser**: Remove colored cells by clicking them
- **Color palette**: Choose a color before clicking to apply it
- **State persistence**:
  - Map center coordinates and zoom level
  - Selected color
  - Painted cell data
- **Batch redraw**: Reduce rendering load when clicking repeatedly
- **Missing icon handling**: Replace missing icons in the style with transparent pixels

## Directory structure

```

project-root/
├── index.html        # HTML entry point
├── style.css         # Stylesheet
├── js/
│   ├── config.js     # Configuration values
│   ├── utils.js      # Utility functions
│   ├── geo.js        # Grid calculation and GeoJSON generation
│   ├── state.js      # Application state management
│   ├── storage.js    # localStorage read/write
│   ├── palette.js    # Color palette UI control
│   ├── map.js        # MapLibre initialization and event handling
│   └── main.js       # Entry point
└── README.md

```

## How to run

1. **Clone or download the repository**

```bash
git clone <repository-url>
cd <project-directory>
```

2. **Start a local server**

If you have Python 3 installed, you can run:

```bash
python3 -m http.server 8080
```

3. **Open in a browser**

Go to the following URL:

```bash
http://localhost:8080/
```

4. **Usage**

- Select a color from the palette at the bottom-left
- Click on the map to paint a cell
- Switch to eraser mode by clicking the "⌫" button → Click to remove a cell
- Reloading the page will restore the painted cells and the last viewed map position

## Notes

- Opening the project directly via `file://` may cause issues with loading map sprites or tiles.
  Always access it through an HTTP server.
- Clearing your browser’s `localStorage` will erase all saved data.
- Please comply with the usage terms of the OpenFreeMap tile server.

## License

This project is licensed under the MIT License.
Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).
