# Hackathon #1 - Retrospective: ROBO ARENA

**Developer:** Karol Kasprzak  
**Time:** 5 hours (10:00-15:00)  
**Result:** Working twin-stick shooter (1200 LOC, 15 commits)  
**AI Impact Score:** 10/10 (impossible without AI in this timeframe)

---

## 🎮 What Was Built?

**ROBO ARENA** - a top-down twin-stick shooter inspired by Llamatron/Robotron from the Commodore 64 era.

**Tech stack:**
- Phaser 3 (game engine)
- JavaScript (plain, no TypeScript for speed)
- Vite (build + hot reload)
- Canvas/browser
- Assets: Kenney.nl (pixel art) + jsfxr.com (sounds)

**Implemented features:**
- ✅ 8-directional movement (WASD) + auto-aim shooting
- ✅ Player HP/lives system
- ✅ Enemy AI (chase) + spawning
- ✅ Wave progression system
- ✅ Power-ups (speed boost, fire rate)
- ✅ Multiple enemy types (fast, normal)
- ✅ Particle effects + screen shake
- ✅ UI (score, HP, start/game over screens)
- ✅ Sound effects

**Live demo:** [kkasprzak.github.io/robo_arena](https://kkasprzak.github.io/robo_arena)  
**Master plan:** [plan.md](.ai/plan.md)

---

## 🧠 AI-Assisted Strategy

### Tools Used
- **Cursor IDE**
- **Claude Opus** → planning and task breakdown
- **Composer One** → rapid code implementation

### Workflow: Hierarchical Breakdown

```
Master Plan (Opus)
    ↓
Stages (5× ~1h each)
    ↓
Stage implementation plan (Opus)
    ↓
Sub-tasks → implementation (Composer One)
    ↓
Test → Commit → Next
```

**Key principles:**
1. **Never move forward without testing** - every step had to work before the next
2. **Commit after each stage** - rollback safety net
3. **Keep Composer One on a short leash** - the model tends to "run ahead" and write too much at once

### Single Task Implementation Process:
1. Take 1-3 sub-points from the plan (depending on complexity)
2. Give Composer One the task + reminder: "Execute only these steps, stop and wait for my decision"
3. End-to-end test of the application
4. If it works → commit → next
5. If it doesn't work → **Debug Mode in Cursor**

---

## 🔍 Debug Mode in Cursor - Game Changer

**How it works:**
1. Agent automatically adds **logs** to the code
2. Asks to reproduce the problem (click through)
3. Analyzes logs and identifies root cause
4. Proposes fix + implements it
5. Asks to test again

**Verdict:** Very helpful for non-obvious bugs. Instead of manually digging through console, the agent conducts the investigation itself.

---

## 📊 Metrics

| Metric | Value |
|--------|-------|
| Duration | 5h |
| Lines of code | ~1200 |
| Commits | 15 |
| Features implemented | 12+ |
| AI Impact Score | **10/10** |

**1200 LOC in 5h = ~240 LOC/h** (including testing and debugging)

---

## ✅ What Worked Best?

### 1. Hierarchical Breakdown (Master Plan → Stages → Sub-tasks)
- **Why:** Opus plans well, Composer One codes well. Separation of concerns.
- **Effect:** Zero context confusion, always clear "what am I doing now"

### 2. Technology Choice "For Speed"
- **JavaScript instead of TypeScript** - less boilerplate
- **Phaser 3** - physics + rendering out-of-the-box
- **Canvas/browser** - zero deployment setup (GitHub Pages)

### 3. Nostalgia-Driven Inspiration
- **Commodore 64 vibes** - simple concept that I understood well (except one issue, see below)
- AI proposed 10 game ideas, I chose the one closest to my heart → higher motivation + better intuition

### 4. Frequent Testing + Commits
- **Rollback safety** - when something went wrong, there was always a working state
- **Fast feedback loops** - bugs detected immediately, not after 3 features

---

## ❌ What Didn't Work / Lessons Learned

### 1. **Biggest Blocker: Not Knowing Game Mechanics** (~30 min lost)
**Problem:** I thought enemies should "explode" on contact with player (like in many games). In Robotron, enemies **deal HP damage repeatedly** - player must dodge them.

**What happened:**
- I tried to "fix" AI that was working correctly
- Agent was confused: plan said one thing, I was asking for another
- Went in circles for half an hour

**Lesson:** **Before hackathon: 15 min research on mechanics** (YouTube gameplay, old manuals). Even if you "remember" the game - verify.

### 2. **Repetitive Prompts to Composer One**
**Problem:** For each task had to remind: "Do only this, stop, don't go further"

**Lesson:** Prepare **reusable prompt snippet** or custom slash command in Cursor:
```
/implement-step
Execute only steps: [TASK]
After completion stop and wait for my decision.
Don't implement next points independently.
```

### 3. **GitHub Pages + Images (unresolved)**
**Problem:** Sprites worked locally, on GH Pages only audio. Root cause unknown, debugging attempts with Opus unsuccessful.

**Lesson:** Leave more time for deployment (15-20 min buffer at the end) or test deployment earlier (e.g., after stage 3/5).

---

## 🚀 If I Were to Do It Again...

### Before Hackathon (prep work):
1. ✅ **15 min game mechanics research** - watch gameplay on YouTube, read old manual
2. ✅ **Prepare snippet/slash command** for "implement step" prompt
3. ✅ **Test deployment pipeline** - make dummy commit and check if GH Pages works with assets

### During Hackathon:
1. ✅ **Deployment test after stage 3/5** - don't wait until the end
2. ✅ **20 min buffer at the end** - for unexpected build problems

### Tech Stack:
- No changes - JavaScript + Phaser + Vite worked great

---

## 💡 Replicable Tactics (Playbook)

### 1. **Two-Model Workflow**
```
Planning → Opus (better reasoning)
Coding → Composer One (faster, fewer tokens)
```

### 2. **Hierarchical Breakdown**
```
Master Plan (entire game)
  → Stages (5× ~1h)
    → Stage plan (details)
      → Sub-tasks (1-3 at a time to Composer)
```

### 3. **"Short Leash" for Composer One**
Always remind: "Only these steps, stop after". Without this, model "runs ahead" and creates mess.

### 4. **Debug Mode in Cursor**
When something doesn't work and you don't know why → debug mode, agent adds logs and identifies problem itself.

### 5. **Test → Commit → Next**
Never move forward without testing. Rollback always available.

### 6. **Game Choice: Nostalgia + Simplicity**
Game from childhood = better motivation + intuition of mechanics. Simple concepts (Pong, Snake, Breakout, Robotron) > complicated (Zelda, Metroidvania).

---

## 🎯 Key Insight

**AI doesn't replace thinking, but eliminates friction.**

I had to:
- ✅ Choose the game (AI proposed 10, I chose)
- ✅ Accept the plan (AI proposed, I evaluated feasibility)
- ✅ Test each step (AI wrote, I verified)
- ✅ Debug game logic (I caught error in my interpretation of mechanics)

AI did:
- ✅ 1200 lines of code in 5h (realistically impossible manually for someone without Phaser experience)
- ✅ Boilerplate, setup, Phaser API integration
- ✅ Debugging (logs + root cause analysis)

**Without AI:** I would spend 2h on Phaser documentation, 1h on setup, 2h on first mechanic.  
**With AI:** In 5h there was a **full game with 12 features**.

---

## 📈 Success Metric: 10/10

**"Impossible without AI"** - I, **without any prior experience with Phaser, JavaScript ecosystem (Vite), or game development** (my daily stack is PHP and Java), delivered in 5h a game that:
- Has all core mechanics
- Is playable and fun
- Has polish (particle effects, screen shake, audio)
- Is deployed (GitHub Pages)

**This is exactly the "Top Gun for AI" moment** - not "AI helped me", but **"AI enabled me to do something that would otherwise be out of reach in this time"**.

---

## 🔄 Next Steps for "Top Gun"

1. **Collect similar retrospectives from other participants** - compare workflows
2. **Identify common patterns** - which tactics work for everyone?
3. **Test "reusable prompt snippets"** - do they eliminate repetition?
4. **Second hackathon: different project type** - e.g., backend API, CLI tool - do the same tactics work?

---

## 📝 Important Note on Code Quality

**This was a rapid prototyping exercise focused on delivering a working product in 5 hours, not production-ready code.**

I did not review, modify, or refactor any AI-generated code during the hackathon. The goal was to step out of my comfort zone and prove that something seemingly difficult could be achieved quickly with modern AI tools. 

This project demonstrates:
- ✅ Rapid prototyping capabilities
- ✅ Effective AI workflow
- ✅ Ability to deliver working product under tight constraints
- ✅ Learning and applying new technologies quickly

It does NOT demonstrate:
- ❌ Production-ready code architecture
- ❌ Code review practices
- ❌ Long-term maintainability focus

For production projects, I follow standard software engineering practices including code review, testing, refactoring, and documentation.

---

**Repo:** https://github.com/kkasprzak/robo_arena  
**Live demo:** https://kkasprzak.github.io/robo_arena/

---

*Retrospective prepared based on post-hackathon reflection (2026-01-03)*

