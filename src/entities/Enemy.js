import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Tworzenie placeholder grafiki (czerwony prostokąt)
        if (!scene.textures.exists('enemy')) {
            const graphics = scene.add.graphics();
            graphics.fillStyle(0xff0000); // Czerwony kolor
            graphics.fillRect(0, 0, 24, 24);
            graphics.generateTexture('enemy', 24, 24);
            graphics.destroy();
        }

        // Wywołanie konstruktora rodzica
        super(scene, x, y, 'enemy');

        // Dodanie do fizyki (jeśli nie jest już dodany przez grupę)
        if (!this.body) {
            scene.physics.add.existing(this);
        }

        // Prędkość wroga
        this.speed = 80;

        // HP wroga (1-2)
        this.maxHP = Phaser.Math.Between(1, 2);
        this.hp = this.maxHP;

        // Ustawienie kolizji z granicami świata
        this.setCollideWorldBounds(true);
    }

    update() {
        // AI: chase player (ruch w kierunku gracza)
        if (this.scene && this.scene.player && this.scene.player.active) {
            const dx = this.scene.player.x - this.x;
            const dy = this.scene.player.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Normalizacja i ustawienie velocity
            if (distance > 0) {
                const vx = (dx / distance) * this.speed;
                const vy = (dy / distance) * this.speed;
                this.setVelocity(vx, vy);
            }
        } else {
            // Jeśli gracz nie istnieje, zatrzymaj się
            this.setVelocity(0, 0);
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            return true; // Wróg zmarł
        }
        return false; // Wróg żyje
    }

    // Metoda do resetowania wroga (dla object pooling)
    reset(x, y) {
        this.setPosition(x, y);
        this.setVelocity(0, 0);
        this.setActive(true);
        this.setVisible(true);
        this.maxHP = Phaser.Math.Between(1, 2);
        this.hp = this.maxHP;
    }
}

