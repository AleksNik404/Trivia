import Control from '../common/control';

export class StartPage extends Control {
  onSettings: () => void;
  onGameSelect: (gameName: string) => void; 

  constructor(parentNode: HTMLElement, dataSet = '') {
    super(parentNode, dataSet);

    const picturesButton = new Control(this.node, 'btnPictures', 'button', '', 'pictures')
    picturesButton.node.onclick = () => this.onGameSelect('pictures');

    const artistsButton = new Control(this.node, 'btnArtists', 'button', '', 'artists')
    artistsButton.node.onclick = () => this.onGameSelect('artists');

    const settingsButton = new Control(this.node, 'btnSettings', 'button', '', 'settings')
    settingsButton.node.onclick = () => this.onSettings();
    }
}
