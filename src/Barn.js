import Phaser from 'phaser';
import config from "./config.js";


class Barn extends Phaser.GameObjects.Container {
  constructor({ scene, x, y }) {
    super(scene, x, y);

    this.storage = {};

    for (let i = 0; i < config.entities.length; i++) {
      this.storage[config.entities[i].id] = { count: 0 };

      const line = new Phaser.GameObjects.Container(scene, 0, i * config.textLineHeight);
      line.add(new Phaser.GameObjects.Text(scene, 0, 0, config.entities[i].name, config.basicTextStyle));

      const countText = new Phaser.GameObjects.Text(scene, 160, 0, this.storage[config.entities[i].id].count, config.basicTextStyle);
      this.storage[config.entities[i].id].updateText = () => countText.setText(this.storage[config.entities[i].id].count);

      line.add(countText);
      this.add(line);
    }
  }

  put(entityId, number) {
    this.storage[entityId].count += number;
  }

  take(entityId, number) {
    if (this.storage[entityId].count >= number) {
      this.storage[entityId].count -= number
    } else {
      throw new Error('Not so much in stock');
    }
  }

  getQuantity(entityId) {
    return this.storage[entityId].count;
  }

  update(...args) {
    for (let id in this.storage) {
      if (this.storage.hasOwnProperty(id)) {
        this.storage[id].updateText();
      }
    }
  }
}

export default Barn;
