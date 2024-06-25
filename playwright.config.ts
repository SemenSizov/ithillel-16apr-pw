import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/garage',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalSetup: 'global-setup.ts',
  globalTeardown: 'global-setup.ts',
  testMatch: '**.spec.ts',
  use: {
    headless: false,
    baseURL: 'https://qauto.forstudy.space/',
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    trace: 'on',
    testIdAttribute: 'qa-dont-touch'
  },
  projects: [
    {
      name: 'qauto',
      testMatch: '**.spec.ts',
      use: {...devices['Desktop Chrome']}
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
