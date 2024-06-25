import { Page } from '@playwright/test'

export class BasePage {
  protected readonly _page: Page
  protected readonly _url: string

  constructor(page: Page, url: string){
    this._page = page
    this._url = url
  }

  async navigate(){
    return this._page.goto(this._url)
  }
}