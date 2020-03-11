import Animal from "./Animal.js";


class Cow extends Animal {
  constructor(options) {
    super({ ...options, texture: 'cow' });

    options.scene.anims.create({
      key: 'withoutMilk',
      frames: [{ key: 'cow', frame: 0 }],
      frameRate: 1
    });

    options.scene.anims.create({
      key: 'withMilk',
      frames: options.scene.anims.generateFrameNumbers('cow', { start: 1, end: 2 }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.play('withoutMilk');
  }

  update(deltaTime) {
    super.update(deltaTime);

    if (this.withProduct) {
      if (this.anims.getCurrentKey() === 'withoutMilk') {
        this.anims.play('withMilk');
      }
    } else {
      if (this.anims.getCurrentKey() === 'withMilk') {
        this.anims.play('withoutMilk');
      }
    }
  }
}

export default Cow;
