import Phaser from 'phaser';
import Player from '../entities/Player.js';
import Bullet from '../entities/Bullet.js';
import Enemy from '../entities/Enemy.js';
import PowerUp from '../entities/PowerUp.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Ładowanie dźwięków
        this.load.audio('shoot', 'assets/sounds/shoot.wav');
        this.load.audio('explosion', 'assets/sounds/explosion.wav');
    }

    create() {
        // Ustawienie granic świata gry
        this.physics.world.setBounds(0, 0, 800, 600);
        
        // Wizualne granice areny
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0).setStrokeStyle(2, 0x00ff00);

        // Tworzenie tekstury dla cząsteczek (małe białe kółko)
        if (!this.textures.exists('particle')) {
            const graphics = this.add.graphics();
            graphics.fillStyle(0xffffff);
            graphics.fillCircle(0, 0, 4);
            graphics.generateTexture('particle', 8, 8);
            graphics.destroy();
        }

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

        // Utworzenie grupy power-upów z object pooling
        this.powerUpsGroup = this.physics.add.group({
            classType: PowerUp,
            maxSize: 10, // Maksymalna liczba power-upów w puli
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

        // Kolizje: gracz-powerup
        this.physics.add.overlap(
            this.player,
            this.powerUpsGroup,
            this.collectPowerUp,
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

        // UI - Power-ups (aktywne efekty)
        this.powerUpText = this.add.text(20, 560, '', {
            fontSize: '18px',
            fill: '#ffff00',
            fontFamily: 'monospace'
        }).setScrollFactor(0);

        // Particle emitter dla eksplozji (będzie resetowany przy każdej eksplozji)
        this.explosionEmitter = null;

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
        this.updatePowerUpUI();

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

        // Losowy wybór typu wroga (30% fast od fali 2+)
        let enemyType = 'normal';
        if (this.currentWave >= 2 && Phaser.Math.Between(1, 100) <= 30) {
            enemyType = 'fast';
        }

        // Pobieranie wroga z puli lub tworzenie nowego
        const enemy = this.enemiesGroup.get(x, y);
        
        if (enemy) {
            // Resetowanie wroga (dla recyklingu)
            enemy.reset(x, y, enemyType);
        } else {
            // Jeśli pula jest pełna, tworzymy nowego wroga
            const newEnemy = new Enemy(this, x, y, enemyType);
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

    updatePowerUpUI() {
        if (!this.player || !this.powerUpText) return;

        const activeEffects = [];
        
        if (this.player.speedBoostTimer) {
            activeEffects.push('⚡ SPEED BOOST');
        }
        
        if (this.player.fireRateBoostTimer) {
            activeEffects.push('🔥 FIRE RATE BOOST');
        }

        if (activeEffects.length > 0) {
            this.powerUpText.setText(activeEffects.join('  |  '));
        } else {
            this.powerUpText.setText('');
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
            // Odtwarzanie dźwięku eksplozji
            this.sound.play('explosion');
            
            // Eksplozja przy śmierci wroga
            this.createExplosion(enemy.x, enemy.y, enemy.enemyType);
            
            // Wróg zmarł - dodaj punkty i usuń
            this.score += 10;
            this.enemiesKilled++;
            
            // 20% szans na drop power-upa
            if (Phaser.Math.Between(1, 100) <= 20) {
                this.spawnPowerUp(enemy.x, enemy.y);
            }
            
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

        // Screen shake przy trafieniu
        this.cameras.main.shake(100, 0.01);

        // Sprawdź czy gracz umarł po otrzymaniu obrażeń
        if (player.hp <= 0 && !this.gameOverCalled) {
            this.gameOver();
            return;
        }

        // Krótka nietykalność (invincibility frames)
        player.setInvincible(1000); // 1 sekunda
    }

    spawnPowerUp(x, y) {
        // Losowy typ power-upa
        const types = ['speed', 'firerate'];
        const type = Phaser.Math.RND.pick(types);

        // Pobieranie power-upa z puli lub tworzenie nowego
        const powerUp = this.powerUpsGroup.get(x, y);
        
        if (powerUp) {
            // Resetowanie power-upa (dla recyklingu)
            powerUp.reset(x, y, type);
        } else {
            // Jeśli pula jest pełna, tworzymy nowego power-upa
            const newPowerUp = new PowerUp(this, x, y, type);
            this.powerUpsGroup.add(newPowerUp);
        }
    }

    collectPowerUp(player, powerUp) {
        if (!powerUp.active) return;

        // Aplikuj efekt w zależności od typu
        if (powerUp.type === 'speed') {
            player.applySpeedBoost(powerUp.duration);
        } else if (powerUp.type === 'firerate') {
            player.applyFireRateBoost(powerUp.duration);
        }

        // Deaktywacja power-upa (zwrot do puli)
        powerUp.setActive(false);
        powerUp.setVisible(false);
    }

    createExplosion(x, y, enemyType) {
        // Kolor eksplozji dopasowany do typu wroga
        const color = enemyType === 'fast' ? 0xff8800 : 0xff0000; // Pomarańczowy dla fast, czerwony dla normal
        
        // Liczba cząstek (8-12)
        const particleCount = Phaser.Math.Between(8, 12);
        
        // Utworzenie tymczasowego emitera dla tej eksplozji
        const emitter = this.add.particles(x, y, 'particle', {
            speed: { min: 50, max: 150 },
            scale: { start: 0.8, end: 0 },
            lifespan: 200,
            quantity: particleCount,
            tint: color,
            emitting: false
        });
        
        // Jednorazowa eksplozja
        emitter.explode(particleCount);
        
        // Usuń emiter po zakończeniu animacji
        this.time.delayedCall(250, () => {
            emitter.destroy();
        });
    }
}

