import React, { memo, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";

/**
 * WorldMap (react-simple-maps)
 * - Renderiza países reales (TopoJSON)
 * - Zoom/pan (ZoomableGroup)
 * - Marcadores (hubs)
 * - Líneas de conexión (arcos simples)
 *
 * Fuente mapa: world-atlas (TopoJSON)
 */
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = memo(function WorldMap({
  region = "global",
  hubs = [],
  connections = [],
  hoveredCountry = null,
  onHoverCountry = () => {},
}) {
  const regionView = useMemo(() => {
    // center: [lon, lat]
    // zoom: number
    const views = {
      global: { center: [0, 15], zoom: 1 },
      nam: { center: [-100, 40], zoom: 1.8 },
      sam: { center: [-60, -20], zoom: 1.9 },
      eur: { center: [15, 50], zoom: 2.3 },
      asia: { center: [90, 35], zoom: 1.9 },
      afr: { center: [20, 5], zoom: 2.0 },
      oce: { center: [140, -25], zoom: 2.4 },
    };
    return views[region] || views.global;
  }, [region]);

  const safeConnections = useMemo(() => {
    // Evitar duplicados exactos por si se repiten
    const seen = new Set();
    return connections.filter((c) => {
      const k = `${c.from?.[0]}:${c.from?.[1]}-${c.to?.[0]}:${c.to?.[1]}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [connections]);

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          center={regionView.center}
          zoom={regionView.zoom}
          minZoom={1}
          maxZoom={8}
          translateExtent={[
            [-1200, -800],
            [1200, 800],
          ]}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name =
                  geo?.properties?.name ||
                  geo?.properties?.NAME ||
                  geo?.properties?.ADMIN ||
                  "";
                const isHovered =
                  hoveredCountry && name && hoveredCountry === name;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => name && onHoverCountry(name)}
                    onMouseLeave={() => onHoverCountry(null)}
                    style={{
                      default: {
                        fill: isHovered ? "rgba(34,211,238,0.35)" : "rgba(255,255,255,0.10)",
                        stroke: "rgba(255,255,255,0.10)",
                        outline: "none",
                      },
                      hover: {
                        fill: "rgba(34,211,238,0.35)",
                        stroke: "rgba(255,255,255,0.16)",
                        outline: "none",
                      },
                      pressed: {
                        fill: "rgba(34,211,238,0.45)",
                        stroke: "rgba(255,255,255,0.16)",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Líneas de conexión */}
          {safeConnections.map((c, i) => (
            <Line
              key={`${i}-${c.from?.join(",")}-${c.to?.join(",")}`}
              from={c.from}
              to={c.to}
              stroke="rgba(34,211,238,0.55)"
              strokeWidth={1}
              strokeLinecap="round"
            />
          ))}

          {/* Hubs */}
          {hubs.map((h, i) => (
            <Marker key={`${h.name}-${i}`} coordinates={h.coordinates}>
              <circle r={5} fill="rgba(34,211,238,0.95)" />
              <circle r={10} fill="rgba(34,211,238,0.18)" />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});

export default WorldMap;
