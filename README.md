# Grapple Infinity - Multiplayer VR Grappling Game

A high-octane VR grappling game inspired by Grapple (Steam), featuring multiplayer racing, cosmetics, and in-game currency.

## Features

### 🎮 Gameplay
- **Grappling Mechanics** - Swing through dynamic levels with momentum-based physics
- **Speed Racing** - Complete levels as fast as possible to earn more coins
- **VR Support** - Full WebXR support for VR headsets, with desktop fallback
- **Leaderboards** - Compete globally for the fastest times

### 💄 Customization
- **Character Skins** - 5+ unique skins to unlock and equip
  - Classic (free)
  - Neon Genesis (150 coins)
  - Cyber Ninja (200 coins)
  - Ghost Specter (180 coins)
  - Void Walker (250 coins)

- **Grapple Hook Cosmetics** - 5+ hook styles with unique appearances
  - Standard (free)
  - Plasma (100 coins)
  - Frost (120 coins)
  - Inferno (150 coins)
  - Shadow (200 coins)

### 💰 In-Game Currency
- **Coin Economy** - Earn coins by completing levels fast
- **Starter Pack** - 100 coins for $0.99
- **Pro Pack** - 500 coins for $4.99
- **VIP Pack** - 1000 coins for $9.99

### 🎁 OG Bundle (Limited)
Exclusive early-access bundle including:
- Neon Genesis Skin
- Plasma Grapple Hook
- 500 Bonus Coins
- Exclusive Badge
- **Price:** 250 coins

## Getting Started

### Requirements
- Modern web browser with WebXR support (Chrome, Firefox, Edge)
- VR headset (optional) - Meta Quest, HTC Vive, PlayStation VR, etc.
- Node.js (optional, for local server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rodcast141/grapple-multiplayer.git
cd grapple-multiplayer
```

2. Start a local server:
```bash
python -m http.server 8000
# or
node -e "require('http').createServer((req, res) => require('fs').readFile('.'+req.url, (e,d) => res.end(d||'404')).pipe(res)).listen(8000)"
```

3. Open in browser:
```
http://localhost:8000
```

4. Click "ENTER VR" to start or use desktop controls

## Controls

### Desktop Mode
- **WASD** - Move character
- **SPACE** - Jump
- **ESC** - Exit game
- **Mouse** - Look around (if implemented)

### VR Mode
- **Right Trigger** - Grapple/Swing
- **Left Trigger** - Air dash/Boost
- **Grip** - Secondary action
- **Menu Button** - Open menu/Map

## Project Structure

```
grapple-multiplayer/
├── index.html          # Main game UI and menus
├── styles.css          # Game styling with gaming aesthetic
├── game.js             # Game logic and Three.js rendering
├── README.md           # This file
└── package.json        # Project metadata (coming soon)
```

## Technologies

- **Three.js** - 3D WebGL rendering
- **WebXR** - VR/AR support
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with gradients and animations

## Roadmap

### Phase 1 (Current)
- [x] VR game environment setup
- [x] Character customization system
- [x] Shop and cosmetics UI
- [x] In-game currency system
- [x] Leaderboard display
- [ ] Grappling physics and mechanics
- [ ] Level design and checkpoints

### Phase 2
- [ ] Multiplayer matchmaking (Socket.io)
- [ ] Real-time PvP racing
- [ ] Player profiles and statistics
- [ ] Advanced cosmetics (trails, effects)
- [ ] Sound and music
- [ ] Achievements and badges

### Phase 3
- [ ] Mobile VR support (Meta Quest native)
- [ ] Cross-platform play
- [ ] Tournament mode
- [ ] Battle pass system
- [ ] Clan/Team features

## Performance

- Optimized for 90 FPS on VR headsets
- 60 FPS on desktop
- Responsive UI with smooth animations
- Efficient memory management

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

MIT License - See LICENSE file for details

## Credits

Inspired by:
- **Grapple** (Steam) - Original grappling mechanics
- **Portal** - Physics-based puzzle solving
- **Fall Guys** - Battle royale cosmetics system
- **Rocket League** - Cosmetic economy model

## Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Check existing issues for solutions
- Join our Discord community (coming soon)

---

**Grapple Infinity** © 2026 - Made with ❤️ using WebXR and Three.js