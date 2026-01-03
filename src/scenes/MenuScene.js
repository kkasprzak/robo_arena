import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Tytuł gry
        this.add.text(width / 2, height / 2 - 100, 'ROBO ARENA', {
            fontSize: '64px',
            fill: '#00ff00',
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Instrukcje sterowania
        this.add.text(width / 2, height / 2 - 20, 'WASD - Move', {
            fontSize: '24px',
            fill: '#00ff00',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 20, 'Mouse - Shoot', {
            fontSize: '24px',
            fill: '#00ff00',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Przycisk PLAY
        const playButton = this.add.text(width / 2, height / 2 + 100, 'PLAY', {
            fontSize: '48px',
            fill: '#00ff00',
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Efekt hover
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#00aa00' });
        });

        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#00ff00' });
        });

        // Kliknięcie startuje grę
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Możliwość również nacisnąć Enter lub Spację
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('GameScene');
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}

