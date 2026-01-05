# 🎮 ROBO ARENA

**Retro top-down shooter built during a 5-hour AI hackathon**

[![Play Online](https://img.shields.io/badge/Play%20Online-GitHub%20Pages-brightgreen)](https://kkasprzak.github.io/robo_arena/)

![Game Preview](https://img.shields.io/badge/Status-Playable%20MVP-success)
![Tech Stack](https://img.shields.io/badge/Tech-Phaser%203%20%7C%20Vite-blue)

---

## 🕹️ Play Now

**👉 [https://kkasprzak.github.io/robo_arena/](https://kkasprzak.github.io/robo_arena/)**

---

## 📖 About The Project

ROBO ARENA is a classic top-down twin-stick shooter inspired by 80s arcade games (Robotron, Llamatron). Players control a robot in a closed arena, defending against waves of hostile units.

### 🎯 Hackathon Goal

This project was created as part of **"Top Gun for AI in Coding – Hackathon #1"** – a 5-hour challenge with the following objectives:
- Deliver a **working game MVP** in a very short time
- Test **efficient AI-assisted workflow** (Cursor AI + Claude)
- Demonstrate how quickly you can go from idea to playable game with modern tools

**Development Time:** 5 hours (10:00-15:00)  
**Result:** Fully playable game with wave system, power-ups, sound effects, and visual polish

---

## ✨ Features

### Core Gameplay
- ✅ **8-directional movement** (WASD/arrows)
- ✅ **Mouse-aimed shooting** (twin-stick feel)
- ✅ **HP system** with heart visualization
- ✅ **Wave system** with increasing difficulty
- ✅ **Score tracking** and wave counter

### Enemies
- ✅ **Normal Enemy** - standard speed, 1-2 HP
- ✅ **Fast Enemy** - faster, smaller, 1 HP
- ✅ Simple AI (chase player)
- ✅ Spawning from arena edges

### Power-ups (20% drop rate)
- ✅ **Speed Boost** - increased movement speed (5s)
- ✅ **Fire Rate Boost** - faster shooting (5s)
- ✅ UI displaying active power-ups

### Polish & Effects
- ✅ **Particle effects** - explosions on enemy death
- ✅ **Screen shake** - when player takes damage
- ✅ **Sound effects** - shooting and explosions
- ✅ **Object pooling** - performance optimization
- ✅ Start screen and Game Over screen

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Phaser 3** | Game engine (v3.80+) |
| **JavaScript** | Programming language |
| **Vite** | Build tool + dev server |
| **Kenney Assets** | Sprites (Space Shooter Extension) |
| **jsfxr** | Sound effect generation |
| **GitHub Pages** | Production hosting |

### Why This Stack?

- **Phaser 3** - ready-made physics, collisions, sprite management
- **Vite** - lightning-fast hot reload, zero configuration
- **JavaScript** - faster implementation than TypeScript (every minute counts in 5h)
- **Browser-based** - instant testing, easy deployment

---

## 🚀 Local Setup

```bash
# Install dependencies
npm install

# Dev server (hot reload)
npm run dev

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Game will be available locally at `http://localhost:3000/robo_arena/`

---

## 🎮 Controls

| Action | Keys |
|--------|------|
| Movement | `W` `A` `S` `D` or arrow keys |
| Shoot | Left mouse button (hold) |
| Aim | Mouse cursor position |

---

## 📁 Project Structure

```
svc-colabroom/
├── src/
│   ├── main.js              # Entry point + Phaser config
│   ├── scenes/
│   │   ├── MenuScene.js     # Start screen
│   │   ├── GameScene.js     # Main game logic
│   │   └── GameOverScene.js # End screen
│   └── entities/
│       ├── Player.js        # Player + shooting
│       ├── Enemy.js         # Enemies (normal/fast)
│       ├── Bullet.js        # Bullets + object pooling
│       └── PowerUp.js       # Power-ups + effects
├── public/
│   └── assets/
│       ├── sounds/          # Sound effects
│       └── sprites/         # Graphics (Kenney)
└── index.html
```

---

## 🧠 Development Process

### 5-Hour Timeline

1. **Setup & Foundation** (60 min)
   - Vite + Phaser 3 setup
   - Arena + player + movement

2. **Combat System** (60 min)
   - Shooting + enemy spawning
   - Collisions + HP system

3. **Game Loop & Waves** (60 min)
   - Start/Game Over screens
   - Wave system + scoring + UI

4. **Polish & Features** (60 min)
   - Power-ups
   - Fast enemy
   - Particle effects + screen shake
   - Sound effects

5. **Finalization** (60 min)
   - Testing + balancing
   - Deploy to GitHub Pages

### AI-Assisted Workflow

This project was built in **close collaboration with Cursor AI** (Claude Sonnet):
- AI generated boilerplate and code structure
- Prompting specific features step by step
- Frequent testing (every 15-20 min)
- Commit after each working milestone
- AI assistance with debugging and optimization

---

## 🎯 Hackathon Takeaways

### What Worked Well ✅
- Phaser 3 is excellent for rapid prototyping
- Object pooling from the start (bullets, enemies) = zero performance issues
- Simple placeholders first, easy asset swap later
- AI excels at boilerplate and project structure

### Lessons Learned 📝
- 5 hours is plenty of time for solid MVP with polish
- Plan in small, testable iterations
- Sound design makes huge difference in game feel
- Deploy early and often (catches production issues)

---

## 📊 Statistics

- **Lines of code:** ~1500
- **Implementation time:** 5 hours
- **Commits:** ~15
- **Bug fixing iterations:** ~5
- **Final file count:** 8 JS files + assets

---

## 🔗 Links

- **Play Online:** [kkasprzak.github.io/robo_arena](https://kkasprzak.github.io/robo_arena/)
- **GitHub Repo:** [github.com/kkasprzak/robo_arena](https://github.com/kkasprzak/robo_arena)
- **Phaser 3:** [phaser.io](https://phaser.io)
- **Kenney Assets:** [kenney.nl](https://kenney.nl)

---

## 👨‍💻 About This Project

This project is part of my portfolio showcasing **rapid prototyping capabilities** and **effective AI-assisted development workflow**. 

### 🎯 Project Goals
- Demonstrate ability to **quickly deliver working product** (5 hours from concept to deployment)
- Test and refine **AI collaboration strategies** for maximum efficiency
- Step outside comfort zone and tackle **entirely unfamiliar technology stack** (Phaser 3, JavaScript ecosystem, Vite, game development)
- Prove that complex projects can be prototyped rapidly with modern tools, even without prior experience in the domain

### ⚠️ Important Note on Code Quality

**This was a rapid prototyping exercise, not production code.**

During the hackathon, I did NOT:
- ❌ Review or refactor AI-generated code
- ❌ Focus on code architecture or long-term maintainability
- ❌ Apply production-ready practices

The goal was to **deliver a working, playable game in 5 hours** - proving that AI can dramatically accelerate prototyping and learning new technologies.

For production projects, I follow standard software engineering practices including code review, testing, refactoring, and comprehensive documentation.

### 📖 Full Retrospective

Want to learn more about the development process, AI workflow tactics, and lessons learned?

**Read the full hackathon retrospective:** [ai-development-retrospective.md](ai-development-retrospective.md)

Topics covered:
- Hierarchical breakdown strategy
- Two-model workflow (planning vs coding)
- Debug mode techniques
- What worked and what didn't
- Replicable tactics for AI-assisted development

---

More projects: [github.com/kkasprzak](https://github.com/kkasprzak)

---

## 🙏 Acknowledgments

This hackathon experiment was made possible thanks to **[Boldare](https://www.boldare.com/)** - my employer who sponsored the Cursor AI tokens used during this project. 

Boldare is a digital product development company that supports innovation and encourages employees to experiment with cutting-edge technologies. Their support enables developers like me to explore new tools and workflows, ultimately improving our craft.

Learn more about Boldare: [boldare.com](https://www.boldare.com/)

---

## 📄 License

MIT License - feel free to use and modify!

Assets: Kenney.nl (CC0 License)

---

**Made with ☕ and 🤖 AI during a 5-hour hackathon**
