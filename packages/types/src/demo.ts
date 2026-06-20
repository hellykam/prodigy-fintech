export interface DemoCredentials {
  email: string
  password: string
  role: 'consumer' | 'admin' | 'partner'
  description: string
}

export const DEMO_USERS: DemoCredentials[] = [
  { email: 'alice@demo.com', password: '1234', role: 'consumer', description: 'Approved KYC, active account' },
  { email: 'bob@demo.com', password: '1234', role: 'consumer', description: 'Pending KYC' },
  { email: 'carol@demo.com', password: '1234', role: 'consumer', description: 'Rejected KYC' },
  { email: 'dave@demo.com', password: '1234', role: 'consumer', description: 'High risk user' },
  { email: 'admin@prodigy.com', password: 'admin1234', role: 'admin', description: 'Admin user' },
  { email: 'acme@partner.com', password: 'partner1234', role: 'partner', description: 'Acme Corp partner' },
  { email: 'beta@partner.com', password: 'partner1234', role: 'partner', description: 'Beta Inc partner' },
]

export type DemoUser = (typeof DEMO_USERS)[number]
