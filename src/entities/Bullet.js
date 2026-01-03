import Phaser from 'phaser';

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Tworzenie placeholder grafiki (jasnożółty z glow efektem)
        if (!scene.textures.exists('bullet')) {
            const graphics = scene.add.graphics();
            // Zewnętrzny glow (jaśniejszy, większy)
            graphics.fillStyle(0xffff88, 0.5);
            graphics.fillCircle(4, 4, 5);
            // Główny pocisk (jasnożółty)
            graphics.fillStyle(0xffff00);
            graphics.fillCircle(4, 4, 3);
            // Środek (jasny biały)
            graphics.fillStyle(0xffffff);
            graphics.fillCircle(4, 4, 1.5);
            graphics.generateTexture('bullet', 8, 8);
            graphics.destroy();
        }

        // Wywołanie konstruktora rodzica
        super(scene, x, y, 'bullet');

        // Dodanie do fizyki (jeśli nie jest już dodany przez grupę)
        if (!this.body) {
            scene.physics.add.existing(this);
        }

        // Prędkość pocisku
        this.speed = 400;

        // Damage pocisku
        this.damage = 1;

        // Ustawienie kolizji z granicami świata (do niszczenia poza ekranem)
        this.setCollideWorldBounds(false); // Nie blokujemy, tylko niszczymy poza ekranem
    }

    fire(x, y, targetX, targetY) {
        // Ustawienie pozycji startowej
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);

        // Obliczenie kierunku do celu
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalizacja i ustawienie velocity
        if (distance > 0) {
            const vx = (dx / distance) * this.speed;
            const vy = (dy / distance) * this.speed;
            this.setVelocity(vx, vy);
        }
    }

    update() {
        // Auto-deactivate po wyjściu poza ekran (z marginesem) - dla object pooling
        const margin = 50;
        if (this.x < -margin || this.x > 800 + margin || 
            this.y < -margin || this.y > 600 + margin) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    // Metoda do resetowania pocisku (dla object pooling)
    reset(x, y, targetX, targetY) {
        this.fire(x, y, targetX, targetY);
    }
}

