import * as wagmiChains from "wagmi/chains";

export const metadata = {
  title: "MACI RPGF",
  description: "Open-source Retro Public Goods Funding platform with MACI for private on chain voting/",
  url: "https://maci-rpgf.vercel.app",
  image: "/api/og",
};

const parseDate = (env?: string) => (env ? new Date(env) : undefined);

export const config = {
  logoUrl: "",
  pageSize: 3 * 4,
  // TODO: temp solution until we come up with solid one
  // https://github.com/privacy-scaling-explorations/maci-rpgf/issues/31
  voteLimit: 50,
  startsAt: parseDate(process.env.NEXT_PUBLIC_START_DATE),
  registrationEndsAt: parseDate(process.env.NEXT_PUBLIC_REGISTRATION_END_DATE),
  reviewEndsAt: parseDate(process.env.NEXT_PUBLIC_REVIEW_END_DATE),
  resultsAt: parseDate(process.env.NEXT_PUBLIC_RESULTS_DATE),
  skipApprovedVoterCheck: ["true", "1"].includes(process.env.NEXT_PUBLIC_SKIP_APPROVED_VOTER_CHECK!),
  tokenName: process.env.NEXT_PUBLIC_TOKEN_NAME!,
  roundId: process.env.NEXT_PUBLIC_ROUND_ID!,
  admin: (process.env.NEXT_PUBLIC_ADMIN_ADDRESS ?? "") as `0x${string}`,
  network: wagmiChains[process.env.NEXT_PUBLIC_CHAIN_NAME as keyof typeof wagmiChains],
  maciAddress: process.env.NEXT_PUBLIC_MACI_ADDRESS,
  maciStartBlock: Number(process.env.NEXT_PUBLIC_MACI_START_BLOCK ?? 0),
  maciSubgraphUrl: process.env.NEXT_PUBLIC_MACI_SUBGRAPH_URL ?? "",
  tallyUrl: process.env.NEXT_PUBLIC_TALLY_URL,
  roundOrganizer: process.env.NEXT_PUBLIC_ROUND_ORGANIZER ?? "Optimism",
  pollMode: process.env.NEXT_PUBLIC_POLL_MODE ?? "non-qv",
};

export const theme = {
  colorMode: "dark",
};

export const eas = {
  url: process.env.NEXT_PUBLIC_EASSCAN_URL ?? "",
  attesterAddress: process.env.NEXT_PUBLIC_APPROVED_APPLICATIONS_ATTESTER ?? "",

  contracts: {
    eas: process.env.NEXT_PUBLIC_EAS_CONTRACT_ADDRESS ?? "0x4200000000000000000000000000000000000021",
    schemaRegistry: process.env.NEXT_PUBLIC_EAS_SCHEMA_REGISTRY_ADDRESS ?? "0x4200000000000000000000000000000000000020",
  },
  schemas: {
    metadata: process.env.NEXT_PUBLIC_METADATA_SCHEMA!,
    approval: process.env.NEXT_PUBLIC_APPROVAL_SCHEMA!,
  },
};

export const impactCategories = {
  ETHEREUM_INFRASTRUCTURE: { label: "Ethereum Infrastructure" },
  OPEN_SOURCE: { label: "Web3 Open Source Software" },
  COMMUNITY_EDUCATION: { label: "Web3 Community & Education" },
  COLLECTIVE_GOVERNANCE: { label: "Collective Governance" },
  OP_STACK: { label: "OP Stack" },
  DEVELOPER_ECOSYSTEM: { label: "Developer Ecosystem" },
  END_USER_EXPERIENCE_AND_ADOPTION: { label: "End user UX" },
} as const;
