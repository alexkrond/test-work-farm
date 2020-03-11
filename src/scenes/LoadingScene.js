import Phaser from 'phaser';
import CST from "../cst.js";


class LoadingScene extends Phaser.Scene {
  constructor() {
    super(CST.SCENES.LOADING);
  }


  preload() {
    const frameSize = {
      frameWidth: 64,
      frameHeight: 64
    };

    this.load.image('farm', 'assets/images/farm.jpg');

    this.load.spritesheet('grass', 'assets/images/grass.png', frameSize);
    this.load.spritesheet('wheat', 'assets/images/wheat.png', frameSize);
    this.load.spritesheet('cow', 'assets/images/cow.png', frameSize);
    this.load.spritesheet('chicken', 'assets/images/chicken.png', frameSize);

    this.load.audio('nice', 'assets/sounds/nice.mp3');


    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(this.width / 2 - 160, this.height / 2 - 25, 320, 50);

    const loadingText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);


    this.load.on('progress', percent => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(this.width / 2 - 150, this.height / 2 - 15, 300 * percent, 30);
      percentText.setText((percent * 100).toFixed(0) + '%');
    });


    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
  }


  create() {
    const startText = this.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: 'CLICK to START',
      style: {
        font: '30px monospace',
        fill: '#ffffff'
      }
    });
    startText.setOrigin(0.5, 0.5);

    this.input.once('pointerup', () => {
      this.scene.start(CST.SCENES.MAIN);
    })
  }
}

export default LoadingScene;
