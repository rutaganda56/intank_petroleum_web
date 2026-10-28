export type MarketMapCoordinate = readonly [longitude: number, latitude: number];

export const marketsContent = {
  introduction:
    "With Rwanda at the centre of our regional ambition, we connect coastal supply gateways with neighbouring landlocked markets.",
  mapDescription:
    "An illustrative map of East and southern Africa. Rwanda, Kenya and Tanzania are highlighted as core markets; Burundi, Uganda and the Democratic Republic of the Congo are highlighted as neighbouring markets served from Rwanda. Indicative supply corridors connect Kigali with Mombasa, Dar es Salaam and Mozambique.",
  coreMarkets: [
    { name: "Rwanda", description: "Our regional hub, with our head office in Kigali." },
    { name: "Kenya", description: "A core market linked to the Mombasa supply corridor." },
    { name: "Tanzania", description: "A core market linked to the Dar es Salaam supply corridor." },
  ],
  hubMarkets: [
    { name: "Burundi", description: "A neighbouring landlocked market within reach of the Rwanda hub." },
    { name: "Uganda", description: "A neighbouring landlocked market within reach of the Rwanda hub." },
    { name: "Democratic Republic of the Congo", description: "A neighbouring landlocked market within reach of the Rwanda hub." },
  ],
  corridors: [
    {
      name: "Mombasa corridor",
      description: "An indicative inland supply link from Mombasa toward Kigali and the wider region.",
      style: "blue",
      points: [
        [39.6682, -4.0435],
        [36.8219, -1.2921],
        [32.5825, 0.3476],
        [30.0619, -1.9441],
      ],
    },
    {
      name: "Dar es Salaam corridor",
      description: "An indicative inland supply link from Dar es Salaam toward Kigali and the wider region.",
      style: "lightBlue",
      points: [
        [39.2083, -6.7924],
        [36.5, -5.7],
        [33.8, -3.4],
        [30.0619, -1.9441],
      ],
    },
    {
      name: "Mozambique corridor",
      description: "A general, indicative corridor from Mozambique toward Rwanda; no specific port is implied.",
      style: "dashed",
      points: [
        [35.6, -15.5],
        [34.7, -11.2],
        [32.7, -6.5],
        [30.0619, -1.9441],
      ],
    },
  ],
  mapLocations: [
    { name: "Kigali", coordinates: [30.0619, -1.9441], kind: "hub", dx: 12, dy: 5 },
    { name: "Mombasa", coordinates: [39.6682, -4.0435], kind: "gateway", dx: 12, dy: -10 },
    { name: "Dar es Salaam", coordinates: [39.2083, -6.7924], kind: "gateway", dx: 12, dy: 16 },
  ],
  countryLabels: [
    { name: "DRC", coordinates: [27.2, -0.5] },
    { name: "UGANDA", coordinates: [31.5, 1.1] },
    { name: "KENYA", coordinates: [36.4, 0.3] },
    { name: "RWANDA", coordinates: [29.2, -3.25] },
    { name: "BURUNDI", coordinates: [30.2, -4.2] },
    { name: "TANZANIA", coordinates: [35.0, -8.1] },
    { name: "MOZAMBIQUE", coordinates: [36.8, -14.1] },
  ],
} as const;
