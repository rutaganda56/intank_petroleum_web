// Site copy, taken from the Intank Petroleum company profile.

export const company = {
  name: "Intank Petroleum",
  legalName: "Intank Petroleum Ltd",
  group: "Intank Group",
  tagline: "Reliable Energy. A Stronger Tomorrow.",
  motto: "Fueling Progress Together",
  email: "info@intankpetroleum.com",
  phone: "+250 781 409 013",
  phoneHref: "tel:+250781409013",
  whatsappHref: "https://wa.me/250781409013",
  address: {
    lines: ["RMT Building, Floor 6", "4 Avenue, Kiyovu", "Nyarugenge, Kigali, Rwanda"],
    mapQuery: "KN 4 Ave, Kiyovu, Kigali, Rwanda",
  },
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Business", href: "#business" },
  { label: "Supply Chain", href: "#supply-chain" },
  { label: "Our Markets", href: "#markets" },
  { label: "Products", href: "#products" },
  { label: "Security of Supply", href: "#security" },
  { label: "Contact", href: "#contact" },
] as const;

export const enquiryTopics = [
  "Fuel supply",
  "Storage & terminals",
  "Logistics & distribution",
  "Petroleum trading & supply",
  "Commercial advisory & risk management",
  "Supply partnership",
  "Investment & financing",
  "Government & institutional",
  "General enquiry",
] as const;

export const highlights = [
  { value: "Kigali, RW", label: "Head office" },
  { value: "Trading + Supply", label: "Core activity" },
  { value: "Regional", label: "Growth ambition" },
  { value: "Intank Group", label: "Parent company" },
] as const;

export const capabilities = [
  {
    title: "Petroleum Trading & Supply",
    image: "/images/tankeronport.png",
    alt: "Intank tanker convoy carrying refined petroleum products",
    body: "International and regional sourcing, competitive tendering, commercial negotiations and transparent pricing structures.",
    points: [
      "International and regional sourcing",
      "Competitive tendering",
      "Commercial negotiations",
      "Transparent pricing structures",
    ],
  },
  {
    title: "Storage & Terminals",
    image: "/images/tank-farm.jpg",
    alt: "Intank storage tanks and truck loading gantry",
    body: "Physical infrastructure that improves supply reliability, enables efficient product handling and supports growing demand.",
    points: [
      "Bulk storage and tank-farm infrastructure",
      "Product receipt, discharge and transfer",
      "Custody and inventory management",
      "Third-party storage partnerships",
    ],
  },
  {
    title: "Logistics & Distribution",
    image: "/images/tanker-detail.jpg",
    alt: "Intank branded fuel tanker truck",
    body: "Dependable transportation, efficient routing, inventory visibility and coordinated distribution, especially where product travels far inland.",
    points: [
      "Inland transportation of petroleum products",
      "Tanker and distribution-network coordination",
      "Depot-to-market product movement",
      "Supply planning and delivery coordination",
    ],
  },
  {
    title: "Fuel Supply",
    image: "/images/tanker-operator.jpg",
    alt: "Intank operator checking a tanker at a fuel station",
    body: "Long-term supply relationships with commercial, industrial, transport and institutional users, backed by real infrastructure.",
    points: [
      "Commercial fuel customers",
      "Industrial, transport and mobility markets",
      "Institutional customers",
      "Wholesale and strategic channels",
    ],
  },
  {
    title: "Commercial Advisory & Risk Management",
    image: "/images/trade_showcase.png",
    alt: "Intank petroleum terminal at sunset",
    body: "Pricing strategy, commodity hedging, exposure management and commercial performance oversight.",
    points: [
      "Pricing strategy",
      "Commodity hedging",
      "Exposure management",
      "Commercial performance oversight",
    ],
  },
  {
    title: "Strategic Supply Partnerships",
    image: "/images/terminal-gate.jpg",
    alt: "Entrance to an Intank petroleum terminal",
    body: "A network of credible counterparties across the supply chain, strengthening access to product, infrastructure, finance and markets.",
    points: [
      "International traders, refineries and suppliers",
      "Terminal, storage and logistics operators",
      "Financial and trade-finance institutions",
      "Government and public-sector partners",
    ],
  },
] as const;

