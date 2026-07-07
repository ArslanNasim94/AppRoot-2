export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  title: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is AppRoots?",
        answer:
          "AppRoots is a startup development partner for new founders. We help early-stage startups design, build, and launch web and mobile products with a dedicated engineering team — so you can focus on customers, marketing, and growth instead of hiring in-house developers.",
      },
      {
        question: "How does AppRoots work?",
        answer:
          "AppRoots operates as a comprehensive platform where you can purchase ready-made SaaS products, commission custom development projects, and join a community of entrepreneurs. Our AI-powered tools help streamline the development process and provide intelligent assistance throughout your journey.",
      },
      {
        question: "What services do you offer?",
        answer:
          "We offer web development, mobile app development, AI-powered solutions, ready-made SaaS products, and comprehensive startup support services. You can purchase existing products or commission custom projects tailored to your needs.",
      },
      {
        question: "Is there a community I can join?",
        answer:
          "Yes! AppRoots has an active startup community where entrepreneurs, developers, and innovators come together to share ideas, collaborate, and support each other.",
      },
    ],
  },
  {
    title: "AI Solutions",
    items: [
      {
        question: "Can AppRoots integrate AI into our existing product?",
        answer:
          "Yes. We integrate AI into products and systems you already run — chat assistants, smart search, document understanding, and workflow automation — using LLM APIs and retrieval-augmented generation (RAG), without rebuilding your existing app.",
      },
      {
        question: "How do you upgrade an existing system with AI?",
        answer:
          "We start with a short audit of your current system, identify the highest-impact AI opportunities (automation, assistants, analytics), then ship improvements incrementally so your product becomes more progressive without downtime or a risky rewrite.",
      },
      {
        question: "Do you build new AI SaaS products for startups?",
        answer:
          "Yes — building AI-native SaaS is one of our specialties. We take your AI product idea from concept to production: architecture, LLM integration, web and mobile frontends, billing, and post-launch maintenance, all handled by one dedicated team.",
      },
    ],
  },
  {
    title: "Products & Services",
    items: [
      {
        question: "What types of products do you offer?",
        answer:
          "We offer three main types of products: SaaS applications, mobile apps, and custom services. All products are production-ready and can be purchased or customized based on your requirements.",
      },
      {
        question: "Can I customize purchased products?",
        answer:
          "Yes! All our products can be customized to fit your specific needs — features, branding, integrations, and functionality. Contact us with your requirements for a custom quote.",
      },
      {
        question: "Do products come with support?",
        answer:
          "Yes, all products come with documentation and support. We offer various support packages including email support, priority support, and dedicated support channels.",
      },
      {
        question: "What is the pricing model?",
        answer:
          "Pricing varies by product. Some products have fixed pricing, while others use subscription models or custom pricing. Each product page displays its specific pricing information.",
      },
    ],
  },
  {
    title: "Custom Projects",
    items: [
      {
        question: "How do I start a custom project?",
        answer:
          'Create an account, navigate to the dashboard, and click "Create New Project." Fill out the project details including requirements, timeline, and budget. Our team will review and get back to you with a proposal.',
      },
      {
        question: "What is the development timeline?",
        answer:
          "Timelines vary by project complexity and scope. Simple projects may take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during the project proposal phase.",
      },
      {
        question: "How does payment work for custom projects?",
        answer:
          "Payment is typically structured in milestones. An initial deposit is required to start, followed by payments at key milestones. Final payment is due upon project completion and delivery.",
      },
      {
        question: "Can I track my project progress?",
        answer:
          "Yes! The dashboard provides real-time project tracking — tasks, deliverables, project status, team communication, and payment tracking all in one place.",
      },
    ],
  },
  {
    title: "Payments & Billing",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept credit/debit cards, bank transfers, and digital payment platforms. Payment options are displayed during checkout.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. We use industry-standard encryption and secure payment gateways. We never store complete credit card details on our servers.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refund policies vary by product type. Digital products may have different refund terms than custom development projects — refer to the specific product's refund policy or contact support.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes, for larger projects we offer flexible payment plans structured in milestones or installments — discussed during project planning.",
      },
    ],
  },
  {
    title: "Technical Support",
    items: [
      {
        question: "What technologies do you use?",
        answer:
          "We work with Laravel, React, Vue.js, Flutter, Swift, Kotlin, Python, and various cloud platforms, depending on project requirements.",
      },
      {
        question: "Do you provide hosting services?",
        answer:
          "We can assist with hosting setup and recommendations. While we don't provide hosting directly, we work with major cloud providers to help set up and configure your environment.",
      },
      {
        question: "What kind of support do you provide post-launch?",
        answer:
          "Bug fixes, maintenance, updates, and technical assistance. Support packages vary and can be customized; monthly maintenance plans are available.",
      },
      {
        question: "Can you integrate with third-party services?",
        answer:
          "Yes — payment gateways, email services, cloud storage, APIs, and more, discussed during project planning.",
      },
    ],
  },
];
