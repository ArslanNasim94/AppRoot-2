export type Product = {
  slug: string;
  category: string;
  name: string;
  description: string;
  imageSrc?: string | null;
  price: number;
  color: string;
  tag?: string;
  span: string;
  websiteUrl?: string;
  badges?: string[];
  about: string;
  features?: string[];
  pricingNote: string;
  useCases: string;
  hasScreenshots?: boolean;
};

export const products: Product[] = [
  {
    slug: "asfleet",
    category: "SaaS",
    name: "AsFleet",
    imageSrc: null, // TODO: no image asset available for this product yet
    description:
      "Professional fleet maintenance tracking for small and mid-size businesses. Manage vehicles, schedules, repairs, and reminders in one powerful dashboard.",
    price: 0,
    color: "#1A0A2E",
    tag: "Featured",
    span: "col-span-2 row-span-2",
    websiteUrl: "https://asfleet.com",
    about:
      "AsFleet is a fleet maintenance tracker that helps you prevent breakdowns, track costs, and stay compliant. Manage vehicles, schedules, repairs, and reminders in one powerful dashboard. Get operational visibility with dashboards, cost control, fuel & expenses tracking, compliance management, and documents & alerts.",
    features: [
      "Live reminders & alerts for maintenance, insurance, and registration",
      "Cost analytics by vehicle with trend tracking",
      "Schedule services, log repairs, and track invoices per vehicle",
      "Multi-tenant support and white-label options for logistics companies",
      "Compliance management and document storage",
    ],
    pricingNote: "Free trial available. View pricing at asfleet.com/pricing.",
    useCases:
      "Fleet operators, logistics companies, small and mid-size businesses with vehicle fleets, companies needing maintenance tracking and compliance management.",
  },
  {
    slug: "drinx-hydration",
    category: "Mobile app",
    name: "Drinx – Hydration",
    imageSrc: null, // TODO: no image asset available for this product yet
    description:
      "Transform your hydration habits with Drinx — track, log, and stay refreshed daily!",
    price: 0,
    color: "#0A1A2E",
    span: "col-span-2 row-span-1",
    websiteUrl: "https://approots.net/products/drinx-hydration",
    badges: ["Mobile App Available", "iOS App"],
    about:
      "Stay hydrated and boost your health with Drinx — the ultimate hydration companion! Track your daily water intake, get personalized reminders, and discover insights to build healthy hydration habits. Whether you're at home, work, or on the go, Drinx ensures you meet your goals with style.",
    features: [
      "Personalized hydration goals based on weight, activity, and weather",
      "Quick logging with a single tap and real-time progress tracking",
      "Beautiful light and dark themes designed to keep you motivated",
      "Detailed charts and heat map for hydration pattern analysis",
      "Custom reminders tailored to your schedule",
      "Exportable hydration logs for personal use or sharing",
    ],
    pricingNote: "Free app available on the App Store. No in-app purchases mentioned.",
    useCases:
      "Health-conscious individuals, fitness enthusiasts, athletes, office workers, and anyone looking to improve daily hydration habits and overall health.",
    hasScreenshots: true,
  },
  {
    slug: "sipar-hydration-with-steps",
    category: "Mobile app",
    name: "SipAR | Hydration with Steps",
    imageSrc: null, // TODO: no image asset available for this product yet
    description:
      "Achieve your health goals with SipAR! Track your hydration, count your steps & visualize your progress through augmented reality.",
    price: 0,
    color: "#0A1A1A",
    span: "col-span-1 row-span-2",
    badges: ["Mobile App Available", "iOS App"],
    about:
      "Achieve your health goals with SipAR! Track your hydration, count your steps, and visualize your progress through augmented reality. SipAR is your ultimate hydration tracker and activity monitor — with AR visualization, smart reminders, and support for English, French, Spanish, Dutch, Chinese, Japanese, Urdu, Hindi, and more.",
    features: [
      "Hydration tracking with goals, logging, and visual insights",
      "Step counting synced with your daily routine",
      "Augmented reality mode to visualize water intake progress",
      "Smart, customizable reminders throughout the day",
      "Holistic wellness combining hydration and activity tracking",
      "Sleek, intuitive interface with personalized goals",
    ],
    pricingNote: "Free app available on the App Store. No in-app purchases mentioned.",
    useCases:
      "Fitness enthusiasts, busy professionals, health-conscious individuals, and anyone seeking to combine hydration tracking with step counting through innovative AR technology.",
    hasScreenshots: true,
  },
  {
    slug: "fit-tracking",
    category: "Mobile app",
    name: "Fit Tracking",
    imageSrc: null, // TODO: no image asset available for this product yet
    description:
      "Track your health and fitness effortlessly — multiple health calculators, personalized profiles & timely reminders.",
    price: 0,
    color: "#1A1A0A",
    span: "col-span-1 row-span-1",
    badges: ["Mobile App Available", "iOS App"],
    about:
      "Fit Tracking is your all-in-one health companion, designed to simplify fitness and wellness management. Whether you want to monitor your BMI, calculate your ideal weight, track your water intake, or set calorie goals, Fit Tracking provides a suite of powerful tools to help you achieve your health targets.",
    features: [
      "BMI, waist-to-hip ratio, body fat, calories burned, and heart rate zone calculators",
      "Water intake and calorie intake tracking tools",
      "Multi-profile support for yourself and your family",
      "Push notification reminders for each calculator",
      "Historical data tracking with detailed progress insights",
      "Sleek, vibrant interface designed for clarity and ease of use",
    ],
    pricingNote: "Free app available on the App Store. No in-app purchases mentioned.",
    useCases:
      "Individuals and families looking to monitor BMI, calculate ideal weight, track water intake, set calorie goals, and manage overall health with comprehensive calculators.",
    hasScreenshots: true,
  },
  {
    slug: "mindsync-ai",
    category: "Mobile app",
    name: "MindSync AI",
    imageSrc: null, // TODO: no image asset available for this product yet
    description:
      "Achieve emotional balance & mental clarity — analyze emotions, track moods & achieve wellness goals.",
    price: 0,
    color: "#0A2E1A",
    span: "col-span-1 row-span-1",
    badges: ["Mobile App Available", "iOS App"],
    about:
      "Discover MindSync: your personalized mental wellness companion. Harness cutting-edge AI and beautiful design to achieve balance, clarity, and control over your emotional well-being — with mood tracking, guided meditations, and actionable insights.",
    features: [
      "AI-powered emotion analysis through facial recognition",
      "Daily mood tracking with actionable pattern insights",
      "Personalized wellness goals for mental health",
      "Guided meditation sessions to relax and focus",
      "Reminders for mood logging and wellness activities",
      "Sleek interface with light and dark mode options",
    ],
    pricingNote: "Free app available on the App Store. No in-app purchases mentioned.",
    useCases:
      "Individuals managing stress, building mindfulness habits, tracking emotions, and anyone seeking emotional balance and mental clarity in daily life.",
    hasScreenshots: true,
  },
  {
    slug: "saas-project-management-tool",
    category: "SaaS",
    name: "SaaS Project Management Tool",
    imageSrc: null, // TODO: no image asset available for this product yet
    description:
      "A comprehensive project management SaaS platform with real-time collaboration.",
    price: 29.99,
    color: "#2E0A1A",
    span: "col-span-1 row-span-1",
    about:
      "Modern project management solution designed for teams of all sizes. Features include task tracking, team collaboration, time tracking, reporting, and integrations with popular tools.",
    pricingNote: "Starting at $29.99/month per user. Enterprise plans available.",
    useCases: "Software teams, agencies, consulting firms.",
  },
  {
    slug: "mobile-fitness-app",
    category: "Mobile app with backend",
    name: "Mobile Fitness App",
    imageSrc: null, // TODO: no image asset available for this product yet
    description: "iOS and Android fitness tracking app.",
    price: 9.99,
    color: "#1A2E0A",
    span: "col-span-1 row-span-1",
    about:
      "Fitness app with workout plans, nutrition tracking, and progress monitoring — built for iOS and Android with a full backend.",
    pricingNote: "$9.99/month or $79.99/year.",
    useCases: "Fitness enthusiasts, trainers, gyms.",
  },
  {
    slug: "ecommerce-platform",
    category: "SaaS",
    name: "E-Commerce Platform",
    imageSrc: null, // TODO: no image asset available for this product yet
    description: "Complete e-commerce solution.",
    price: 49.99,
    color: "#0A0A2E",
    span: "col-span-1 row-span-1",
    about:
      "Full-featured e-commerce platform with inventory management, order processing, payment integration, and storefront customization.",
    pricingNote: "Starting at $49.99/month.",
    useCases: "Online retailers, small businesses.",
  },
  {
    slug: "crm-software-solution",
    category: "SaaS",
    name: "CRM Software Solution",
    imageSrc: null, // TODO: no image asset available for this product yet
    description: "CRM for sales teams.",
    price: 39.99,
    color: "#2E1A0A",
    span: "col-span-2 row-span-1",
    about:
      "Manage customers, deals, and workflows in one place. Built for sales teams that need pipeline visibility, contact management, and reporting.",
    pricingNote: "$39.99/user/month.",
    useCases: "Sales teams, customer management.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return price === 0 ? "$0.00" : `$${price.toFixed(2)}`;
}

export function hasProductImage(product: Product): boolean {
  return Boolean(product.imageSrc && product.imageSrc.trim().length > 0);
}