export const supplyChain = [
  {
    name: "Supply Sourcing",
    body: "Securing refined product through relationships with international traders, refineries and regional suppliers.",
  },
  {
    name: "Terminal Receipt",
    body: "Receiving, discharging and transferring product into terminal infrastructure on arrival.",
  },
  {
    name: "Bulk Storage",
    body: "Holding product in bulk storage and tank-farm facilities, including third-party storage partnerships.",
  },
  {
    name: "Quality & Custody",
    body: "Quality management, inventory control and custody, so the right product is available in the right condition.",
  },
  {
    name: "Inland Logistics",
    body: "Moving product inland through coordinated tanker fleets, efficient routing and depot-to-market planning.",
  },
  {
    name: "Wholesale Distribution",
    body: "Wholesale and downstream distribution to commercial and institutional markets.",
  },
  {
    name: "Fuel Supply",
    body: "Dependable, long-term supply to commercial, industrial, transport and institutional users.",
  },
] as const;

export const products = [
  { name: "Diesel", use: "Transport, industry and power generation" },
  { name: "Gasoline", use: "Retail and commercial mobility" },
  { name: "Jet A-1", use: "Aviation fuel" },
  { name: "Fuel Oil", use: "Industrial heating and power" },
  { name: "LPG", use: "Commercial and domestic energy" },
  { name: "Lubricants", use: "Fleet, machinery and industrial use" },
  {
    name: "NGL",
    use: "Natural gas liquids for industrial and energy applications",
    detail:
      "Opportunities across NGL infrastructure, storage, transportation and distribution, building on our physical supply platform.",
    points: ["Infrastructure", "Storage", "Transportation", "Distribution"],
  },
] as const;

export const securityOfSupply = [
  "Diversified supplier and counterparty relationships",
  "Strategic access to storage and terminal infrastructure",
  "Efficient inland logistics and distribution",
  "Inventory and product-flow visibility",
  "Long-term customer and supplier relationships",
  "Commercial structures designed around continuity of supply",
  "Physical petroleum trading and supply optimisation",
  "Commodity price risk management and hedging strategies",
] as const;

export const strengths = [
  {
    title: "Physical Energy Focus",
    body: "A business model centred on physical petroleum trading, real products, infrastructure and logistics.",
  },
  {
    title: "Integrated Capability",
    body: "A coordinated approach spanning trading, storage, logistics, distribution and supply.",
  },
  {
    title: "Strategic Relationships",
    body: "Access to a broad network of supply, infrastructure and financial counterparties.",
  },
  {
    title: "Market Understanding",
    body: "Focus on markets where reliable physical supply and inland logistics are critical.",
  },
  {
    title: "Scalable Platform",
    body: "A structure designed to expand with demand, infrastructure and partnerships.",
  },
] as const;

export const vision =
  "To become a trusted physical-energy platform connecting reliable petroleum supply with growing markets across Africa.";

export const mission =
  "To deliver dependable petroleum products through strategic sourcing, physical infrastructure, efficient logistics and strong long-term partnerships.";

export const values = [
  { name: "Integrity", body: "We operate with transparency, accountability and professionalism." },
  { name: "Reliability", body: "We focus on dependable supply and consistent delivery." },
  { name: "Safety", body: "We treat safe handling, storage and transportation as fundamental." },
  { name: "Partnership", body: "We build credible and mutually beneficial relationships." },
  { name: "Excellence", body: "We pursue operational and commercial discipline across our activities." },
  { name: "Sustainability", body: "We build resilient businesses that create lasting stakeholder value." },
] as const;
