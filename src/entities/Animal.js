import Phaser from 'phaser';
import ProgressBar from "../components/ProgressBar.js";


class Animal extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y, texture, frame }) {
    super(scene, x, y, texture, frame);

    const scale = .8;
    this.setScale(scale);

    this.energy = 100;
    this.status = 'p';
    this.progress = 0;

    this.progressBar = this.scene.add.existing(new ProgressBar({
      scene,
      x: this.x - this.displayWidth / scale / 2,
      y: this.y - this.displayHeight / scale / 2
    }));
  }

  feed(food) {
    this.energy += food.energy;
    this.energy = this.energy > 100 ? 100 : this.energy;
  }

  update(deltaTime) {
    this.energy = this.energy > 0 ? this.energy - deltaTime : 0;
    this.progress += deltaTime;

    this.progressBar.updateProgress(this.energy / 100);
  }

  destroy(fromScene) {
    this.progressBar.destroy(fromScene);
    super.destroy(fromScene);
  }
}

export default Animal;
