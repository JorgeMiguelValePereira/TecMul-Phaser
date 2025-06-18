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

    this.add.text(150, 150, 'Nível Concluído!', {
      fontSize: '32px',
      color: '#000000',
      fontFamily: 'Arial'
    });

    const nivelAtual = (data.proximoNivel || 1) - 1;

    // Botão: Próximo Nível (se existir)
    if (data.proximoNivel < 3) {
      const btnProximo = this.add.text(150, 250, '➡ Próximo Nível', {
        fontSize: '24px',
        color: '#000000',
        backgroundColor: '#c0ffc0',
        padding: { x: 10, y: 5 },
        fontFamily: 'Arial'
      }).setInteractive();

      btnProximo.on('pointerdown', () => {
        this.scene.start('GameScene', { nivelIndex: data.proximoNivel });
      });
    }

    // Botão: Repetir Nível
    const btnRepetir = this.add.text(150, 320, '🔁 Repetir Nível', {
      fontSize: '24px',
      color: '#000000',
      backgroundColor: '#ffff99',
      padding: { x: 10, y: 5 },
      fontFamily: 'Arial'
    }).setInteractive();

    btnRepetir.on('pointerdown', () => {
      this.scene.start('GameScene', { nivelIndex: nivelAtual });
    });

    // Botão: Nível Anterior
    if (nivelAtual > 0) {
      const btnAnterior = this.add.text(150, 390, '⬅ Nível Anterior', {
        fontSize: '24px',
        color: '#000000',
        backgroundColor: '#ffcccc',
        padding: { x: 10, y: 5 },
        fontFamily: 'Arial'
      }).setInteractive();

      btnAnterior.on('pointerdown', () => {
        this.scene.start('GameScene', { nivelIndex: nivelAtual - 1 });
      });
    }

    // Botão: Finalizar Jogo (apenas no último nível)
    if (nivelAtual >= 2) {
      const btnFinalizar = this.add.text(150, 460, '🏁 Finalizar Jogo', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: { x: 10, y: 5 },
        fontFamily: 'Arial'
      }).setInteractive();

      btnFinalizar.on('pointerdown', () => {
        this.scene.start('MenuScene');
      });
    }
  }
}
