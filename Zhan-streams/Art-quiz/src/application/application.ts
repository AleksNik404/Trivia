import Control from '../common/control';
import { StartPage } from './startPage';
import { SettingsPage } from './settingsPage';
import { CategoriesPage } from './categoriesPage';


export class Application extends Control {
  constructor(parentNode: HTMLElement, dataSet = '') {
    super(parentNode, dataSet);
      this.mainCycle()
  }

  private mainCycle() {
    const startPage = new StartPage(this.node, 'startPage');

    startPage.onGameSelect = () => {
      startPage.destroy()
      const categories = new CategoriesPage(this.node, 'categoriesPage')
      categories.onBack = () => {
        categories.destroy()
        this.mainCycle();
      }
    }

    startPage.onSettings = () => {
      startPage.destroy()

      const settingsPage = new SettingsPage(this.node, 'settingsPage')
      settingsPage.onBack = () => {
        settingsPage.destroy()
        this.mainCycle();
      }
      settingsPage.onSave = (settings) => {
        console.log(settings)
        settingsPage.destroy()
        this.mainCycle();
      }
    }
  }
}
