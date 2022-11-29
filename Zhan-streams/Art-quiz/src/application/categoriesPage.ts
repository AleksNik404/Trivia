import Control from '../common/control';

export class CategoriesPage extends Control {
  onBack: () => void;
  onSelect: (index: number) => void;

  constructor(parentNode: HTMLElement, dataSet = '', gameName: string) {
    super(parentNode, dataSet);

    const header = new Control(this.node, 'categPageHeader', `h1`, '', gameName);

    const backButton = new Control(this.node, 'btnBackCateg', 'button', '', 'back');
    backButton.node.onclick = () => {
      this.onBack();
    };

    const categoriesList = [1, 2, 3, 4, 5, 6, 7];
    const categoryButtons = categoriesList.map((it, i) => {
      const button = new Control(this.node, 'catBtn', 'button', '', it.toString());
      button.node.onclick = () => {
        this.onSelect(i);
      };
    });
  }
}
