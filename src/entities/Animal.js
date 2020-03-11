import Phaser from 'phaser';


class Animal extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y, texture, frame }) {
    super(scene, x, y, texture, frame);

    this.energy = 100;
    this.status = 'p';
    this.progress = 0;
  }

  feed(food) {
    this.energy += food.energy;
    this.energy = this.energy > 100 ? 100 : this.energy;
  }

  update(deltaTime) {
    this.energy -= deltaTime;
    this.progress += deltaTime;
  }
}

export default Animal;
