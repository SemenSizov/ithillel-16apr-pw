import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class SideBarComponent extends BaseComponent {

  private readonly _garageBtn: Locator
  private readonly _fuelExpensesBtn: Locator
  private readonly _instructionsBtn: Locator
  private readonly _logOutBtn : Locator

  constructor(page: Page){
    super(page, page.locator('.sidebar-wrapper'))
    this._garageBtn = this._container.getByRole('link', {name: 'Garage'})
    this._fuelExpensesBtn = this._container.getByRole('link', {name: 'Fuel expenses'})
    this._instructionsBtn = this._container.getByRole('link', {name: 'Instructions'})
    this._logOutBtn = this._container.locator('.icon-logout')
  }

  get garageBtn(){
    return this._garageBtn
  }

  get fuelExpensesBtn(){
    return this._fuelExpensesBtn
  }

  get instructionsBtn(){
    return this._instructionsBtn
  }

  get logOutBtn(){
    return this._logOutBtn
  }
}