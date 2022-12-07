import Control from '../common/control';
import { ArtistQuestionView } from './artistQuestionView';
import { PictureQuestionView } from './pictureQuestionView';
import { IArtistQuestionData } from './IArtistQuestionData';

interface IQuizOptions {
  gameName: string;
  categoryIndex: number;
}

type IQuizResults = boolean[];

export class GameFieldPage extends Control {
  onBack: () => void;
  onHome: () => void;
  onFinish: (results: IQuizResults) => void;
  progressIndicator: Control<HTMLElement>;
  results: IQuizResults;
  answersIndicator: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, dataSet = '', gameOptions: IQuizOptions) {
    super(parentNode, dataSet);
    console.log(gameOptions);

    // prettier-ignore
    const header = new Control(this.node,'headerGameField',`h1`,'', `${gameOptions.gameName} - ${gameOptions.categoryIndex}`);

    const backButton = new Control(this.node, 'btnBackGameField', 'button', '', 'back');
    backButton.node.onclick = () => {
      this.onBack();
    };

    const homeButton = new Control(this.node, 'btnHomeGameField', 'button', '', 'home');
    homeButton.node.onclick = () => {
      this.onHome();
    };

    this.progressIndicator = new Control(this.node, 'gamafildProgressInd', 'div', '', '');
    this.answersIndicator = new Control(this.node, 'gamafildAnswersInd', 'div', '', '');

    const questions: IArtistQuestionData[] = [
      { answers: [1, 2, 3, 4], correctAnswerIndex: 1 },
      { answers: [1, 2, 3, 4], correctAnswerIndex: 2 },
      { answers: [1, 2, 3, 4], correctAnswerIndex: 3 },
    ];

    this.results = [];

    this.questionCycle(gameOptions.gameName, questions, 0, () => {
      this.onFinish(this.results);
    });
  }

  questionCycle(
    gameName: string,
    questions: IArtistQuestionData[],
    index: number,
    onFinish: () => void
  ) {
    if (index >= questions.length) {
      onFinish();
      return;
    }
    this.progressIndicator.node.textContent = `${index + 1} / ${questions.length}`;
    this.answersIndicator.node.textContent = this.results
      .map((item) => (item ? '+' : '-'))
      .join(' ');

    if (gameName == 'artists') {
      const question = new ArtistQuestionView(this.node, 'ArtistQuestionView', questions[index]);
      question.onAnswer = (answerIndex) => {
        question.destroy();
        this.results.push(answerIndex === questions[index].correctAnswerIndex);
        this.questionCycle(gameName, questions, index + 1, onFinish);
      };
    } else if (gameName == 'picture') {
      const question = new PictureQuestionView(this.node, 'PictureQuestionView', questions[index]);
      question.onAnswer = (answerIndex) => {
        question.destroy();
        this.results.push(answerIndex === questions[index].correctAnswerIndex);
        this.questionCycle(gameName, questions, index + 1, onFinish);
      };
    } else {
      throw new Error('Game type is not exist');
    }
  }
}
