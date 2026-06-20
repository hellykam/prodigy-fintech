import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm dev:backend',
      url: 'http://localhost:3000/health',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm dev:consumer',
      url: 'http://localhost:5001',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm dev:admin',
      url: 'http://localhost:5002',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm dev:partner',
      url: 'http://localhost:5006',
      reuseExistingServer: !process.env.CI,
    },
  ],
})
