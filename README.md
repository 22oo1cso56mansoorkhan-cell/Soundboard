# 🎵 Soundboard - 12 Synth Sounds

A browser-based soundboard with 12 synthesized sounds, volume control, and a stop-all button. Built with pure HTML, CSS, and JavaScript using the Web Audio API.



## 🎯 Features

- **12 Unique Sounds**: Kick, Snare, Hi-hat, Clap, Bass, Synth, Bell, Guitar, Crash, Wood, Drum, Applause
- **Volume Control**: Master volume slider with percentage display
- **Stop All Button**: Instantly stop all playing sounds
- **Visual Feedback**: Pads light up when activated
- **Keyboard Shortcuts**: Keys A-L for quick access to pads 1-12
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Glassmorphism UI**: Modern, sleek interface with blur effects
- **No External Dependencies**: All sounds generated via Web Audio API


## 📁 Project Structure

```
soundboard/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Sound synthesis and interaction logic
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Glassmorphism, flexbox, grid, responsive design
- **JavaScript (ES6)**: Web Audio API, DOM manipulation
- **Font Awesome**: Icon library for visual elements

## 🎹 Sound Synthesis

All sounds are generated in real-time using the Web Audio API:

- **Kick**: Low-frequency sine wave with exponential decay
- **Snare**: Sawtooth wave with white noise layer
- **Hi-hat**: High-pass filtered white noise
- **Clap**: Band-pass filtered noise with double pulse
- **Bass**: Low sawtooth wave with pitch drop
- **Synth**: Square wave with pitch sweep
- **Bell**: Sine wave with harmonic decay
- **Guitar**: Triangle wave with low-pass filtering
- **Crash**: Band-pass filtered noise with long decay
- **Wood**: Short sine burst with band-pass filter
- **Drum**: Low sine wave with quick decay
- **Applause**: White noise with multiple pulses

## ⌨️ Keyboard Shortcuts

| Key | Sound     | Key | Sound    |
|-----|-----------|-----|----------|
| A   | Kick      | G   | Bell     |
| B   | Snare     | H   | Guitar   |
| C   | Hi-hat    | I   | Crash    |
| D   | Clap      | J   | Wood     |
| E   | Bass      | K   | Drum     |
| F   | Synth     | L   | Applause |

## 📱 Responsive Design

The soundboard adapts to different screen sizes:
- **Desktop**: 4-column grid
- **Tablet**: 3-column grid
- **Mobile**: 2-column grid

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/soundboard.git
```

2. Navigate to the project directory:
```bash
cd soundboard
```

3. Open `index.html` in your browser:
```bash
# Using Python
python -m http.server 8000

# Using VS Code
# Install Live Server extension and click "Go Live"
```

### Usage

1. Click any sound pad to play the sound
2. Adjust the volume using the slider
3. Press the "Stop all" button to silence all sounds
4. Use keyboard shortcuts A-L for faster access

## 🔧 Customization

### Adding New Sounds

To add a new sound, update the `soundConfigs` array in `script.js`:

```javascript
const soundConfigs = [
  // ... existing sounds
  { name: 'YourSound', icon: 'fa-solid fa-icon', type: 'yoursound' }
];
```

Then create a synthesis function:

```javascript
function playYourSound(ctx, volume) {
  // Your Web Audio synthesis code here
}
```

Finally, add it to the `soundFunctions` object:

```javascript
const soundFunctions = {
  // ... existing sounds
  yoursound: playYourSound
};
```

### Changing Colors

Update the CSS variables in `style.css`:

```css
/* Main colors */
--primary: #facc15;        /* Gold accent */
--background: #0f172a;     /* Dark blue */
--card-bg: #1e293b;        /* Card background */
--text: #f0eef7;           /* Light text */
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 14+
- Edge 79+
- Opera 47+

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Web Audio API documentation
- The open-source community

---

**Made with ❤️ and Web Audio API**
