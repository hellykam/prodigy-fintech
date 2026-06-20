/* All landing page copy lives here.
   Update this file when product scope changes.
   Do not hardcode copy inside components. */

export const hero = {
  eyebrow: 'Crypto infrastructure · B2B · Demo',
  headline: ['CRYPTO', 'THAT', 'EXPLAINS'],
  headlineAccent: 'ITSELF.',
  subheadline:
    'Give your platform crypto in an afternoon. Transparent fees, built-in KYC, and a dashboard that shows exactly what happened — so your compliance team stops asking questions.',
  cta: 'Open the demo',
  ctaSecondary: 'See how it works',
  microcopy: 'No wallet required. No real money moves. No small print hiding in a cupboard.',
} as const

export const ticker = {
  items: [
    'BTC/EUR  58,234  ▲',
    'ETH/EUR  3,102  ▲',
    'USDT/EUR  0.9214  ▼',
    'SOL/EUR  147.80  ▲',
    'XRP/EUR  0.5341  ▼',
    'USDC/EUR  0.9219  ▲',
    'LTC/EUR  71.42  ▼',
    'BCH/EUR  308.90  ▲',
    'KYC approved',
    'Fee visible before confirm',
    'Partner share posted',
    'Ledger updated',
    'Risk: clear',
    'No surprises',
  ],
} as const

export const trust = {
  eyebrow: 'Why it works',
  items: [
    { label: 'Transparent fees', detail: 'Shown before anyone presses anything interesting.' },
    { label: 'KYC-ready flow', detail: 'Identity checks built into the widget, not bolted on later.' },
    { label: 'Risk review', detail: 'Automated checks with manual override for edge cases.' },
    { label: 'Audit trail', detail: 'Every event logged. Every state change visible.' },
    { label: 'Partner dashboard', detail: 'Revenue tracking without spreadsheet archaeology.' },
    { label: 'Admin console', detail: 'Your ops team sees what the widget does, always.' },
    { label: 'Regulation-ready', detail: 'KYC, risk scoring, and audit trail built in. Your compliance team will have fewer 2 a.m. questions.' },
    { label: 'One-afternoon embed', detail: 'One line of code for the widget. A motivated developer has it running before lunch.' },
  ],
} as const

export const problem = {
  eyebrow: '01 / Problem',
  headline: 'Most crypto widgets explain themselves with the confidence of a vending machine that recently became a bank.',
  points: [
    'Fees appear after the fact, in small print, formatted like a legal document',
    'Compliance is invisible until it fails',
    'Admin teams have no idea what the widget is doing',
    'Partners track revenue in exported CSV files from 2019',
    'Users abandon flows they do not understand',
  ],
  conclusion: 'This is not a technical problem. It is a visibility problem.',
} as const

export const solution = {
  eyebrow: '02 / Solution',
  headline: 'One widget. Every check. Full visibility.',
  subheadline: 'A configurable crypto operating layer for B2B platforms that want to offer crypto without frightening their users or their compliance team.',
  modules: [
    { id: '01', name: 'Embeddable Widget', benefit: 'One line to embed. Full flow included.' },
    { id: '02', name: 'KYC Simulator', benefit: 'Identity checks that actually explain themselves.' },
    { id: '03', name: 'Risk Engine', benefit: 'Automated scoring with manual review tasks.' },
    { id: '04', name: 'Admin Console', benefit: 'Every transaction visible. Every state reviewable.' },
    { id: '05', name: 'Partner Portal', benefit: 'Revenue earned, tracked, and not lost in email threads.' },
    { id: '06', name: 'Market Simulator', benefit: 'Realistic quotes without real market exposure.' },
    { id: '07', name: 'Ledger & Fees', benefit: 'Double-entry. Every entry. No mystery math.' },
    { id: '08', name: 'Live System Map', benefit: 'Watch the entire flow in real time, end to end.' },
  ],
} as const

export const howItWorks = {
  eyebrow: '03 / How it works',
  headline: 'From integration to settlement — in four steps.',
  steps: [
    {
      n: '01',
      title: 'Partner integrates',
      detail: 'One script tag. Your B2B client adds the widget to their platform. Config — fees, currencies, brand — is set once in the admin console. No further code changes needed.',
    },
    {
      n: '02',
      title: 'Customer onboards (KYC)',
      detail: 'The widget guides the user through identity verification via Sumsub. Status is shown in real time. No approval, no transaction. No mystery about why.',
    },
    {
      n: '03',
      title: 'Customer buys crypto',
      detail: 'EUR → BTC (or ETH, SOL, USDT…). Rate fetched in under 200ms. Full fee breakdown shown — platform fee, partner share, network fee — before the user confirms. Zero hidden math.',
    },
    {
      n: '04',
      title: 'Prodigy settles',
      detail: 'Transaction posts to the double-entry ledger. Partner share is credited automatically. Admin console updates in real time. Audit trail is complete. Your compliance team can breathe.',
    },
  ],
} as const

