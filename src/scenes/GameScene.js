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

        // Wave System
        this.currentWave = 1;
        this.enemiesInWave = 5; // Start z 5 wrogami
        this.enemiesSpawned = 0;
        this.enemiesKilled = 0;
        this.waveActive = false;
        this.betweenWaves = true;
        this.spawnTimer = null;
        this.gameOverCalled = false; // Flaga zapobiegająca wielokrotnemu wywołaniu

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

        // UI - Score
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            fill: '#00ff00',
            fontFamily: 'monospace'
        }).setScrollFactor(0);

        // UI - Wave
        this.waveText = this.add.text(400, 20, 'WAVE 1', {
            fontSize: '28px',
            fill: '#00ff00',
            fontFamily: 'monospace',
            fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0);

        // UI - HP (serca)
        this.hpHearts = [];
        this.updateHPUI();

        // Start pierwszej fali po 3 sekundach
        this.time.delayedCall(3000, this.startWave, [], this);

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
        // Sprawdź czy gracz umarł (przed aktualizacją)
        if (this.player && this.player.hp <= 0 && !this.gameOverCalled) {
            this.gameOver();
            return; // Zatrzymaj aktualizację jeśli gracz umarł
        }

        // Aktualizacja gracza (ruch + strzelanie)
        if (this.player && this.player.active) {
            this.player.update(time, delta);
        }

        // Aktualizacja UI
        this.updateHPUI();

        // Grupy automatycznie aktualizują aktywne dzieci (runChildUpdate: true)
    }

    startWave() {
        this.betweenWaves = false;
        this.waveActive = true;
        this.enemiesSpawned = 0;
        this.enemiesKilled = 0;
        
        // Aktualizuj UI fali
        this.waveText.setText(`WAVE ${this.currentWave}`);

        // Spawn pierwszego wroga natychmiast
        this.spawnEnemy();

        // Timer spawnu wrogów w fali (co 1-2 sekundy)
        this.spawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 2000),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
    }

    spawnEnemy() {
        // Sprawdz czy możemy spawnować więcej wrogów w tej fali
        if (!this.waveActive || this.enemiesSpawned >= this.enemiesInWave) {
            if (this.spawnTimer) {
                this.spawnTimer.remove();
                this.spawnTimer = null;
            }
            return;
        }

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

        this.enemiesSpawned++;

        // Losowy czas do następnego spawnu (1-2 sekundy)
        if (this.spawnTimer && this.enemiesSpawned < this.enemiesInWave) {
            this.spawnTimer.delay = Phaser.Math.Between(1000, 2000);
        }
    }

    checkWaveComplete() {
        // Sprawdź czy wszyscy wrogowie z fali są zabici
        const activeEnemies = this.enemiesGroup.children.entries.filter(e => e.active);
        
        if (this.waveActive && this.enemiesSpawned >= this.enemiesInWave && activeEnemies.length === 0) {
            // Fala zakończona
            this.waveActive = false;
            this.betweenWaves = true;
            this.currentWave++;
            this.enemiesInWave += 2; // +2 wrogów na każdą falę
            
            // Przerwa między falami (3-5 sekund)
            const breakTime = Phaser.Math.Between(3000, 5000);
            this.time.delayedCall(breakTime, this.startWave, [], this);
            
            // Aktualizuj UI podczas przerwy
            this.waveText.setText(`WAVE ${this.currentWave - 1} COMPLETE!`);
            this.time.delayedCall(breakTime - 500, () => {
                if (this.waveText) {
                    this.waveText.setText(`WAVE ${this.currentWave} STARTING...`);
                }
            }, [], this);
        }
    }

    updateHPUI() {
        if (!this.player) return;

        // Usuń stare serca jeśli istnieją
        this.hpHearts.forEach(heart => {
            if (heart) heart.destroy();
        });
        this.hpHearts = [];

        // Utwórz nowe serca
        const heartSize = 24;
        const startX = 800 - 20 - (this.player.maxHP * (heartSize + 5));
        const y = 20;

        for (let i = 0; i < this.player.maxHP; i++) {
            const heart = this.add.text(startX + i * (heartSize + 5), y, '♥', {
                fontSize: `${heartSize}px`,
                fill: i < this.player.hp ? '#ff0000' : '#444444',
                fontFamily: 'monospace'
            }).setScrollFactor(0);
            this.hpHearts.push(heart);
        }
    }

    gameOver() {
        // Zapobiegaj wielokrotnemu wywołaniu
        if (this.gameOverCalled) return;
        this.gameOverCalled = true;

        // Zatrzymaj wszystkie timery
        if (this.spawnTimer) {
            this.spawnTimer.remove();
        }

        // Przejdź do GameOverScene z wynikiem
        this.scene.start('GameOverScene', {
            score: this.score,
            wave: this.currentWave
        });
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
            this.enemiesKilled++;
            enemy.setActive(false);
            enemy.setVisible(false);
            
            // Aktualizuj UI score
            this.scoreText.setText(`Score: ${this.score}`);
            
            // Sprawdź czy fala zakończona
            this.checkWaveComplete();
        }
    }

    hitPlayer(player, enemy) {
        // Wróg trafia gracza
        if (!player.active || !enemy.active) return;

        // Sprawdź czy gracz jest nietykalny (invincibility frames)
        if (player.isInvincible) return;

        // Gracz otrzymuje obrażenia
        player.takeDamage(1);

        // Sprawdź czy gracz umarł po otrzymaniu obrażeń
        if (player.hp <= 0 && !this.gameOverCalled) {
            this.gameOver();
            return;
        }

        // Krótka nietykalność (invincibility frames)
        player.setInvincible(1000); // 1 sekunda
    }
}

