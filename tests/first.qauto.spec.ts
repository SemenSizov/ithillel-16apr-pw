import { test, expect } from '@playwright/test';

test('has title', {tag: '@regression'},  async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.header')
  const signInBtn = header.getByRole('button', {name: 'Sign in'})
  const modal = page.locator('.modal-content')
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}))
  const firstNameInput = modal.locator('#signupName')
  const lastNameInput = modal.locator('#signupLastName')
  const emailInput = modal.locator('input[name="email"]')

  await signInBtn.click()
  await registerBtn.click()
  await firstNameInput.fill('Jhon')
  await lastNameInput.pressSequentially('asdfghj')
  await emailInput.fill('test.@test.com')

  await emailInput.blur()

  await expect(page.getByText('Email is incorrect')).toBeVisible()
});

test('check registration modal', {tag: '@regression'},  async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.header')
  const signInBtn = header.getByRole('button', {name: 'Sign in'})
  const modal = page.locator('.modal-content')
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}))
  const firstNameInput = modal.locator('#signupNam')
  const lastNameInput = modal.locator('#signupLastName')
  const emailInput = modal.locator('input[name="email"]')

  await signInBtn.click()
  await registerBtn.click()
  
  await expect.soft(lastNameInput, 'Last name input visible').toBeVisible()
  await expect.soft(firstNameInput, 'First name input visible').toBeVisible()
  await expect.soft(emailInput, 'Email input visible').toBeVisible()
});

test('check buttons', async({page})=>{
  await page.goto('/');
  const header = page.locator('.header')
  const headerButtons = header.getByRole('button')

  // Non-retrying assertions
  const count = await headerButtons.count()
  console.log('BUTTONS COUNT', count)
  expect(count).toBe(4)
  const lastBtnText = await headerButtons.last().innerText()
  expect(lastBtnText).toBe('Sign In')

  // Auto-retrying assertions
  await expect.soft(headerButtons).toHaveCount(3)
  await expect.soft(headerButtons.last()).toHaveText(/sign in/i, {ignoreCase: true})

})

test('check layout', async({page})=>{
  await page.goto('/');
  const header = page.locator('.header')
  const signInBtn = header.getByRole('button', {name: 'Sign in'})
  const modal = page.locator('.modal-content')
  await signInBtn.click()
  await expect(modal).toHaveScreenshot('sign-in-modal.png')
})