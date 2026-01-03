# ROBO ARENA - Plan Implementacji
## Hackathon #1 - 5h Challenge

---

## 🎮 Koncepcja Gry

**Nazwa:** ROBO ARENA  
**Gatunek:** Top-down twin-stick shooter (inspiracja: Llamatron/Robotron)  
**Styl:** Retro arcade z nowoczesnym twistem

### Elevator Pitch
Gracz kontroluje robota w zamkniętej arenie. Fale wrogich robotów atakują z wszystkich stron. Cel: przetrwać jak najdłużej, zdobyć jak najwięcej punktów, zbierać power-upy i przechodzić przez kolejne fale coraz trudniejszych przeciwników.

### Główne Mechaniki
- **Ruch:** 8-kierunkowy ruch (WASD lub strzałki)
- **Strzelanie:** Automatyczne strzały w kierunku kursora myszy (twin-stick feel)
- **Wrogowie:** Różne typy robotów z prostą AI (chase player)
- **Power-upy:** Losowe drop'y zwiększające możliwości gracza
- **System fal:** Rosnąca trudność, więcej wrogów

---

## 🛠️ Tech Stack

### Główne Technologie
- **Silnik:** Phaser 3 (v3.80+)
- **Język:** JavaScript/TypeScript (dla szybkości: JavaScript)
- **Runtime:** Browser (Chrome/Firefox)
- **Build:** Vite (szybki dev server + hot reload)

### Uzasadnienie
- ✅ Phaser 3 = zero setup dla fizyki, kolizji, sprite'ów
- ✅ Browser = instant testing, łatwy deploy
- ✅ Vite = natychmiastowy reload, minimalna konfiguracja
- ✅ JavaScript = szybsze pisanie niż TypeScript (w 5h liczy się każda minuta)

### Assety
- **Grafika:** Kenney.nl (darmowe pixel art) + placeholdery (kolorowe kształty)
- **Dźwięki:** jsfxr.com (generowanie prostych efektów) - OPCJONALNE
- **Czcionki:** System fonts lub Google Fonts

---

## 📋 MVP Scope - Funkcjonalności Kluczowe

### MUST HAVE (Core MVP)
1. ✅ **Gracz**
   - Ruch w 8 kierunkach
   - Sprite z animacją (lub prosty placeholder)
   - HP system (3-5 życia)
   
2. ✅ **Strzelanie**
   - Pociski lecą w kierunku kursora
   - Auto-fire (przytrzymanie przycisku lub ciągłe strzały)
   - Kolizje pocisk-wróg
   
3. ✅ **Wrogowie**
   - Minimum 1 typ wroga (podstawowy chase AI)
   - Spawning z krawędzi areny
   - HP i śmierć wroga
   - Kolizja z graczem (damage)
   
4. ✅ **Arena**
   - Ograniczone granice (prostokąt)
   - Bouncing lub hard stop przy krawędziach
   
5. ✅ **Game Loop**
   - Start screen
   - Game Over screen zScore
   - Restart button
   - System punktacji
   
6. ✅ **System fal**
   - Wave counter
   - Rosnąca liczba wrogów
   - Krótka przerwa między falami

### NICE TO HAVE (Polish)
7. 🎨 **Power-upy**
   - Speed boost
   - Fire rate boost
   - Shield/temporary invincibility
   - Multi-shot
   
8. 🎨 **Różnorodność wrogów**
   - Fast enemy (mały, szybki)
   - Tank enemy (duży, wolny, więcej HP)
   - Shooter enemy (strzela do gracza)
   
9. 🎨 **Visual Polish**
   - Particle effects (eksplozje)
   - Screen shake
   - Health bar UI
   - Better sprites/animations
   
10. 🎨 **Audio**
    - Strzały
    - Eksplozje
    - Ambient music

### OUT OF SCOPE (Zostawiamy)
- ❌ Multiplayer
- ❌ Proceduralne levele
- ❌ Boss fights
- ❌ Upgrade system / meta progression
- ❌ Story/cutscenes
- ❌ High score persistence (localStorage - możliwe tylko jeśli zostanie czas)

---

## ⏱️ Timeline - Podział na Etapy (5h)

### 🕐 ETAP 1: Setup & Fundament (60 min) - 10:00-11:00
**Cel:** Działający projekt z graczem poruszającym się po arenie

- [x] Setup projektu (Vite + Phaser 3)
- [x] Podstawowa struktura plików
- [x] Stworzenie areny (granice)
- [x] Gracz sprite + ruch (8 kierunków)
- [x] Kamera i viewport
- [x] **Milestone:** Gracz porusza się po arenie, nie wychodzi poza granice

**Output:** Działająca arena z poruszającym się graczem

---

### 🕑 ETAP 2: Combat System (60 min) - 11:00-12:00
**Cel:** Gracz strzela, wrogowie się spawną i umierają