export const fees = {
  eyebrow: '04 / Fee receipt',
  headline: 'No fog. No surprise math. No tiny-print treasure hunt.',
  subheadline: 'This is what a user sees before confirming. Every time.',
  example: {
    customerSends: { label: 'Customer sends', value: '€500.00' },
    rate: { label: 'Exchange rate', value: '1 BTC = €58,234' },
    platformFee: { label: 'Platform fee (0.50%)', value: '€2.50' },
    partnerShare: { label: 'Partner share (0.20%)', value: '€1.00' },
    networkFee: { label: 'Network fee (simulated)', value: '€0.80' },
    customerReceives: { label: 'Customer receives', value: '0.00852 BTC' },
  },
  note: 'Fees are configurable per B2B client. Partner shares are set in the admin console.',
} as const

export const safety = {
  eyebrow: '05 / Safety & compliance',
  headline: 'Built for humans. Approved by the people who read the small print.',
  points: [
    {
      stamp: 'KYC-READY',
      title: 'Identity verification built in',
      detail: 'The widget handles KYC submission and status. Users know where they stand.',
    },
    {
      stamp: 'RISK REVIEW',
      title: 'Automated scoring with manual override',
      detail: 'Risk engine scores every transaction. Admin can review, approve, or reject.',
    },
    {
      stamp: 'AUDIT TRAIL',
      title: 'Every event logged',
      detail: 'Correlation IDs link widget events to backend events to ledger entries.',
    },
    {
      stamp: 'ADMIN VISIBILITY',
      title: 'Ops team sees everything',
      detail: 'Live feed, task queue, transaction detail, KYC queue. All connected.',
    },
  ],
  disclaimer:
    'This is a demo/simulation environment. Regulatory compliance claims are not made. Production integrations require real KYC and risk infrastructure.',
} as const

export const partner = {
  eyebrow: '06 / Partner revenue',
  headline: 'Your platform embeds the widget. You set the fees. You earn the share.',
  statement: {
    period: 'Statement period: demo',
    rows: [
      { label: 'Gross transaction volume', value: '€124,800.00' },
      { label: 'Platform fee collected (0.50%)', value: '€624.00' },
      { label: 'Partner share earned (0.20%)', value: '€249.60' },
      { label: 'Network fees (simulated)', value: '€99.84' },
      { label: 'Transactions processed', value: '248' },
      { label: 'KYC approved', value: '231 / 248' },
    ],
    total: { label: 'Partner payout owed', value: '€249.60' },
  },
  note: 'Configurable per B2B client. Tracked in the partner portal. Visible to admin.',
} as const

export const demoFlows = {
  eyebrow: '07 / Demo flows',
  headline: 'Three scenarios. One system.',
  flows: [
    {
      id: 'A',
      name: 'Happy path',
      steps: ['Quote requested', 'KYC approved', 'Risk: clear', 'Fee shown', 'Transaction posted', 'Partner credited'],
      outcome: 'APPROVED',
    },
    {
      id: 'B',
      name: 'Manual review',
      steps: ['Quote requested', 'KYC approved', 'Risk: elevated', 'Admin task created', 'Manual review', 'Admin approves'],
      outcome: 'REVIEW',
    },
    {
      id: 'C',
      name: 'Rejected transaction',
      steps: ['Quote requested', 'KYC check', 'Risk: high', 'Auto-rejected', 'Admin notified', 'Audit trail updated'],
      outcome: 'REJECTED',
    },
  ],
} as const

export const faq = {
  eyebrow: '08 / Questions & terms',
  items: [
    {
      q: 'Is this safe?',
      a: 'It is a local demo. No real money moves. No real wallet required. No real KYC data is collected. Treat it as a working model of what a safe crypto flow looks like.',
    },
    {
      q: 'How fast can this be embedded?',
      a: 'One line of code for the widget itself. Configuration via admin console. A motivated developer could have it running in an afternoon.',
    },
    {
      q: 'Can we control fees?',
      a: 'Yes. Platform fee and partner share are configurable per B2B client in the admin console. Users always see the full breakdown before confirming.',
    },
    {
      q: 'What happens when KYC fails?',
      a: 'The user is informed clearly. The transaction does not proceed. Admin sees the event. The audit trail records what happened and why.',
    },
    {
      q: 'Can our team review risky transactions?',
      a: 'Yes. The risk engine creates a task in the admin review queue. Your team approves or rejects. The outcome is logged.',
    },
    {
      q: 'Is this real crypto trading?',
      a: 'No. The market simulator produces realistic quotes. No real orders are placed. No real wallets are involved. This is a demonstration environment.',
    },
    {
      q: 'Can we use our own brand?',
      a: 'The widget is configurable per B2B client. Theme, colours, allowed currencies, fee rates, and redirect URLs are all settable.',
    },
    {
      q: 'What can admins see?',
      a: 'Everything. Transactions, KYC queue, risk review queue, ledger entries, partner commissions, system events, and a live feed of what the widget is doing.',
    },
  ],
} as const

