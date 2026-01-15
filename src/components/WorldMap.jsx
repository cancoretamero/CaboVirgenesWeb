import React, { memo, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

/*
 * WorldMap Component
 * Renderiza el mapa interactivo.
 * Se encarga de pintar los países, detectar clics en el mapa y dibujar las líneas.
 */

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
    <div className="relative w-full h-full bg-[#080808]">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
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
          transitionDuration={750} // Movimiento suave de la cámara
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Normalizamos nombres (usamos el nombre en inglés del TopoJSON)
                const name = geo.properties.name;
                
                // Comprobamos si este país está activo o en hover
                // Nota: activeCountry viene del padre y puede estar en español, 
                // aquí hacemos una comparación simple, idealmente se usarían ISO codes.
                const isActive = activeCountry && (activeCountry === name || activeCountry.includes(name));
                const isHovered = hoveredCountry && (hoveredCountry === name || hoveredCountry.includes(name));

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      // Al hacer click en el MAPA, calculamos el centro automáticamente
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

          {/* Líneas de conexión animadas */}
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

          {/* Marcadores de Hubs (Sedes) */}
          <Marker coordinates={[-4.53, 42.01]}>
            <circle r={4} fill="#fff" stroke="#06b6d4" strokeWidth={2} />
            <text textAnchor="middle" y={-10} style={{ fontFamily: "system-ui", fill: "#fff", fontSize: "10px", fontWeight: "bold" }}>Palencia</text>
          </Marker>
          <Marker coordinates={[-65.10, -43.30]}>
            <circle r={4} fill="#fff" stroke="#06b6d4" strokeWidth={2} />
            <text textAnchor="middle" y={15} style={{ fontFamily: "system-ui", fill: "#fff", fontSize: "10px", fontWeight: "bold" }}>Rawson</text>
          </Marker>

        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});

export default WorldMap; WorldMap;
