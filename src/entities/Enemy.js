import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type = 'normal') {
        // Tworzenie placeholder grafiki w zależności od typu
        const textureKey = `enemy_${type}`;
        if (!scene.textures.exists(textureKey)) {
            const graphics = scene.add.graphics();
            const size = type === 'fast' ? 16 : 24;
            const color = type === 'fast' ? 0xff8800 : 0xff0000; // Pomarańczowy dla fast, czerwony dla normal
            const borderColor = type === 'fast' ? 0xffaa44 : 0xff4444; // Jaśniejsza obramówka
            
            // Wypełnienie
            graphics.fillStyle(color);
            graphics.fillRect(1, 1, size - 2, size - 2);
            // Obramówka
            graphics.lineStyle(1, borderColor);
            graphics.strokeRect(0, 0, size, size);
            graphics.generateTexture(textureKey, size, size);
            graphics.destroy();
        }

        // Wywołanie konstruktora rodzica (MUSI być przed użyciem this)
        super(scene, x, y, textureKey);
        
        // Typ wroga: 'normal' lub 'fast' (po super())
        this.enemyType = type;

        // Dodanie do fizyki (jeśli nie jest już dodany przez grupę)
        if (!this.body) {
            scene.physics.add.existing(this);
        }

        // Parametry w zależności od typu
        if (type === 'fast') {
            this.speed = 140; // Szybszy
            this.maxHP = 1; // Mniej HP
        } else {
            this.speed = 80; // Normalna prędkość
            this.maxHP = Phaser.Math.Between(1, 2); // HP 1-2
        }
        
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
    reset(x, y, type = 'normal') {
        this.enemyType = type;
        
        // Upewnij się, że tekstura dla tego typu istnieje
        const textureKey = `enemy_${type}`;
        if (!this.scene.textures.exists(textureKey)) {
            const graphics = this.scene.add.graphics();
            const size = type === 'fast' ? 16 : 24;
            const color = type === 'fast' ? 0xff8800 : 0xff0000;
            const borderColor = type === 'fast' ? 0xffaa44 : 0xff4444;
            
            // Wypełnienie
            graphics.fillStyle(color);
            graphics.fillRect(1, 1, size - 2, size - 2);
            // Obramówka
            graphics.lineStyle(1, borderColor);
            graphics.strokeRect(0, 0, size, size);
            graphics.generateTexture(textureKey, size, size);
            graphics.destroy();
        }
        
        this.setPosition(x, y);
        this.setVelocity(0, 0);
        this.setActive(true);
        this.setVisible(true);
        
        // Zmień teksturę jeśli typ się zmienił
        if (!this.texture || this.texture.key !== textureKey) {
            this.setTexture(textureKey);
        }
        
        // Parametry w zależności od typu
        if (type === 'fast') {
            this.speed = 140;
            this.maxHP = 1;
        } else {
            this.speed = 80;
            this.maxHP = Phaser.Math.Between(1, 2);
        }
        
        this.hp = this.maxHP;
    }
}

