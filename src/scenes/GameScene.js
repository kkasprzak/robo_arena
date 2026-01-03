import Phaser from 'phaser';
import Player from '../entities/Player.js';
import Bullet from '../entities/Bullet.js';
import Enemy from '../entities/Enemy.js';

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

        // Utworzenie grupy wrogów
        this.enemiesGroup = this.physics.add.group({
            classType: Enemy,
            maxSize: 30, // Maksymalna liczba wrogów
            runChildUpdate: true // Automatyczna aktualizacja dzieci
        });

        // Tworzenie gracza na środku areny (przekazujemy referencję do grupy)
        this.player = new Player(this, 400, 300, this.bulletsGroup);

        // System punktacji
        this.score = 0;

        // Kolizje: pocisk-wróg
        this.physics.add.overlap(
            this.bulletsGroup,
            this.enemiesGroup,
            this.hitEnemy,
            null,
            this
        );

        // Kolizje: wróg-gracz
        this.physics.add.overlap(
            this.player,
            this.enemiesGroup,
            this.hitPlayer,
            null,
            this
        );

        // Timer spawnu wrogów (co 2-3 sekundy)
        this.spawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 3000),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // Pierwszy spawn wroga po krótkim opóźnieniu
        this.time.delayedCall(1000, this.spawnEnemy, [], this);

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

        // Grupy automatycznie aktualizują aktywne dzieci (runChildUpdate: true)
    }

    spawnEnemy() {
        // Spawning poza ekranem (margin ~50px od krawędzi)
        const margin = 50;
        let x, y;
        const side = Phaser.Math.Between(0, 3); // 0=top, 1=right, 2=bottom, 3=left

        switch (side) {
            case 0: // Top
                x = Phaser.Math.Between(margin, 800 - margin);
                y = -margin;
                break;
            case 1: // Right
                x = 800 + margin;
                y = Phaser.Math.Between(margin, 600 - margin);
                break;
            case 2: // Bottom
                x = Phaser.Math.Between(margin, 800 - margin);
                y = 600 + margin;
                break;
            case 3: // Left
                x = -margin;
                y = Phaser.Math.Between(margin, 600 - margin);
                break;
        }

        // Pobieranie wroga z puli lub tworzenie nowego
        const enemy = this.enemiesGroup.get(x, y);
        
        if (enemy) {
            // Resetowanie wroga (dla recyklingu)
            enemy.reset(x, y);
        } else {
            // Jeśli pula jest pełna, tworzymy nowego wroga
            const newEnemy = new Enemy(this, x, y);
            this.enemiesGroup.add(newEnemy);
        }

        // Losowy czas do następnego spawnu (2-3 sekundy)
        this.spawnTimer.delay = Phaser.Math.Between(2000, 3000);
    }

    hitEnemy(bullet, enemy) {
        // Pocisk trafia wroga
        if (!bullet.active || !enemy.active) return;

        // Wróg otrzymuje obrażenia
        const isDead = enemy.takeDamage(bullet.damage);

        // Deaktywacja pocisku (zwrot do puli)
        bullet.setActive(false);
        bullet.setVisible(false);

        if (isDead) {
            // Wróg zmarł - dodaj punkty i usuń
            this.score += 10;
            enemy.setActive(false);
            enemy.setVisible(false);
        }
    }

    hitPlayer(player, enemy) {
        // Wróg trafia gracza
        if (!player.active || !enemy.active) return;

        // Sprawdź czy gracz jest nietykalny (invincibility frames)
        if (player.isInvincible) return;

        // Gracz otrzymuje obrażenia
        player.takeDamage(1);

        // Krótka nietykalność (invincibility frames)
        player.setInvincible(1000); // 1 sekunda
    }
}

