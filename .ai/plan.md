# ROBO ARENA - Implementation Plan
## Hackathon #1 - 5h Challenge

---

## 🎮 Game Concept

**Name:** ROBO ARENA  
**Genre:** Top-down twin-stick shooter (inspired by: Llamatron/Robotron)  
**Style:** Retro arcade with a modern twist

### Elevator Pitch
Player controls a robot in a closed arena. Waves of hostile robots attack from all sides. Goal: survive as long as possible, earn as many points as possible, collect power-ups and progress through increasingly difficult waves of enemies.

### Core Mechanics
- **Movement:** 8-directional movement (WASD or arrows)
- **Shooting:** Auto-aim shots toward mouse cursor (twin-stick feel)
- **Enemies:** Different types of robots with simple AI (chase player)
- **Power-ups:** Random drops that increase player capabilities
- **Wave system:** Increasing difficulty, more enemies

---

## 🛠️ Tech Stack

### Main Technologies
- **Engine:** Phaser 3 (v3.80+)
- **Language:** JavaScript/TypeScript (for speed: JavaScript)
- **Runtime:** Browser (Chrome/Firefox)
- **Build:** Vite (fast dev server + hot reload)

### Rationale
- ✅ Phaser 3 = zero setup for physics, collisions, sprites
- ✅ Browser = instant testing, easy deploy
- ✅ Vite = instant reload, minimal configuration
- ✅ JavaScript = faster to write than TypeScript (in 5h every minute counts)

### Assets
- **Graphics:** Kenney.nl (free pixel art) + placeholders (colored shapes)
- **Sounds:** jsfxr.com (generating simple effects) - OPTIONAL
- **Fonts:** System fonts or Google Fonts

---

## 📋 MVP Scope - Key Features

### MUST HAVE (Core MVP)
1. ✅ **Player**
   - 8-directional movement
   - Sprite with animation (or simple placeholder)
   - HP system (3-5 lives)
   
2. ✅ **Shooting**
   - Bullets fly toward cursor
   - Auto-fire (hold button or continuous shots)
   - Bullet-enemy collisions
   
3. ✅ **Enemies**
   - Minimum 1 enemy type (basic chase AI)
   - Spawning from arena edges
   - HP and enemy death
   - Collision with player (damage)
   
4. ✅ **Arena**
   - Limited boundaries (rectangle)
   - Bouncing or hard stop at edges
   
5. ✅ **Game Loop**
   - Start screen
   - Game Over screen with Score
   - Restart button
   - Scoring system
   
6. ✅ **Wave system**
   - Wave counter
   - Increasing number of enemies
   - Short break between waves

### NICE TO HAVE (Polish)
7. 🎨 **Power-ups**
   - Speed boost
   - Fire rate boost
   - Shield/temporary invincibility
   - Multi-shot
   
8. 🎨 **Enemy Variety**
   - Fast enemy (small, fast)
   - Tank enemy (big, slow, more HP)
   - Shooter enemy (shoots at player)
   
9. 🎨 **Visual Polish**
   - Particle effects (explosions)
   - Screen shake
   - Health bar UI
   - Better sprites/animations
   
10. 🎨 **Audio**
    - Shots
    - Explosions
    - Ambient music

### OUT OF SCOPE (We Skip)
- ❌ Multiplayer
- ❌ Procedural levels
- ❌ Boss fights
- ❌ Upgrade system / meta progression
- ❌ Story/cutscenes
- ❌ High score persistence (localStorage - possible only if time permits)

---

## ⏱️ Timeline - Stage Breakdown (5h)

### 🕐 STAGE 1: Setup & Foundation (60 min) - 10:00-11:00
**Goal:** Working project with player moving around arena

- [x] Project setup (Vite + Phaser 3)
- [x] Basic file structure
- [x] Create arena (boundaries)
- [x] Player sprite + movement (8 directions)
- [x] Camera and viewport
- [x] **Milestone:** Player moves around arena, doesn't go beyond boundaries

**Output:** Working arena with moving player

---

### 🕑 STAGE 2: Combat System (60 min) - 11:00-12:00
**Goal:** Player shoots, enemies spawn and die

- [x] Shooting system (bullets toward cursor)
- [x] Enemy spawning (random positions at edges)
- [x] Basic enemy AI (chase player)
- [x] Collisions: bullet-enemy, enemy-player
- [x] Enemy death (disappears + points)
- [x] Player HP (damage from enemies)
- [x] **Milestone:** Can kill enemies and receive damage

**Output:** Working combat loop

---

### 🕒 STAGE 3: Game Loop & Waves (60 min) - 12:00-13:00
**Goal:** Complete game with beginning, end and wave system

- [x] Start screen (Play button)
- [x] Game Over screen (Score + Restart)
- [x] Scoring system (UI)
- [x] Wave system (wave counter, increasing difficulty)
- [x] Breaks between waves (3-5 seconds)
- [x] HP UI (hearts/bar)
- [x] **Milestone:** Can play full round from start to game over

**Output:** Complete game loop MVP

---

### 🕓 STAGE 4: Polish & Features (60 min) - 13:00-14:00
**Goal:** Adding power-ups, effects, variety

- [x] Power-ups (minimum 2 types)
  - Speed boost
  - Fire rate boost
- [x] Second enemy type (e.g., fast enemy)
- [x] Particle effects (explosions on death)
- [x] Screen shake (when player is hit)
- [x] Better sprites/colors
- [ ] Sound effects (optional, if time permits)
- [x] **Milestone:** Game is "juicy" and fun to play

**Output:** Polished game with effects

---

### 🕔 STAGE 5: Finalization & Deploy (60 min) - 14:00-15:00
**Goal:** Bug fixing, balance, deploy

- [ ] Testing and bug fixing
- [ ] Balancing (HP, damage, spawn rate)
- [ ] Additional visual effects if time permits
- [ ] Control instructions (overlay/start screen)
- [ ] Production build
- [ ] Deploy (GitHub Pages / Netlify / itch.io)
- [ ] **Milestone:** Game is ready to show and play!

**Output:** Deployed, working MVP available online

---

## 🎯 Success Criteria

### Minimum Viable Product (MUST work)
- ✅ Player can move and shoot
- ✅ Enemies spawn and attack
- ✅ Can kill enemies and receive points
- ✅ Wave system works
- ✅ Game Over and restart work
- ✅ Game is playable for at least 2-3 minutes

### Success Indicators (Additionally)
- 🎨 Game looks decent (colors, effects)
- 🎨 There is at least 1 power-up
- 🎨 There are at least 2 enemy types
- 🎨 Game is deployed and available online

---

## 📁 Project Structure (Planned)

```
svc-colabroom/
├── .ai/
│   ├── Hackathon #1.md
│   └── plan.md (this file)
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

## 🚀 Next Steps

1. **Create project structure**
2. **Install dependencies (Phaser 3 + Vite)**
3. **Start STAGE 1: Setup & Foundation**

---

## 📝 Notes and Decisions

### Technical Decisions
- **Shooting:** Direction = cursor position (more intuitive than 8 directions)
- **Enemy AI:** Simple "chase player" with straight-line pathfinding
- **Spawning:** From arena edges (off-screen), random positions
- **Collisions:** Phaser Arcade Physics (simplest, sufficient)

### AI Workflow Improvements
- Use Cursor AI to generate boilerplate
- Prompt specific features one by one
- Test frequently (every 15-20 min)
- Commit after each working milestone

---

**Start time:** 10:00  
**Deadline:** 15:00  
**Status:** ⏳ READY TO START

Let's go! 🚀
