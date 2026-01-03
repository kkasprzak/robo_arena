import Phaser from 'phaser';
import Player from '../entities/Player.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Ustawienie granic świata gry
        this.physics.world.setBounds(0, 0, 800, 600);
        
        // Wizualne granice areny
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0).setStrokeStyle(2, 0x00ff00);

        // Tworzenie gracza na środku areny
        this.player = new Player(this, 400, 300);
    }

    update() {
        // Aktualizacja gracza (ruch)
        if (this.player) {
            this.player.update();
        }
    }
}