export const useCases = {
  eyebrow: 'Who it is for',
  headline: 'Any platform with users who want crypto and a compliance team that wants to sleep.',
  rows: [
    {
      id: 'wallets',
      label: 'Wallets',
      benefit: 'Add fiat-to-crypto conversion without rebuilding your core product around it.',
    },
    {
      id: 'neobanks',
      label: 'Neobanks',
      benefit: 'Offer crypto alongside current accounts. One widget. Same audit trail. No regulatory guesswork.',
    },
    {
      id: 'marketplaces',
      label: 'Marketplaces',
      benefit: 'Let sellers accept crypto without making your finance team invent new processes from scratch.',
    },
    {
      id: 'gaming-nft',
      label: 'Gaming & NFT',
      benefit: 'On-ramp players directly inside your product. Fees visible, KYC handled, rage-quits minimised.',
    },
    {
      id: 'creator-platforms',
      label: 'Creator platforms',
      benefit: 'Pay creators in crypto without mystery deductions. Every fee shown before anyone confirms anything.',
    },
    {
      id: 'payroll-remittance',
      label: 'Payroll & Remittance',
      benefit: 'Send cross-border payments in crypto with a full audit trail and none of the corridor-fee folklore.',
    },
  ],
} as const

export const coinifyInspired = {
  eyebrow: 'How integration actually works',
  headline: 'One line of code. The rest is already done.',
  subheadline:
    'The widget embeds in a single script tag. KYC, risk checks, fee logic, and ledger entries are not your problem — they are already there, running quietly, explaining themselves to anyone who asks.',
  embedStory: {
    label: 'The entire widget',
    code: '<script src="https://widget.prodigy.demo/embed.js" data-client-id="YOUR_ID"></script>',
    note: 'That is it. Seriously. Configuration happens in the admin console, not in your codebase.',
  },
  whiteLabel: {
    headline: 'Your brand. Our infrastructure.',
    detail:
      'The widget inherits your colours, shows your logo, and speaks your permitted currency list. Your users never need to know what is running underneath — unless they ask, in which case you can tell them it is Prodigy, and that it explains itself.',
  },
  plugAndPlay: {
    headline: 'Plug in. Play immediately.',
    points: [
      'Widget is live the moment the script loads',
      'Fees, KYC flow, and risk rules are pre-configured and ready to demo',
      'Admin console, partner portal, and ledger connect automatically',
      'No webhook gymnastics. No three-week integration project. No mysterious CSV at the end of the month.',
    ],
  },
  revenueAngle: {
    headline: 'You embed it. You earn from it.',
    detail:
      'Set your platform fee. Set your partner share. Every transaction posts the split to your partner statement automatically. Revenue tracking without a side project in Excel.',
  },
} as const

export const finalCta = {
  eyebrow: 'Ready when you are',
  headline: 'Open the demo. See the full flow.',
  cta: 'Open demo widget',
  ctaSecondary: 'See admin flow',
  ctaTertiary: 'Partner portal',
  microcopy: 'No wallet required. No real money moves. No small print hiding in a cupboard.',
  demoUrls: {
    consumer: 'http://localhost:5001',
    admin: 'http://localhost:5002',
    partner: 'http://localhost:5006',
    sumsub: 'http://localhost:5003',
    systemMap: 'http://localhost:5004',
    widget: 'http://localhost:5005',
  },
} as const

export const footer = {
  tagline: 'Crypto rails for the next generation of financial apps.',
  note: 'Prodigy is a demo product. Not a registered financial service. No regulatory compliance is claimed. All prices, transactions, and KYC flows shown are simulated.',
  links: [
    { label: 'Product', href: '#solution' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Safety', href: '#safety' },
    { label: 'Partners', href: '#partner' },
    { label: 'FAQ', href: '#faq' },
  ],
  demos: [
    { label: 'Consumer App', href: 'http://localhost:5001' },
    { label: 'Admin Portal', href: 'http://localhost:5002' },
    { label: 'KYC / Sumsub', href: 'http://localhost:5003' },
    { label: 'System Map', href: 'http://localhost:5004' },
    { label: 'Embed Widget', href: 'http://localhost:5005' },
    { label: 'Partner Portal', href: 'http://localhost:5006' },
  ],
} as const
