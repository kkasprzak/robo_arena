import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        // Odbieranie wyniku z GameScene
        this.finalScore = data.score || 0;
        this.wave = data.wave || 0;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // GAME OVER tekst
        this.add.text(width / 2, height / 2 - 120, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Wynik
        this.add.text(width / 2, height / 2 - 40, `Score: ${this.finalScore}`, {
            fontSize: '32px',
            fill: '#00ff00',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Wave
        this.add.text(width / 2, height / 2, `Wave: ${this.wave}`, {
            fontSize: '24px',
            fill: '#00ff00',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Przycisk RESTART
        const restartButton = this.add.text(width / 2, height / 2 + 80, 'RESTART', {
            fontSize: '36px',
            fill: '#00ff00',
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        restartButton.on('pointerover', () => {
            restartButton.setStyle({ fill: '#00aa00' });
        });

        restartButton.on('pointerout', () => {
            restartButton.setStyle({ fill: '#00ff00' });
        });

        restartButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Przycisk MENU
        const menuButton = this.add.text(width / 2, height / 2 + 140, 'MENU', {
            fontSize: '36px',
            fill: '#00ff00',
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        menuButton.on('pointerover', () => {
            menuButton.setStyle({ fill: '#00aa00' });
        });

        menuButton.on('pointerout', () => {
            menuButton.setStyle({ fill: '#00ff00' });
        });

        menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        // Możliwość nacisnąć Enter/R do restartu, Esc do menu
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('GameScene');
        });

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('GameScene');
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('MenuScene');
        });
    }
}

