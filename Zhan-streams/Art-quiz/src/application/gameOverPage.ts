import Control from '../common/control';

export class GameOverPage extends Control {
  onNext: () => void;
  onHome: () => void;

  constructor(parentNode: HTMLElement, dataSet = '', result: any) {
    super(parentNode, dataSet);

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
