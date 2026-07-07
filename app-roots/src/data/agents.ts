export type Agent = {
  name: string;
  description: string;
  badge?: string;
  initials: string;
};

export const agents: Agent[] = [
  {
    name: "Hermes",
    badge: "Popular",
    description:
      "Self-hosted agent with secure tool access — ideal for private, production automation.",
    initials: "HE",
  },
  {
    name: "LangGraph",
    description:
      "Multi-step AI workflows that keep context as tasks move through your product.",
    initials: "LG",
  },
  {
    name: "CrewAI",
    description:
      "Teams of AI agents collaborating on research, ops, and customer work.",
    initials: "CA",
  },
  {
    name: "OpenAI Assistants",
    description:
      "ChatGPT-powered assistants with files, tools, and API integrations built in.",
    initials: "OA",
  },
  {
    name: "Microsoft Copilot",
    description:
      "Microsoft agents connected to Office 365, Dynamics, and your business data.",
    initials: "MC",
  },
  {
    name: "Google Vertex AI",
    description:
      "Google Cloud agents for grounded search, chat, and enterprise AI features.",
    initials: "GV",
  },
  {
    name: "Amazon Bedrock",
    description:
      "AWS-managed agents with knowledge bases and actions at production scale.",
    initials: "AB",
  },
  {
    name: "Paperclip",
    description:
      "Open-source control plane to run, budget, and govern teams of AI agents.",
    initials: "PC",
  },
  {
    name: "MCP Tools",
    description:
      "Model Context Protocol — connect agents to your apps, APIs, and internal data.",
    initials: "MCP",
  },
];
