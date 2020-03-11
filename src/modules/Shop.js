import Phaser from 'phaser';
import config from "../config.js";
import Button from "../components/Button.js";

const entities = config.entities;

class Shop extends Phaser.GameObjects.Container {
  constructor({ scene, x, y }) {
    super(scene, x, y);

    for (let i = 0; i < entities.length; i++) {
      const line = new Phaser.GameObjects.Container(scene, 0, i * config.textLineHeight);

      line.add(new Phaser.GameObjects.Text(scene, 0, 0, entities[i].name, config.basicTextStyle));


      const sellBtn = new Button({
        scene,
        x: 80,
        y: 0,
        text: `SELL($${ entities[i].price.sell })`,
        style: {
          backgroundColor: '#7dd2ff'
        },
        clickCallBack: this.sell.bind(this, entities[i].id, 1)
      });
      const buyBtn = new Button({
        scene,
        x: 170,
        y: 0,
        text: `BUY($${ entities[i].price.buy })`,
        style: {
          backgroundColor: '#ffd260'
        },
        clickCallBack: this.buy.bind(this, entities[i].id, 1)
      });


      line.add(sellBtn);
      line.add(buyBtn);

      this.add(line);
    }
  }

  buy(entityId, number) {
    const sum = entities.find(entity => entity.id === entityId).price.buy * number;

    if (this.scene.wallet.getMoney() >= sum) {
      this.scene.barn.put(entityId, number);
      this.scene.wallet.pay(sum);
    }
  }

  sell(entityId, number) {
    const sum = entities.find(entity => entity.id === entityId).price.sell * number;

    if (this.scene.barn.getQuantity(entityId) >= number) {
      this.scene.barn.take(entityId, number);
      this.scene.wallet.receive(sum);
    }
  }
}

export default Shop;
