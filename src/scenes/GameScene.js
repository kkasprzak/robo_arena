import Phaser from 'phaser';
import Player from '../entities/Player.js';
import Bullet from '../entities/Bullet.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Ustawienie granic świata gry
        this.physics.world.setBounds(0, 0, 800, 600);
        
        // Wizualne granice areny
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0).setStrokeStyle(2, 0x00ff00);

        // Utworzenie grupy pocisków z object pooling
        this.bulletsGroup = this.physics.add.group({
            classType: Bullet,
            maxSize: 50, // Maksymalna liczba pocisków w puli
            runChildUpdate: true // Automatyczna aktualizacja dzieci
        });

        // Tworzenie gracza na środku areny (przekazujemy referencję do grupy)
        this.player = new Player(this, 400, 300, this.bulletsGroup);

        // Konfiguracja kamery i viewport
        // Ustawienie granic kamery (równych granicom areny)
        this.cameras.main.setBounds(0, 0, 800, 600);
        
        // Ustawienie zoomu (1 = brak zoomu)
        this.cameras.main.setZoom(1);
        
        // Ustawienie viewport - kamera pokrywa całą arenę
        // Dla areny stałej (800x600) kamera jest ustawiona na stałe
        this.cameras.main.setViewport(0, 0, 800, 600);
        
        // Ustawienie kamery na środku areny
        this.cameras.main.centerOn(400, 300);
    }

    update(time, delta) {
        // Aktualizacja gracza (ruch + strzelanie)
        if (this.player) {
            this.player.update(time, delta);
        }

        // Grupa pocisków automatycznie aktualizuje aktywne dzieci (runChildUpdate: true)
    }
}

