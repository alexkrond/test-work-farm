class Wallet {
  constructor({ scene, money }) {
    this._money = money;

    this._moneyText = scene.make.text({
      x: scene.width - 10,
      y: 10,
      text: '$ ' + this._money,
      style: {
        font: '20px monospace',
        fill: '#000000',
        backgroundColor: '#ffffff75',
        padding: {
          x: 12,
          y: 3
        }
      }
    });
    this._moneyText.setOrigin(1, 0);
  }

  getMoney() {
    return this._money;
  }

  pay(money) {
    if (this._money >= money) {
      this._money -= money;
    } else {
      throw new Error('No money');
    }
  }

  receive(money) {
    this._money += money;
  }

  update() {
    this._moneyText.setText('$ ' + this._money);
  }
}

export default Wallet;
