export type Product = {
  slug: string;
  category: string;
  name: string;
  description: string;
  price: number;
  color: string;
  tag?: string;
  span: string;
};

export const products: Product[] = [
  {
    slug: "asfleet",
    category: "SaaS",
    name: "AsFleet",
    description:
      "Professional fleet maintenance tracking for small and mid-size businesses. Manage vehicles, schedules, repairs, and reminders in one powerful dashboard.",
    price: 0,
    color: "#1A0A2E",
    tag: "Featured",
    span: "col-span-2 row-span-2",
  },
  {
    slug: "drinx-hydration",
    category: "Mobile app",
    name: "Drinx – Hydration",
    description:
      "Transform your hydration habits with Drinx — track, log, and stay refreshed daily!",
    price: 0,
    color: "#0A1A2E",
    span: "col-span-2 row-span-1",
  },
  {
    slug: "sipar-hydration-with-steps",
    category: "Mobile app",
    name: "SipAR | Hydration with Steps",
    description:
      "Achieve your health goals with SipAR! Track your hydration, count your steps & visualize your progress through augmented reality.",
    price: 0,
    color: "#0A1A1A",
    span: "col-span-1 row-span-2",
  },
  {
    slug: "fit-tracking",
    category: "Mobile app",
    name: "Fit Tracking",
    description:
      "Track your health and fitness effortlessly — multiple health calculators, personalized profiles & timely reminders.",
    price: 0,
    color: "#1A1A0A",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "mindsync-ai",
    category: "Mobile app",
    name: "MindSync AI",
    description:
      "Achieve emotional balance & mental clarity — analyze emotions, track moods & achieve wellness goals.",
    price: 0,
    color: "#0A2E1A",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "saas-project-management-tool",
    category: "SaaS",
    name: "SaaS Project Management Tool",
    description:
      "A comprehensive project management SaaS platform with real-time collaboration.",
    price: 29.99,
    color: "#2E0A1A",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "mobile-fitness-app",
    category: "Mobile app with backend",
    name: "Mobile Fitness App",
    description: "iOS and Android fitness tracking app.",
    price: 9.99,
    color: "#1A2E0A",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "ecommerce-platform",
    category: "SaaS",
    name: "E-Commerce Platform",
    description: "Complete e-commerce solution.",
    price: 49.99,
    color: "#0A0A2E",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "crm-software-solution",
    category: "SaaS",
    name: "CRM Software Solution",
    description: "CRM for sales teams.",
    price: 39.99,
    color: "#2E1A0A",
    span: "col-span-2 row-span-1",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return price === 0 ? "$0.00" : `$${price.toFixed(2)}`;
}
