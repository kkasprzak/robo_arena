import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Tworzenie placeholder grafiki (kolorowy prostokąt)
        const graphics = scene.add.graphics();
        graphics.fillStyle(0x00ff00); // Zielony kolor
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('player', 32, 32);
        graphics.destroy();

        // Wywołanie konstruktora rodzica
        super(scene, x, y, 'player');

        // Dodanie do sceny i fizyki
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Ustawienie kolizji z granicami świata
        this.setCollideWorldBounds(true);

        // Prędkość gracza
        this.speed = 200;

        // Input handling
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasdKeys = scene.input.keyboard.addKeys('W,S,A,D');
    }

    update() {
        // Reset velocity
        this.setVelocity(0, 0);

        // Ruch w 8 kierunkach
        let moveX = 0;
        let moveY = 0;

        // Strzałki lub WASD
        if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
            moveX = -1;
        } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
            moveX = 1;
        }

        if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
            moveY = -1;
        } else if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
            moveY = 1;
        }

        // Normalizacja diagonalnego ruchu (żeby nie był szybszy)
        if (moveX !== 0 && moveY !== 0) {
            moveX *= 0.707; // 1/sqrt(2)
            moveY *= 0.707;
        }

        // Ustawienie velocity
        this.setVelocity(moveX * this.speed, moveY * this.speed);
    }
}

