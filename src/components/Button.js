import Phaser from 'phaser';


class Button extends Phaser.GameObjects.Text {
  constructor({ scene, x, y, text, style = {}, clickCallBack }) {
    const s = {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: {
        x: 5,
        y: 2
      },
      ...style
    };

    super(scene, x, y, text, s);

    this.setInteractive();
    this.on('pointerup', clickCallBack);
    this.on('pointerover', () => this.setTint(0xFF9866));
    this.on('pointerout', () => this.clearTint());
  }
}

export default Button;