- [ ] System strzelania (pociski w kierunku kursora)
- [ ] Spawning wrogów (losowe pozycje przy krawędziach)
- [ ] Podstawowa AI wroga (chase player)
- [ ] Kolizje: pocisk-wróg, wróg-gracz
- [ ] Śmierć wroga (znika + punkty)
- [ ] HP gracza (damage od wrogów)
- [ ] **Milestone:** Można zabijać wrogów i otrzymywać damage

**Output:** Działający combat loop

---

### 🕒 ETAP 3: Game Loop & Waves (60 min) - 12:00-13:00
**Cel:** Kompletna gra z początkiem, końcem i systemem fal

- [ ] Start screen (Play button)
- [ ] Game Over screen (Score + Restart)
- [ ] System punktacji (UI)
- [ ] Wave system (licznik fali, rosnąca trudność)
- [ ] Przerwy między falami (3-5 sekund)
- [ ] HP UI (serca/bar)
- [ ] **Milestone:** Można zagrać pełną rundę od start do game over

**Output:** Kompletny game loop MVP

---

### 🕓 ETAP 4: Polish & Features (60 min) - 13:00-14:00
**Cel:** Dodanie power-upów, efektów, różnorodności

- [ ] Power-upy (minimum 2 typy)
  - Speed boost
  - Fire rate boost
- [ ] Drugi typ wroga (np. fast enemy)
- [ ] Particle effects (eksplozje przy śmierci)
- [ ] Screen shake (przy trafieniu gracza)
- [ ] Lepsze sprites/kolory
- [ ] Sound effects (opcjonalnie, jeśli szybko idzie)
- [ ] **Milestone:** Gra jest "juicy" i przyjemna w graniu

**Output:** Wypolerowana gra z efektami

---

### 🕔 ETAP 5: Finalizacja & Deploy (60 min) - 14:00-15:00
**Cel:** Bug fixing, balans, deploy

- [ ] Testing i bug fixing
- [ ] Balansowanie (HP, damage, spawn rate)
- [ ] Dodatkowe efekty wizualne jeśli czas pozwoli
- [ ] Instrukcja sterowania (overlay/start screen)
- [ ] Build produkcyjny
- [ ] Deploy (GitHub Pages / Netlify / itch.io)
- [ ] **Milestone:** Gra jest gotowa do pokazania i grania!

**Output:** Deployed, działające MVP dostępne online

---

## 🎯 Kryteria Sukcesu

### Minimum Viable Product (MUSI działać)
- ✅ Gracz może się poruszać i strzelać
- ✅ Wrogowie się spawną i atakują
- ✅ Można zabijać wrogów i otrzymywać punkty
- ✅ System fal działa
- ✅ Game Over i restart działają
- ✅ Gra jest grywalna przez minimum 2-3 minuty

### Success Indicators (Dodatkowo)
- 🎨 Gra wygląda przyzwoicie (kolory, efekty)
- 🎨 Jest minimum 1 power-up
- 🎨 Jest minimum 2 typy wrogów
- 🎨 Gra jest deployed i dostępna online

---

## 📁 Struktura Projektu (Planowana)

```
svc-colabroom/
├── .ai/
│   ├── Hackathon #1.md
│   └── plan.md (ten plik)
├── src/
│   ├── main.js              # Entry point
│   ├── scenes/
│   │   ├── BootScene.js     # Loading assets
│   │   ├── MenuScene.js     # Start screen
│   │   ├── GameScene.js     # Main game
│   │   └── GameOverScene.js # Game over
│   ├── entities/
│   │   ├── Player.js        # Player class
│   │   ├── Enemy.js         # Enemy base class
│   │   ├── Bullet.js        # Bullet class
│   │   └── PowerUp.js       # Power-up class
│   ├── managers/
│   │   ├── WaveManager.js   # Wave spawning logic
│   │   └── ScoreManager.js  # Score tracking
│   └── config.js            # Phaser config
├── public/
│   └── assets/
│       ├── sprites/         # Graphics
│       └── sounds/          # Audio (optional)
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Następne Kroki

1. **Utworzyć strukturę projektu**
2. **Zainstalować dependencies (Phaser 3 + Vite)**
3. **Rozpocząć ETAP 1: Setup & Fundament**

---

## 📝 Notatki i Decyzje

### Decyzje Techniczne
- **Strzelanie:** Kierunek = pozycja kursora (intuicyjniejsze niż 8 kierunków)
- **AI wrogów:** Prosty "chase player" z pathfinding w linii prostej
- **Spawning:** Z krawędzi areny (poza ekranem), losowe pozycje
- **Kolizje:** Phaser Arcade Physics (najprostsze, wystarczające)

### Usprawnienia AI Workflow
- Używać Cursor AI do generowania boilerplate
- Promptować konkretne funkcjonalności po kolei
- Testować często (co 15-20 min)
- Commitować po każdym działającym milestone

---

**Czas startu:** 10:00  
**Deadline:** 15:00  
**Status:** ⏳ READY TO START

Let's go! 🚀

