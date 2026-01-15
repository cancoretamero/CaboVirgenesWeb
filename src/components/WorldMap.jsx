import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = memo(function WorldMap({
  center = [0, 20],
  zoom = 1,
  onCountryClick = () => {},
  hoveredCountry = null,
  onHoverCountry = () => {},
  activeCountry = null,
  lines = [] 
}) {
  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          center={center}
          zoom={zoom}
          minZoom={1}
          maxZoom={8}
          translateExtent={[
            [-800, -600],
            [800, 600],
          ]}
          transitionDuration={500}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name || geo.properties.NAME || "";
                const isHovered = hoveredCountry === name;
                const isActive = activeCountry === name;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      // Calculamos el centro geográfico del país al hacer clic
                      const centroid = geoCentroid(geo);
                      onCountryClick(name, centroid);
                    }}
                    onMouseEnter={() => onHoverCountry(name)}
                    onMouseLeave={() => onHoverCountry(null)}
                    style={{
                      default: {
                        fill: isActive ? "#06b6d4" : isHovered ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.1)",
                        stroke: isActive ? "#fff" : "rgba(255,255,255,0.1)",
                        strokeWidth: isActive ? 1 : 0.5,
                        outline: "none",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      },
                      hover: {
                        fill: "rgba(34,211,238,0.3)",
                        stroke: "#fff",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: "#0891b2",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Líneas de conexión dinámicas */}
          {lines.map((line, i) => (
            <Line
              key={i}
              from={line.from}
              to={line.to}
              stroke="rgba(34, 211, 238, 0.6)"
              strokeWidth={2}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 2px rgba(6,182,212,0.5))" }}
            />
          ))}

          {/* Marcadores Fijos (Hubs) */}
          <Marker coordinates={[-4.53, 42.01]}>
            <circle r={4} fill="#fff" stroke="#06b6d4" strokeWidth={2} />
            <text textAnchor="middle" y={-10} style={{ fontFamily: "system-ui", fill: "#fff", fontSize: "10px" }}>Palencia</text>
          </Marker>
          <Marker coordinates={[-65.10, -43.30]}>
            <circle r={4} fill="#fff" stroke="#06b6d4" strokeWidth={2} />
            <text textAnchor="middle" y={15} style={{ fontFamily: "system-ui", fill: "#fff", fontSize: "10px" }}>Rawson</text>
          </Marker>

        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});

export default WorldMap;
