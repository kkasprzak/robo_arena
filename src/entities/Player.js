import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, bulletsGroup) {
        // Tekstura 'player' jest ładowana w preload()
        super(scene, x, y, 'player');

        // Dodanie do sceny i fizyki
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Skalowanie sprite'a (sprite z Kenney jest większy niż placeholder)
        this.setScale(0.224);

        // Ustawienie kolizji z granicami świata
        this.setCollideWorldBounds(true);

        // Prędkość gracza
        this.speed = 200;

        // Input handling
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasdKeys = scene.input.keyboard.addKeys('W,S,A,D');

        // System strzelania
        this.shootCooldown = 0;
        this.shootDelay = 150; // ms między strzałami (~6 strzałów/s)
        this.bulletsGroup = bulletsGroup; // Referencja do grupy pocisków

        // System HP
        this.maxHP = 3;
        this.hp = this.maxHP;
        this.isInvincible = false;
        this.invincibilityTimer = null;

        // Power-up efekty
        this.baseSpeed = 200; // Bazowa prędkość
        this.baseShootDelay = 150; // Bazowe opóźnienie strzału
        this.speedBoostTimer = null;
        this.fireRateBoostTimer = null;
    }

    update(time, delta) {
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

        // Ustawienie velocity (używa this.speed, który może być zmodyfikowany przez power-up)
        this.setVelocity(moveX * this.speed, moveY * this.speed);

        // Obracanie sprite'a w kierunku kursora myszy
        // Korekta kąta: sprite z Kenney jest skierowany w górę, więc odejmujemy 90 stopni (Math.PI/2)
        const pointer = this.scene.input.activePointer;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY) - Math.PI / 2;
        this.setRotation(angle);

        // Aktualizacja cooldown strzelania
        if (this.shootCooldown > 0) {
            this.shootCooldown -= delta;
        }

        // Strzelanie (lewy przycisk myszy)
        if (pointer.isDown && this.shootCooldown <= 0) {
            this.shoot(pointer.worldX, pointer.worldY);
            this.shootCooldown = this.shootDelay;
        }
    }

    shoot(targetX, targetY) {
        // Odtwarzanie dźwięku strzału
        this.scene.sound.play('shoot');
        
        // Pobieranie pocisku z puli (object pooling)
        // get() zwraca pierwszy nieaktywny pocisk lub tworzy nowy jeśli brak
        const bullet = this.bulletsGroup.get(this.x, this.y);
        
        if (bullet) {
            // Resetowanie pocisku (dla recyklingu) lub pierwsze użycie
            bullet.reset(this.x, this.y, targetX, targetY);
        }
    }

    takeDamage(amount) {
        if (this.isInvincible) return;

        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.setActive(false);
        }
    }

    setInvincible(duration) {
        this.isInvincible = true;
        
        // Anuluj poprzedni timer jeśli istnieje
        if (this.invincibilityTimer) {
            this.scene.time.removeEvent(this.invincibilityTimer);
        }

        // Wizualna informacja o nietykalności (miganie)
        const blinkInterval = 100; // ms między miganiami
        const blinkCount = Math.floor(duration / blinkInterval);
        let blinkCounter = 0;

        const blinkTimer = this.scene.time.addEvent({
            delay: blinkInterval,
            callback: () => {
                this.setAlpha(this.alpha === 1 ? 0.5 : 1);
                blinkCounter++;
                if (blinkCounter >= blinkCount) {
                    this.setAlpha(1); // Przywróć pełną widoczność
                    this.scene.time.removeEvent(blinkTimer);
                }
            },
            callbackScope: this,
            repeat: blinkCount - 1
        });

        // Ustaw timer na wyłączenie nietykalności
        this.invincibilityTimer = this.scene.time.delayedCall(duration, () => {
            this.isInvincible = false;
            this.invincibilityTimer = null;
            this.setAlpha(1); // Upewnij się, że alpha jest resetowane
        });
    }

    applySpeedBoost(duration) {
        // Anuluj poprzedni timer jeśli istnieje
        if (this.speedBoostTimer) {
            this.scene.time.removeEvent(this.speedBoostTimer);
        }

        // Zwiększ prędkość o 50% (speed * 1.5)
        this.speed = this.baseSpeed * 1.5;

        // Ustaw timer na reset prędkości
        this.speedBoostTimer = this.scene.time.delayedCall(duration, () => {
            this.speed = this.baseSpeed;
            this.speedBoostTimer = null;
        });
    }

    applyFireRateBoost(duration) {
        // Anuluj poprzedni timer jeśli istnieje
        if (this.fireRateBoostTimer) {
            this.scene.time.removeEvent(this.fireRateBoostTimer);
        }

        // Zmniejsz opóźnienie strzału o połowę (strzelanie 2x szybciej)
        this.shootDelay = this.baseShootDelay / 2;

        // Ustaw timer na reset opóźnienia strzału
        this.fireRateBoostTimer = this.scene.time.delayedCall(duration, () => {
            this.shootDelay = this.baseShootDelay;
            this.fireRateBoostTimer = null;
        });
    }
}

