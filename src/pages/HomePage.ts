import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { GaragePage } from './GaragePage';

export class HomePage extends BasePage { 

  protected readonly _header: Locator
  protected readonly _signInBtn: Locator

  constructor(page: Page){
    super(page, '/')
    this._header = this._page.locator('.header')
    this._signInBtn  = this._header.getByRole('button', {name: 'Guest log in'})
  }

  async loginAsGuest(){
    await this._signInBtn.click()
    return new GaragePage(this._page)
  }

  get header(){
    return this._header
  }
}