import Control from '../common/control';

export class CategoriesPage extends Control {
  onBack: () => void;

  constructor(parentNode: HTMLElement, dataSet = '') {
    super(parentNode, dataSet);

    const backButton = new Control(this.node, 'btnBackCateg', 'button', '', 'back');
    backButton.node.onclick = () => {
      this.onBack();
    }
  }
}
