import { marketsContent, type MarketMapCoordinate, type MarketViewId } from "@/lib/markets";
import { marketMapCountryOutlines } from "@/lib/market-map-geography";

const mapBounds = { west: 25, east: 43, south: -18, north: 5.5 };
const mapWidth = 700;
const mapHeight = 920;
const viewBox = { x: -58, y: 12, width: 739, height: 791 };

const countryFills = {
  core: "rgb(38 129 199 / 0.42)",
  hub: "url(#markets-map-hatch)",
  context: "rgb(255 255 255 / 0.025)",
} as const;

function project([longitude, latitude]: MarketMapCoordinate) {
  const x = ((longitude - mapBounds.west) / (mapBounds.east - mapBounds.west)) * mapWidth;
  const y = ((mapBounds.north - latitude) / (mapBounds.north - mapBounds.south)) * mapHeight;
  return [x, y] as const;
}

function routePath(points: readonly MarketMapCoordinate[]) {
  return points.map((point, i) => `${i ? "L" : "M"}${project(point).join(" ")}`).join(" ");
}

export function MarketMap({ active }: { active: MarketViewId }) {
  const view = marketsContent.views.find((v) => v.id === active)!;
  const focus: readonly string[] = view.focus;
  const hubView = active === "hub";
  const [kigaliX, kigaliY] = project(marketsContent.mapLocations[0].coordinates);

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      role="img"
      aria-labelledby="markets-map-title markets-map-description"
      className="block size-full"
    >
      <title id="markets-map-title">Intank Petroleum’s East African markets and supply corridors</title>
      <desc id="markets-map-description">{marketsContent.mapDescription}</desc>
      <defs>
        <pattern id="markets-map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgb(255 255 255 / 0.03)" strokeWidth="1" />
        </pattern>
        <pattern id="markets-map-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="rgb(74 159 219 / 0.07)" />
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgb(74 159 219 / 0.28)" strokeWidth="1.5" />
        </pattern>
        <radialGradient id="markets-map-glow">
          <stop offset="0%" stopColor="#4a9fdb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4a9fdb" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect {...viewBox} fill="url(#markets-map-grid)" />

      {marketMapCountryOutlines.map((country) => {
        const inFocus = focus.includes(country.name);
        return (
          <path
            key={country.name}
            d={country.path}
            fill={inFocus && country.group === "context" ? "rgb(74 159 219 / 0.1)" : countryFills[country.group]}
            fillRule="evenodd"
            stroke={inFocus ? "rgb(125 182 227 / 0.75)" : "rgb(211 226 242 / 0.16)"}
            strokeWidth={inFocus ? 1.5 : 1}
            vectorEffect="non-scaling-stroke"
            className="transition-[fill,stroke] duration-500"
          />
        );
      })}

      <circle
        cx={kigaliX}
        cy={kigaliY}
        r="70"
        fill="url(#markets-map-glow)"
        className="transition-transform duration-700 ease-out-expo [transform-box:fill-box] [transform-origin:center]"
        style={{ transform: hubView ? "scale(1.7)" : "scale(1)" }}
      />

      {marketsContent.countryLabels.map((label) => {
        const [x, y] = project(label.coordinates);
        return (
          <text
            key={label.name}
            x={x}
            y={y}
            fill="rgb(231 239 248 / 0.5)"
            fontWeight="500"
            letterSpacing="1.6"
            textAnchor="middle"
            className="text-[20px] sm:text-[11px]"
          >
            {label.name}
          </text>
        );
      })}

      {marketsContent.views.map((v) =>
        v.routes.map((route, i) => {
          const isActive = v.id === active;
          return (
            <g key={`${v.id}-${i}`} className="transition-opacity duration-500" opacity={isActive ? 1 : 0.4}>
              <path
                d={routePath(route)}
                fill="none"
                stroke={v.id === "hub" ? "#7db6e3" : "#2681c7"}
                strokeWidth={isActive ? 3.5 : 2}
                strokeDasharray={v.id === "mozambique" ? "7 8" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {isActive && (
                <path
                  d={routePath(route)}
                  fill="none"
                  stroke="#f5f6f8"
                  strokeWidth="3"
                  strokeDasharray="2 22"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="market-flow"
                />
              )}
            </g>
          );
        }),
      )}

      {marketsContent.mapLocations.map((location) => {
        if ("only" in location && location.only !== active) return null;
        const [x, y] = project(location.coordinates);
        const isHub = location.kind === "hub";
        const isCity = location.kind === "city";
        return (
          <g key={location.name}>
            {isHub && (
              <>
                <circle cx={x} cy={y} r={hubView ? 16 : 10} fill="#2681c7" className="market-pulse" />
                <circle
                  cx={x}
                  cy={y}
                  r={hubView ? 14 : 11}
                  fill="none"
                  stroke="#4a9fdb"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}
            <circle
              cx={x}
              cy={y}
              r={isHub ? 6 : isCity ? 3.5 : 4.5}
              fill={isHub ? "#4a9fdb" : "#f5f6f8"}
              stroke="#0a0f1a"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={x + location.dx}
              y={y + location.dy}
              fill={isCity ? "rgb(245 246 248 / 0.8)" : "#f5f6f8"}
              fontWeight={isHub ? 600 : 500}
              textAnchor={location.anchor}
              paintOrder="stroke"
              stroke="#0a0f1a"
              strokeLinejoin="round"
              strokeWidth="4"
              className={isCity ? "text-[20px] sm:text-[12px]" : "text-[24px] sm:text-[14px]"}
            >
              {location.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
