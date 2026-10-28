export type MarketMapCoordinate = readonly [longitude: number, latitude: number];

const kigali: MarketMapCoordinate = [30.0619, -1.9441];

export const marketsContent = {
  introduction:
    "From our base in Kigali we link coastal supply gateways in Kenya, Tanzania and Mozambique with growing demand across East Africa and its landlocked markets.",
  mapDescription:
    "An illustrative map of East Africa. Rwanda, Kenya and Tanzania are highlighted as core markets; Burundi, Uganda and the Democratic Republic of the Congo are highlighted as neighbouring markets served from Rwanda. Indicative supply corridors connect Kigali with Mombasa, Dar es Salaam and Mozambique.",
  views: [
    {
      id: "hub",
      title: "Rwanda regional hub",
      label: "Rwanda hub",
      body: "Our head office in Kigali sits at the centre of the region, positioned to serve neighbouring landlocked markets.",
      points: ["Burundi", "Uganda", "Democratic Republic of the Congo"],
      focus: ["Rwanda", "Burundi", "Uganda", "Democratic Republic of the Congo"],
      routes: [
        [kigali, [32.5825, 0.3476]],
        [kigali, [29.3599, -3.3614]],
        [kigali, [28.8608, -2.4908]],
      ],
    },
    {
      id: "mombasa",
      title: "Mombasa corridor",
      label: "Mombasa",
      body: "The northern route from the Port of Mombasa through Kenya and Uganda into Rwanda.",
      points: ["Kenya, a core market", "Port of Mombasa gateway"],
      focus: ["Kenya", "Uganda", "Rwanda"],
      routes: [
        [
          [39.6682, -4.0435],
          [36.8219, -1.2921],
          [32.5825, 0.3476],
          kigali,
        ],
      ],
    },
    {
      id: "dar",
      title: "Dar es Salaam corridor",
      label: "Dar es Salaam",
      body: "The central route from the Port of Dar es Salaam across Tanzania to Rwanda and Burundi.",
      points: ["Tanzania, a core market", "Port of Dar es Salaam gateway"],
      focus: ["United Republic of Tanzania", "Rwanda"],
      routes: [
        [
          [39.2083, -6.7924],
          [36.5, -5.7],
          [33.8, -3.4],
          kigali,
        ],
      ],
    },
    {
      id: "mozambique",
      title: "Mozambique corridor",
      label: "Mozambique",
      body: "A southern supply option from Mozambique that adds diversity to how we source product for the region.",
      points: ["Supply diversification", "Southern gateway"],
      focus: ["Mozambique", "United Republic of Tanzania", "Rwanda"],
      routes: [
        [
          [37.6, -13.6],
          [35.4, -10.6],
          [32.7, -6.5],
          kigali,
        ],
      ],
    },
  ],
  summary: [
    { label: "Core markets", value: "Rwanda · Kenya · Tanzania" },
    { label: "Served from the Rwanda hub", value: "Burundi · Uganda · DRC" },
  ],
  mapLocations: [
    { name: "Kigali, Rwanda", coordinates: kigali, kind: "hub", dx: 18, dy: -12, anchor: "start" },
    { name: "Mombasa", coordinates: [39.6682, -4.0435], kind: "gateway", dx: -12, dy: 20, anchor: "end" },
    { name: "Dar es Salaam", coordinates: [39.2083, -6.7924], kind: "gateway", dx: -12, dy: 20, anchor: "end" },
    { name: "Kampala", coordinates: [32.5825, 0.3476], kind: "city", dx: 10, dy: -8, anchor: "start", only: "hub" },
    { name: "Bujumbura", coordinates: [29.3599, -3.3614], kind: "city", dx: -10, dy: 14, anchor: "end", only: "hub" },
    { name: "Bukavu", coordinates: [28.8608, -2.4908], kind: "city", dx: -10, dy: 2, anchor: "end", only: "hub" },
  ],
  countryLabels: [
    { name: "DRC", coordinates: [25.6, -0.6] },
    { name: "UGANDA", coordinates: [32.6, 2.4] },
    { name: "KENYA", coordinates: [37.8, 1.2] },
    { name: "TANZANIA", coordinates: [36.2, -9.0] },
    { name: "MOZAMBIQUE", coordinates: [38.6, -12.6] },
  ],
} as const;

export type MarketViewId = (typeof marketsContent.views)[number]["id"];
