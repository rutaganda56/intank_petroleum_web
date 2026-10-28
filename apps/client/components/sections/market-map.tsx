import { marketsContent, type MarketMapCoordinate } from "@/lib/markets";
import { marketMapCountryOutlines } from "@/lib/market-map-geography";

const mapBounds = { west: 25, east: 43, south: -18, north: 5.5 };
const mapWidth = 700;
const mapHeight = 920;

const countryFills = {
  core: "rgba(38, 129, 199, 0.38)",
  hub: "rgba(74, 159, 219, 0.24)",
  context: "rgba(255, 255, 255, 0.035)",
} as const;

const routeStrokes = {
  blue: "#2681c7",
  lightBlue: "#7db6e3",
  dashed: "#f5b85c",
} as const;

function project([longitude, latitude]: MarketMapCoordinate) {
  const x = ((longitude - mapBounds.west) / (mapBounds.east - mapBounds.west)) * mapWidth;
  const y = ((mapBounds.north - latitude) / (mapBounds.north - mapBounds.south)) * mapHeight;
  return [x, y] as const;
}

export function MarketMap() {
  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[#080d16]">
      <svg
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        role="img"
        aria-labelledby="markets-map-title markets-map-description"
        className="block h-auto w-full"
      >
        <title id="markets-map-title">Intank Petroleum’s East and southern Africa markets</title>
        <desc id="markets-map-description">{marketsContent.mapDescription}</desc>
        <defs>
          <pattern id="markets-map-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          </pattern>
          <clipPath id="markets-map-clip">
            <rect width={mapWidth} height={mapHeight} />
          </clipPath>
        </defs>
        <rect width={mapWidth} height={mapHeight} fill="#080d16" />
        <rect width={mapWidth} height={mapHeight} fill="url(#markets-map-grid)" />

        <g clipPath="url(#markets-map-clip)">
          {marketMapCountryOutlines.map((country) => (
            <path
              key={country.name}
              d={country.path}
              fill={countryFills[country.group]}
              fillRule="evenodd"
              stroke="rgba(211, 226, 242, 0.28)"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {marketsContent.corridors.map((corridor) => (
            <polyline
              key={corridor.name}
              points={corridor.points.map((coordinate) => project(coordinate).join(",")).join(" ")}
              fill="none"
              stroke={routeStrokes[corridor.style]}
              strokeWidth="3"
              strokeDasharray={corridor.style === "dashed" ? "8 9" : undefined}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {marketsContent.countryLabels.map((label) => {
            const [x, y] = project(label.coordinates);
            return (
              <text
                key={label.name}
                x={x}
                y={y}
                fill="rgba(231, 239, 248, 0.68)"
                fontFamily="Inter, Arial, sans-serif"
                fontSize="12"
                fontWeight="600"
                letterSpacing="1.4"
                textAnchor="middle"
              >
                {label.name}
              </text>
            );
          })}

          {marketsContent.mapLocations.map((location) => {
            const [x, y] = project(location.coordinates);
            const isHub = location.kind === "hub";
            return (
              <g key={location.name}>
                {isHub && (
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="none"
                    stroke={routeStrokes.blue}
                    strokeOpacity="0.55"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isHub ? "5.5" : "4.5"}
                  fill={isHub ? routeStrokes.blue : "#f5f6f8"}
                  stroke="#080d16"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={x + location.dx}
                  y={y + location.dy}
                  fill="#f5f6f8"
                  fontFamily="Inter, Arial, sans-serif"
                  fontSize="14"
                  fontWeight={isHub ? "700" : "600"}
                  paintOrder="stroke"
                  stroke="#080d16"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  {location.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <figcaption className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <span className="text-sm font-medium text-white/75">Illustrative map</span>
        <ul aria-label="Map legend" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/65">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2.5 rounded-sm bg-brand" />
            Core markets
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2.5 rounded-sm bg-brand-bright/70" />
            Hub-served markets
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="w-5 border-t-2 border-dashed border-amber-300" />
            Indicative corridor
          </li>
        </ul>
      </figcaption>
    </figure>
  );
}
