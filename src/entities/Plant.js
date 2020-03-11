import Phaser from 'phaser';


class Plant extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y, texture, frame }) {
    super(scene, x, y, texture, frame);

    this.eatEnergy = 100;
    this.status = 'p';
    this.progress = 0;
  }

  update(deltaTime) {
    this.progress += deltaTime;
  }
}

export default Plant;
