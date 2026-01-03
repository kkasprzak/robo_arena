import Phaser from 'phaser';

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        // Tworzenie placeholder grafiki w zależności od typu
        const textureKey = `powerup_${type}`;
        if (!scene.textures.exists(textureKey)) {
            const graphics = scene.add.graphics();
            const color = type === 'speed' ? 0x0088ff : 0xffff00; // Niebieski dla speed, żółty dla firerate
            const glowColor = type === 'speed' ? 0x44aaff : 0xffff88; // Jaśniejszy glow
            
            // Zewnętrzny glow
            graphics.fillStyle(glowColor, 0.6);
            graphics.fillCircle(12, 12, 11);
            // Główny kolor
            graphics.fillStyle(color);
            graphics.fillCircle(12, 12, 9);
            // Środek (jaśniejszy)
            graphics.fillStyle(type === 'speed' ? 0x66bbff : 0xffffaa);
            graphics.fillCircle(12, 12, 5);
            graphics.generateTexture(textureKey, 24, 24);
            graphics.destroy();
        }

        // Wywołanie konstruktora rodzica
        super(scene, x, y, textureKey);
        
        // Typ power-upa: 'speed' lub 'firerate' (po super())
        this.type = type;

        // Dodanie do fizyki (jeśli nie jest już dodany przez grupę)
        if (!this.body) {
            scene.physics.add.existing(this);
        }

        // Czas trwania efektu (w ms)
        this.duration = 5000; // 5 sekund

        // Ustawienie kolizji z granicami świata
        this.setCollideWorldBounds(false);

        // Animacja rotacji (opcjonalnie)
        this.setRotation(0);
    }

    update() {
        // Rotacja power-upa dla efektu wizualnego
        this.rotation += 0.02;

        // Auto-deactivate po wyjściu poza ekran (z marginesem) - dla object pooling
        const margin = 50;
        if (this.x < -margin || this.x > 800 + margin || 
            this.y < -margin || this.y > 600 + margin) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    // Metoda do resetowania power-upa (dla object pooling)
    reset(x, y, type) {
        this.type = type;
        
        // Upewnij się, że tekstura dla tego typu istnieje
        const textureKey = `powerup_${type}`;
        if (!this.scene.textures.exists(textureKey)) {
            const graphics = this.scene.add.graphics();
            const color = type === 'speed' ? 0x0088ff : 0xffff00;
            const glowColor = type === 'speed' ? 0x44aaff : 0xffff88;
            
            // Zewnętrzny glow
            graphics.fillStyle(glowColor, 0.6);
            graphics.fillCircle(12, 12, 11);
            // Główny kolor
            graphics.fillStyle(color);
            graphics.fillCircle(12, 12, 9);
            // Środek (jaśniejszy)
            graphics.fillStyle(type === 'speed' ? 0x66bbff : 0xffffaa);
            graphics.fillCircle(12, 12, 5);
            graphics.generateTexture(textureKey, 24, 24);
            graphics.destroy();
        }
        
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setRotation(0);
        
        // Zmień teksturę jeśli typ się zmienił
        if (!this.texture || this.texture.key !== textureKey) {
            this.setTexture(textureKey);
        }
    }
}

