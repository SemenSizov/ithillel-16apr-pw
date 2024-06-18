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
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalSetup: 'global-setup.ts',
  globalTeardown: 'global-setup.ts',
  testIgnore: '**.skip.**.ts',
  testMatch: '**.e2e.ts',
  outputDir: 'res',
  timeout: 60 * 1000,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://playwright.dev',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'qauto',
      testMatch: '**.qauto.spec.ts',
      use: {
        headless: false,
        baseURL: 'https://qauto.forstudy.space/',
        httpCredentials: {
          username: 'guest',
          password: 'welcome2qauto'
        }
      }
    },
    {
      name: 'smoke',
      // testDir: './tests/smoke',
      // testMatch: '**.smoke.e2e.ts',
      grep: new RegExp('@smoke'),
      use: { ...devices['Desktop Chrome'], 
        headless: false,
        viewport: {
          width: 400, 
          height: 300
        }
       },
    },
    {
      name: 'regression',
      // testDir: './tests/regression',
      // testMatch: '**.e2e.ts',
      grep: new RegExp('@regression'),
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testDir: './tests',
      testMatch: '**.api.spec.ts'

    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
