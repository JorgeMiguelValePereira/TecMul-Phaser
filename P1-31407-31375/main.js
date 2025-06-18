// main.js
const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  backgroundColor: '#f0f0f0',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [MenuScene, GameScene, GameOverScene],
};

const game = new Phaser.Game(config);
