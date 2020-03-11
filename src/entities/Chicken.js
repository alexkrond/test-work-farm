import Animal from "./Animal.js";


class Chicken extends Animal {
  constructor(options) {
    super({ ...options, texture: 'chicken' });

    options.scene.anims.create({
      key: 'withoutEgg',
      frames: [{ key: 'chicken', frame: 0 }],
      frameRate: 1
    });

    options.scene.anims.create({
      key: 'withEgg',
      frames: options.scene.anims.generateFrameNumbers('chicken', { start: 1, end: 4 }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.play('withoutEgg');
  }

  update(deltaTime) {
    super.update(deltaTime);

    if (this.withProduct) {
      if (this.anims.getCurrentKey() === 'withoutEgg') {
        this.scene.sound.play('nice');
        this.anims.play('withEgg');
      }
    } else {
      if (this.anims.getCurrentKey() === 'withEgg') {
        this.anims.play('withoutEgg');
      }
    }
  }
}

export default Chicken;
