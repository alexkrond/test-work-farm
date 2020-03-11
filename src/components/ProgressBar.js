import Phaser from 'phaser';


class ProgressBar extends Phaser.GameObjects.Container {
  constructor({ scene, x, y }) {
    super(scene, x, y);

    this.progressBox = new Phaser.GameObjects.Graphics(scene);
    this.progressBar = new Phaser.GameObjects.Graphics(scene);

    this.add(this.progressBox);
    this.add(this.progressBar);

    this.progressBox.fillStyle(0xffffff, 0.8);
    this.progressBox.fillRect(0, 0, 64, 5);
  }

  updateProgress(percent) {
    this.progressBar.clear();
    let color;

    switch (true) {
      case percent > .75:
        color = 0x00DD07;
        break;
      case percent > .25:
        color = 0xFFF322;
        break;
      default:
        color = 0xFF3A38;
    }

    this.progressBar.fillStyle(color, 1);
    this.progressBar.fillRect(1, 1, 62 * percent, 3);
  }

  destroy(fromScene) {
    this.progressBox.destroy();
    this.progressBar.destroy();

    super.destroy(fromScene);
  }
}

export default ProgressBar;
