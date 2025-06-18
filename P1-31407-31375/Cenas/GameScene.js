class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.gridSize = 100;
    this.carros = [];
    this.niveis = [
  // Nível 1
  [
    [null, null, null, null, 'C1', null],
    ['H0', 'H0', 'M1', null, 'C1', null],
    [null, null, null, null, 'C1', null],
    [null, null, null, 'H1', 'H1', null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ],

  // Nível 2
  [
    [null, null, null, 'C1', 'C1', 'C1'],
    ['V1', 'H0', 'H0', 'V2', null, null],
    ['V1', null, null, 'V2', null, null],
    ['H1', 'H1', null, 'M1', null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ],

  // Nível 3
  [
    [null, null, 'C1', 'C1', 'C1', null],
    [null, 'H0', 'H0', 'V1', null, null],
    ['V2', 'H1', 'H1', 'V1', 'H2', 'H2'],
    ['V2', null, null, 'V3', null, 'M1'],
    [null, null, null, 'V3', null, null],
    ['H3', 'H3', 'H4', 'H4', null, null],
  ]
];

  }

   preload() {
    this.load.image('carro_vermelho', 'Assets/carro_vermelho.png');
    this.load.image('carro_azul', 'Assets/carro_azul.png');
    this.load.audio('motor', 'Assets/motor.mp3');
    this.load.audio('vitoria', 'Assets/vitoria.mp3');
    this.load.image('fundo', 'Assets/fundo_jogo.png');
    this.load.image('camiao', 'Assets/camiao.png');
    this.load.image('mota', 'Assets/mota.png');

  }

  create(data = {}) {
    this.add.image(0, 0, 'fundo').setOrigin(0).setDisplaySize(600, 600);

    this.carros = [];
    this.nivelAtual = data.nivelIndex || 0;
    this.createGrid();
    this.createNivel(this.niveis[this.nivelAtual]);

    this.input.off('drag');
    this.input.off('dragend');

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      const orient = gameObject.getData('orientacao');
      const id = gameObject.getData('id');
      const comprimento = gameObject.getData('comprimento');

      if (orient === 'horizontal') {
        const posicaoAtualX = Math.floor(gameObject.x / this.gridSize);
        const posicaoDesejadaX = Math.floor(dragX / this.gridSize);
        const gridY = Math.floor(gameObject.y / this.gridSize);
        
        // Mover apenas um quadrado de cada vez na direção desejada
        let novaPosicaoX = posicaoAtualX;
        
        if (posicaoDesejadaX > posicaoAtualX) {
          // Tentativa de mover para a direita
          novaPosicaoX = posicaoAtualX + 1;
        } else if (posicaoDesejadaX < posicaoAtualX) {
          // Tentativa de mover para a esquerda
          novaPosicaoX = posicaoAtualX - 1;
        }
        
        // Verificar se a nova posição é válida
        if (novaPosicaoX >= 0 && novaPosicaoX + comprimento - 1 <= 5 && novaPosicaoX !== posicaoAtualX) {
          if (this.isPosicaoLivre(novaPosicaoX, gridY, id, orient, comprimento)) {
            gameObject.x = novaPosicaoX * this.gridSize;
          }
        }
      } else {
        const posicaoAtualY = Math.floor(gameObject.y / this.gridSize);
        const posicaoDesejadaY = Math.floor(dragY / this.gridSize);
        const gridX = Math.floor(gameObject.x / this.gridSize);
        
        // Mover apenas um quadrado de cada vez na direção desejada
        let novaPosicaoY = posicaoAtualY;
        
        if (posicaoDesejadaY > posicaoAtualY) {
          // Tentativa de mover para baixo
          novaPosicaoY = posicaoAtualY + 1;
        } else if (posicaoDesejadaY < posicaoAtualY) {
          // Tentativa de mover para cima
          novaPosicaoY = posicaoAtualY - 1;
        }
        
        // Verificar se a nova posição é válida
        if (novaPosicaoY >= 0 && novaPosicaoY + comprimento - 1 <= 5 && novaPosicaoY !== posicaoAtualY) {
          if (this.isPosicaoLivre(gridX, novaPosicaoY, id, orient, comprimento)) {
            gameObject.y = novaPosicaoY * this.gridSize;
          }
        }
      }
    });

    this.input.on('dragend', (pointer, gameObject) => {
      if (gameObject.getData('id') === 'H0' && gameObject.x >= this.gridSize * 4) {
        this.sound.play('vitoria');
        this.scene.start('GameOverScene', { proximoNivel: this.nivelAtual + 1 });
      } else {
        this.sound.play('motor', { volume: 0.3 });
      }
    });
  }

  isPosicaoLivre(x, y, id, orient, comprimento) {
    // Verificar se todas as posições estão dentro dos limites da grid
    for (let i = 0; i < comprimento; i++) {
      const cx = orient === 'horizontal' ? x + i : x;
      const cy = orient === 'vertical' ? y + i : y;
      
      if (cx < 0 || cy < 0 || cx > 5 || cy > 5) {
        return false;
      }
    }

    // Verificar colisão com outros carros
    for (const carro of this.carros) {
      if (carro.getData('id') === id) continue;

      const otherOrient = carro.getData('orientacao');
      const otherX = Math.floor(carro.x / this.gridSize);
      const otherY = Math.floor(carro.y / this.gridSize);
      const otherLen = carro.getData('comprimento');

      // Verificar se há sobreposição
      for (let i = 0; i < comprimento; i++) {
        const cx = orient === 'horizontal' ? x + i : x;
        const cy = orient === 'vertical' ? y + i : y;

        for (let j = 0; j < otherLen; j++) {
          const ox = otherOrient === 'horizontal' ? otherX + j : otherX;
          const oy = otherOrient === 'vertical' ? otherY + j : otherY;

          if (cx === ox && cy === oy) {
            return false;
          }
        }
      }
    }

    return true;
  }

  createGrid() {
    const graphics = this.add.graphics({ lineStyle: { width: 1, color: 0xcccccc } });
    for (let i = 0; i <= 6; i++) {
      graphics.strokeLineShape(new Phaser.Geom.Line(i * this.gridSize, 0, i * this.gridSize, 600));
      graphics.strokeLineShape(new Phaser.Geom.Line(0, i * this.gridSize, 600, i * this.gridSize));
    }
  }

  createNivel(nivel) {
  const criados = {};
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      const val = nivel[y][x];
      if (val && !criados[val]) {
        // Detectar orientação dinamicamente
        let horizontal = false;
        if (x < 5 && nivel[y][x + 1] === val) horizontal = true;
        else if (y < 5 && nivel[y + 1][x] === val) horizontal = false;

        let spriteKey;
        if (val === 'H0') spriteKey = 'carro_vermelho';
        else if (val.startsWith('C')) spriteKey = 'camiao';
        else if (val.startsWith('M')) spriteKey = 'mota';
        else spriteKey = 'carro_azul';

        const comprimento = val.startsWith('C') ? 3 : val.startsWith('M') ? 1 : 2;

        const sprite = this.add.sprite(
          x * this.gridSize,
          y * this.gridSize,
          spriteKey
        );

        if (horizontal) {
          sprite.setDisplaySize(this.gridSize * comprimento, this.gridSize);
          sprite.setOrigin(0, 0);
        } else {
          sprite.setDisplaySize(this.gridSize * comprimento, this.gridSize);
          sprite.setAngle(-90);
          sprite.setOrigin(1, 0);
        }

        sprite.setData('id', val);
        sprite.setData('orientacao', horizontal ? 'horizontal' : 'vertical');
        sprite.setData('comprimento', comprimento);
        sprite.setInteractive({ draggable: true });
        this.input.setDraggable(sprite);

        this.carros.push(sprite);
        criados[val] = true;
      }
    }
  }
}

}