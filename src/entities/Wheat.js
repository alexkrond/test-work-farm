import Plant from "./Plant.js";


class Wheat extends Plant {
  constructor(options) {
    super({ ...options, texture: 'wheat' });

    options.scene.anims.create({
      key: 'begin',
      frames: [{ key: 'wheat', frame: 0 }],
      frameRate: 1
    });

    options.scene.anims.create({
      key: 'medium',
      frames: this.scene.anims.generateFrameNumbers('wheat', { start: 1, end: 2 }),
      frameRate: 1,
      repeat: -1
    });

    options.scene.anims.create({
      key: 'done',
      frames: this.scene.anims.generateFrameNumbers('wheat', { start: 3, end: 4 }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.play('begin');
  }

  update(deltaTime) {
    super.update(deltaTime);

    switch (true) {
      case this.progress === 100:
        if (this.anims.getCurrentKey() !== 'done') {
          this.anims.play('done');
        }
        break;
      case this.progress > 50:
        if (this.anims.getCurrentKey() !== 'medium') {
          this.anims.play('medium');
        }
        break;
      default:
        if (this.anims.getCurrentKey() !== 'begin') {
          this.anims.play('begin');
        }
    }
  }
}

export default Wheat;
