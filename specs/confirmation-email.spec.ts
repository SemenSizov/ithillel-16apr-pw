import {expect, test} from '@playwright/test'
import axios  from 'axios'
import crypto from 'node:crypto'

const USER_NAME = '123qwe'
const TEMP_MAIL = `${USER_NAME}@cevipsa.com`
const md5 = crypto.createHash('md5').update(TEMP_MAIL).digest("hex")
console.log(md5)
test('Check confirmation email', async({page})=>{
      await test.step('Register', async()=>{
      await page.goto('https://www.liga.net/ua')
      await page.locator('.header__actions').getByText('Увійти').click()
      await page.getByRole('link', { name: 'Зареєструватися' }).click()
      await page.getByPlaceholder('E-mail').fill(TEMP_MAIL)
      await page.getByPlaceholder('Пароль', { exact: true }).fill(TEMP_MAIL)
      await page.getByPlaceholder('Повторіть пароль').fill(TEMP_MAIL)
      await page.getByRole('button', { name: 'toRegister' }).click()
  })

  await test.step('Check registration email', async()=>{
    const options = {
      method: 'GET',
      url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${md5}/`,
      headers: {
        'x-rapidapi-key': 'kpuLYNEQhumshaNGSSCGkasZ1oHDp1JDCUpjsnpz2J7ywb4Fys',
        'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com'
      }
    };
    let response
    let counter = 0
    do {
      await page.waitForTimeout(2000)
      response = await axios.request(options);
      console.log(response.data);
      counter++
    } while (response.data.error && counter < 5)

    expect(response.data.length).toBeGreaterThan(0)
    const registrationEmail = response.data[0]
    expect(registrationEmail.mail_from).toEqual('"LIGA.net" <adfree@liga.net>')
    expect(registrationEmail.mail_subject).toEqual('LIGA - Реєстрація')
    expect(registrationEmail.mail_text.startsWith(`ВІТАЄМО, ${USER_NAME.toUpperCase()}!`)).toBeTruthy()
  })
})