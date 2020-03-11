import Phaser from 'phaser';
import ProgressBar from "../components/ProgressBar.js";
import config from "../config.js";
import Button from "../components/Button.js";


class Animal extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y, texture, frame, tile, entity }) {
    super(scene, x, y, texture, frame);

    this.tile = tile;
    this.entity = entity;

    this.scale = .8;
    this.setScale(this.scale);

    this.energy = 100;
    this.progress = 0;

    this.withProduct = false;

    this.progressTime = this.entity.progressTime;

    this.progressBar = this.scene.add.existing(new ProgressBar({
      scene,
      x: this.x - this.displayWidth / this.scale / 2,
      y: this.y - this.displayHeight / this.scale / 2
    }));
  }

  feed(foodId) {
    if (this.scene.barn.getQuantity(foodId)) {
      const food = config.entities.find(entity => entity.id === foodId);
      this.scene.barn.take(foodId, 1);

      this.energy += food.energy;
      this.energy = this.energy > 100 ? 100 : this.energy;

      this.destroyPopup();
      this.showPopup();
      this.tile.popup = this.popup;
    }
  }

  update(deltaTime) {
    this.energy = this.energy > 0 ? this.energy - deltaTime : 0;
    this.progress = this.progress + deltaTime * (100 / this.progressTime) > 100 ?
        100 :
        this.progress + deltaTime * (100 / this.progressTime);

    if (this.energy === 0 && this.progress !== 100) {
      this.progress = 0;
    }

    if (this.progress === 100) {
      this.withProduct = true;
    }

    this.progressBar.updateProgress(this.energy / 100);
  }

  destroy(fromScene) {
    this.progressBar.destroy(fromScene);
    super.destroy(fromScene);
  }

  toBarn() {
    this.scene.barn.put(this.entity.id, 1);
    this.destroyPopup();
    this.destroy();
    this.tile.entity = null;
  }

  collectProduct() {
    if (this.progress === 100) {
      this.progress = 0;
      this.withProduct = false;
      this.scene.barn.put(this.entity.product, 1);

      this.destroyPopup();
      this.showPopup();
      this.tile.popup = this.popup;
    }
  }

  showPopup() {
    this.popup = new Phaser.GameObjects.Container(this.scene, this.x, this.y - this.displayHeight / this.scale / 2);

    let i = 0;

    const toBarnBtn = new Button({
      scene: this.scene,
      x: 0,
      y: -i * config.textLineHeight,
      text: 'to barn',
      style: {
        backgroundColor: '#ffd260'
      },
      clickCallBack: () => this.toBarn()
    });
    toBarnBtn.setOrigin(0.5, 1);
    this.popup.add(toBarnBtn);
    i++;


    if (this.scene.barn.getQuantity(this.entity.eat)) {
      const feedBtn = new Button({
        scene: this.scene,
        x: 0,
        y: -i * config.textLineHeight,
        text: 'feed',
        style: {
          backgroundColor: '#ffd260'
        },
        clickCallBack: () => this.feed(this.entity.eat)
      });
      feedBtn.setOrigin(0.5, 1);
      this.popup.add(feedBtn);
      i++;
    }


    if (this.progress === 100) {
      const collectBtn = new Button({
        scene: this.scene,
        x: 0,
        y: -i * config.textLineHeight,
        text: 'collect',
        style: {
          backgroundColor: '#ffd260'
        },
        clickCallBack: () => this.collectProduct()
      });
      collectBtn.setOrigin(0.5, 1);
      this.popup.add(collectBtn);
    }


    this.scene.add.existing(this.popup);
  }

  destroyPopup() {
    this.popup.destroy();
    this.popup = null;
  }
}

export default Animal;
