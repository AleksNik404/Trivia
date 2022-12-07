import Control from '../common/control';
import { IArtistQuestionData } from './IArtistQuestionData';

export class PictureQuestionView extends Control {
  onAnswer: (index: number) => void;

  constructor(parentNode: HTMLElement, dataSet = '', questionData: IArtistQuestionData) {
    super(parentNode, dataSet);

    const question = new Control(this.node, 'ArtQQuestion', 'div', '', 'Вопрос?');
    const answersButtons = questionData.answers.map((it, index) => {
      const button = new Control(this.node, 'btnMapArtQuestion', 'button', '', index.toString());
      button.node.onclick = () => {
        this.onAnswer(index);
      };
    })

    // prettier-ignore
  }
}
