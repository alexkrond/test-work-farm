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
      frames: [{ key: 'wheat', frame: 1 }],
      frameRate: 1
    });

    options.scene.anims.create({
      key: 'done',
      frames: [{ key: 'wheat', frame: 2 }],
      frameRate: 1
    });

    this.anims.play('begin');
  }
}

export default Wheat;
