class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('fundo_menu', 'Assets/fundo_menu.jpg');
  }

  create() {
    // Fundo
    this.add.image(0, 0, 'fundo_menu').setOrigin(0).setDisplaySize(600, 600);

    // Título
    this.add.text(300, 100, 'Fuga do Carro Vermelho', {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    // Botão de começar
    const startBtn = this.add.text(300, 200, 'Começar', {
      fontSize: '24px',
      fill: '#ffffff',
      backgroundColor: '#007bff',
      padding: { x: 15, y: 10 },
      fontFamily: 'Arial',
    }).setOrigin(0.5).setInteractive();

    startBtn.on('pointerover', () => {
      startBtn.setStyle({ fill: '#ffffaa' });
    });

    startBtn.on('pointerout', () => {
      startBtn.setStyle({ fill: '#ffffff' });
    });

    startBtn.on('pointerdown', () => {
      this.scene.start('GameScene', { nivelIndex: 0 });
    });

    // Texto explicativo no canto inferior esquerdo
    this.add.text(10, 550,
      'Objetivo: Liberta o carro vermelho!\nMove os veículos para abrir caminho.',
      {
        fontSize: '16px',
        fill: '#000000',
        fontFamily: 'Arial',
      }
    );
  }
}
