import Control from '../common/control';

export class GameOverPage extends Control {
  onNext: () => void;
  onHome: () => void;

  constructor(parentNode: HTMLElement, dataSet = '', results: any) {
    super(parentNode, dataSet);

    const resultIndicator = new Control(this.node, 'gameoverpageRESULT_INDICATORs', 'div', '', '');
    resultIndicator.node.textContent = results.map((item: boolean) => (item ? '+' : '-')).join(' ');

    const nextButton = new Control(this.node, 'btnNextGameField', 'button', '', 'next');
    nextButton.node.onclick = () => {
      this.onNext();
    };

    const homeButton = new Control(this.node, 'btnHomeGameField', 'button', '', 'home');
    homeButton.node.onclick = () => {
      this.onHome();
    };
  }
}
