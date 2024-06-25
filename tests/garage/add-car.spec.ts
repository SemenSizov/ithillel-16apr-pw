import {expect, test} from '@playwright/test'
import { HomePage } from '../../src/pages/HomePage'
import { GaragePage } from '../../src/pages/GaragePage'

test.describe('Check add car model pop-up', ()=>{

let garagePage: GaragePage

test.beforeEach(async({page})=>{
  const homePage = new HomePage(page)
  await homePage.navigate()
  garagePage = await homePage.loginAsGuest()
})

test('verify add car pop up leayout', async()=>{
  await garagePage.addCarBtn.click()
  await expect.soft(garagePage.addBtn).toBeVisible()
  await expect.soft(garagePage.mileageInput).toBeVisible()
  await expect.soft(garagePage.addCarModelSelect).toBeVisible()
})

test('user can add a car', async()=>{
  await garagePage.addCarBtn.click()
  await garagePage.selectBrand('Porsche')
  await garagePage.addCarModelSelect.selectOption('911')
  await garagePage.mileageInput.fill('123456')
  await garagePage.addBtn.click()
})

test('created car is visible in car list', async()=>{
  await garagePage.addCar('Audi', 'TT', 12345)
  await expect(garagePage.carItem).toHaveCount(1)
})

test('created cars are visible in car list', async()=>{
  await garagePage.addCar('Audi', 'TT', 12345)
  await garagePage.addCar('Porsche', '911', 12345)
  await expect(garagePage.carItem).toHaveCount(2)
})

test.only('user can log out from garage page', async({page})=>{
  await garagePage.sideBar.logOutBtn.click()
})
})