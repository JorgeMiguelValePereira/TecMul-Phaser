class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  preload() {
    this.load.image('meio_fundo', 'Assets/meio_fundo.png');
  }

  create(data) {
    // Fundo da cena
    this.add.image(0, 0, 'meio_fundo').setOrigin(0).setDisplaySize(600, 600);

    // Título centralizado e com contorno para legibilidade
    this.add.text(300, 150, 'Nível Concluído!', {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    const nivelAtual = (data.proximoNivel || 1) - 1;

    // Botão: Próximo Nível (se existir)
    if (data.proximoNivel < 3) {
      const btnProximo = this.add.text(300, 250, '➡ Próximo Nível', {
        fontSize: '24px',
        color: '#000000',
        backgroundColor: '#c0ffc0',
        padding: { x: 10, y: 5 },
        fontFamily: 'Arial'
      }).setOrigin(0.5).setInteractive();

      btnProximo.on('pointerdown', () => {
        this.scene.start('GameScene', { nivelIndex: data.proximoNivel });
      });
    }

    // Botão: Repetir Nível
    const btnRepetir = this.add.text(300, 320, '🔁 Repetir Nível', {
      fontSize: '24px',
      color: '#000000',
      backgroundColor: '#ffff99',
      padding: { x: 10, y: 5 },
      fontFamily: 'Arial'
    }).setOrigin(0.5).setInteractive();

    btnRepetir.on('pointerdown', () => {
      this.scene.start('GameScene', { nivelIndex: nivelAtual });
    });

    // Botão: Nível Anterior
    if (nivelAtual > 0) {
      const btnAnterior = this.add.text(300, 390, '⬅ Nível Anterior', {
        fontSize: '24px',
        color: '#000000',
        backgroundColor: '#ffcccc',
        padding: { x: 10, y: 5 },
        fontFamily: 'Arial'
      }).setOrigin(0.5).setInteractive();

      btnAnterior.on('pointerdown', () => {
        this.scene.start('GameScene', { nivelIndex: nivelAtual - 1 });
      });
    }

    // Botão: Finalizar Jogo (apenas no último nível)
    if (nivelAtual >= 2) {
      const btnFinalizar = this.add.text(300, 460, '🏁 Finalizar Jogo', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: { x: 10, y: 5 },
        fontFamily: 'Arial'
      }).setOrigin(0.5).setInteractive();

      btnFinalizar.on('pointerdown', () => {
        this.scene.start('MenuScene');
      });
    }
  }
}
