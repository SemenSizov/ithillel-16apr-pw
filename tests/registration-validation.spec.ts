import {test, expect} from '@playwright/test'

test.describe('Registration modal validation', async()=>{
  test.beforeEach(async ({page})=>{
    page.goto('/')
    const header = page.locator('.header')
    const signInBtn = header.getByRole('button', {name: 'Sign in'})

  const modal = page.locator('.modal-content')
  const registerBtn = modal.getByRole('button', {name: 'registration'}).or(modal.getByRole('button', {name: 'реєстрація'}))

    await signInBtn.click()
    await registerBtn.click()
  })
  
  test('first name is required',async ({page})=>{

  const modal = page.locator('.modal-content')
    const firstNameInput = modal.locator('#signupName')
    const errorMsg = modal.locator('.invalid-feedback')
    await firstNameInput.focus()
    await firstNameInput.blur()
    await expect.soft(errorMsg, 'Error "Name required" is shown').toHaveText('Name required')
    await expect.soft(firstNameInput).toHaveClass(/is-invalid/gm)
    await expect.soft(firstNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)')
  })

  test('last name is required',async ({page})=>{

    const modal = page.locator('.modal-content')
      const lastNameInput = modal.locator('#signupLastName')
      const errorMsg = modal.locator('.invalid-feedback')
      await lastNameInput.focus()
      await lastNameInput.blur()
      await expect.soft(errorMsg, 'Error "Last name required" is shown').toHaveText('Last name required')
      await expect.soft(lastNameInput).toHaveClass(/is-invalid/gm)
      await expect.soft(lastNameInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('email is required',async ({page})=>{

      const modal = page.locator('.modal-content')
      const emailInput = modal.locator('input[name="email"]') 

        const errorMsg = modal.locator('.invalid-feedback')
        await emailInput.focus()
        await emailInput.blur()
        await expect.soft(errorMsg, 'Error "Email required" is shown').toHaveText('Email required')
        await expect.soft(emailInput).toHaveClass(/is-invalid/gm)
        await expect.soft(emailInput, 'Input with red border').toHaveCSS('border-color', 'rgb(220, 53, 69)')
      })
})