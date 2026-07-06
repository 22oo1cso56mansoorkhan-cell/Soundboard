const sounds = [
  { name: 'Applause', icon: 'fa-regular fa-circle-check' },
  { name: 'Bass', icon: 'fa-solid fa-bass' },
  { name: 'Bell', icon: 'fa-solid fa-bell' },
  { name: 'Clap', icon: 'fa-regular fa-hand' },
  { name: 'Crash', icon: 'fa-solid fa-bolt' },
  { name: 'Drum', icon: 'fa-solid fa-drum' },
  { name: 'Guitar', icon: 'fa-solid fa-guitar' },
  { name: 'Hi-hat', icon: 'fa-solid fa-hat-cowboy' },
  { name: 'Kick', icon: 'fa-solid fa-shoe-prints' },
  { name: 'Snare', icon: 'fa-solid fa-drumstick' },
  { name: 'Synth', icon: 'fa-solid fa-wave-square' },
  { name: 'Wood', icon: 'fa-solid fa-tree' }
];

const grid = document.getElementById('soundGrid');

sounds.forEach((sound) => {
  const pad = document.createElement('div');
  pad.className = 'sound-pad';
  pad.innerHTML = `<i class="${sound.icon}"></i> ${sound.name}`;
  grid.appendChild(pad);
});

const audioElements = {};

sounds.forEach((sound, index) => {
  const pad = grid.children[index];
  const audio = new Audio();
  audio.src = `https://www.soundjay.com/misc/sounds/${sound.name.toLowerCase()}-01.mp3`;
  audio.preload = 'auto';
  audioElements[sound.name] = audio;
  
  pad.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
  });
});

// ===== COMMIT 4: volume slider functionality =====
const volumeSlider = document.getElementById('volumeSlider');

volumeSlider.addEventListener('input', (e) => {
  const volume = parseFloat(e.target.value);
  Object.values(audioElements).forEach(audio => {
    audio.volume = volume;
  });
});

// ===== COMMIT 5: stop all functionality =====
const stopAllBtn = document.getElementById('stopAllBtn');

stopAllBtn.addEventListener('click', () => {
  Object.values(audioElements).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
});

// ===== COMMIT 6: load fallback sounds if originals fail =====
sounds.forEach((sound, index) => {
  const pad = grid.children[index];
  const audio = audioElements[sound.name];
  
  audio.addEventListener('error', () => {
    // Fallback to alternative source
    audio.src = `https://www.soundjay.com/button/beep-${index + 1}.mp3`;
    audio.load();
  });
});

// ===== COMMIT 7: visual feedback on play =====
sounds.forEach((sound, index) => {
  const pad = grid.children[index];
  const audio = audioElements[sound.name];
  
  audio.addEventListener('play', () => {
    pad.style.background = 'rgba(250, 204, 21, 0.25)';
    pad.style.borderColor = '#facc15';
    pad.style.transform = 'scale(0.97)';
  });
  
  audio.addEventListener('ended', () => {
    pad.style.background = '';
    pad.style.borderColor = '';
    pad.style.transform = '';
  });
});

// ===== COMMIT 8: keyboard shortcuts =====
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const keyMap = 'abcdefghijkl'.split('');
  const index = keyMap.indexOf(key);
  if (index !== -1 && index < sounds.length) {
    const pad = grid.children[index];
    if (pad) pad.click();
  }
});

// ===== COMMIT 9: volume display =====
const volumeDisplay = document.createElement('span');
volumeDisplay.style.cssText = 'color: #94a3b8; font-size: 0.85rem; min-width: 35px; text-align: center;';
const volSection = document.querySelector('.volume-section');
volSection.insertBefore(volumeDisplay, volSection.lastElementChild);

volumeSlider.addEventListener('input', (e) => {
  const volume = parseFloat(e.target.value);
  volumeDisplay.textContent = Math.round(volume * 100) + '%';
});

// ===== COMMIT 10: final polish and cleanup =====
// Ensure all sounds work properly
sounds.forEach((sound, index) => {
  const pad = grid.children[index];
  const audio = audioElements[sound.name];
  
  // Add tooltip with keyboard shortcut
  const keyMap = 'abcdefghijkl'.split('');
  const shortcut = keyMap[index] || '';
  pad.innerHTML = `<i class="${sound.icon}"></i> ${sound.name}<span>${shortcut}</span>`;
  
  // Set initial volume
  audio.volume = parseFloat(volumeSlider.value);
  
  // Handle multiple clicks properly
  pad.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.currentTime = 0;
    audio.play().catch(err => console.log('Playback error:', err));
  });
});

// Set initial volume display
volumeDisplay.textContent = Math.round(parseFloat(volumeSlider.value) * 100) + '%';

console.log('🎵 Soundboard loaded with 12 sounds!');
console.log('🔊 Volume slider and stop all button ready!');
console.log('⌨️ Keyboard shortcuts: keys A-L for pads 1-12');