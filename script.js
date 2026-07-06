// Sound configuration with Web Audio API synthesis
const soundConfigs = [
  { name: 'Kick', icon: 'fa-solid fa-drum', type: 'kick' },
  { name: 'Snare', icon: 'fa-solid fa-drumstick', type: 'snare' },
  { name: 'Hi-hat', icon: 'fa-solid fa-hat-cowboy', type: 'hihat' },
  { name: 'Clap', icon: 'fa-regular fa-hand', type: 'clap' },
  { name: 'Bass', icon: 'fa-solid fa-bass', type: 'bass' },
  { name: 'Synth', icon: 'fa-solid fa-wave-square', type: 'synth' },
  { name: 'Bell', icon: 'fa-solid fa-bell', type: 'bell' },
  { name: 'Guitar', icon: 'fa-solid fa-guitar', type: 'guitar' },
  { name: 'Crash', icon: 'fa-solid fa-bolt', type: 'crash' },
  { name: 'Wood', icon: 'fa-solid fa-tree', type: 'wood' },
  { name: 'Drum', icon: 'fa-solid fa-drum', type: 'drum' },
  { name: 'Applause', icon: 'fa-regular fa-circle-check', type: 'applause' }
];

let audioContext = null;

// Sound synthesis functions
function playKick(ctx, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  
  gain.gain.setValueAtTime(volume * 0.8, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

function playSnare(ctx, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);
  
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  filter.Q.setValueAtTime(1, ctx.currentTime);
  
  gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  
  // White noise layer
  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.05);
}

function playHiHat(ctx, volume) {
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(7000, ctx.currentTime);
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.04);
}

function playClap(ctx, volume) {
  const bufferSize = ctx.sampleRate * 0.06;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, ctx.currentTime);
  filter.Q.setValueAtTime(0.5, ctx.currentTime);
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  // Add a second clap slightly later
  const noise2 = ctx.createBufferSource();
  const buffer2 = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data2 = buffer2.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data2[i] = Math.random() * 2 - 1;
  }
  noise2.buffer = buffer2;
  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(volume * 0.3, ctx.currentTime + 0.03);
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
  
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.06);
  noise2.start(ctx.currentTime + 0.03);
  noise2.stop(ctx.currentTime + 0.09);
  
  noise2.connect(filter);
  filter.connect(gain2);
  gain2.connect(ctx.destination);
}

function playBass(ctx, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(80, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.2);
  
  gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

function playSynth(ctx, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
  
  gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

function playBell(ctx, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3000, ctx.currentTime);
  
  gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}

function playGuitar(ctx, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.1);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, ctx.currentTime);
  
  gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

function playCrash(ctx, volume) {
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2000, ctx.currentTime);
  filter.Q.setValueAtTime(0.7, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3);
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.4);
}

function playWood(ctx, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
  
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, ctx.currentTime);
  filter.Q.setValueAtTime(2, ctx.currentTime);
  
  gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

function playDrum(ctx, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(300, ctx.currentTime);
  
  gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
}

function playApplause(ctx, volume) {
  const bufferSize = ctx.sampleRate * 0.3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3000, ctx.currentTime);
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  
  // Add multiple pulses
  const noise2 = ctx.createBufferSource();
  const buffer2 = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const data2 = buffer2.getChannelData(0);
  for (let i = 0; i < buffer2.length; i++) {
    data2[i] = Math.random() * 2 - 1;
  }
  noise2.buffer = buffer2;
  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(volume * 0.2, ctx.currentTime + 0.05);
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  noise2.connect(filter);
  filter.connect(gain2);
  gain2.connect(ctx.destination);
  
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.3);
  noise2.start(ctx.currentTime + 0.05);
  noise2.stop(ctx.currentTime + 0.25);
}

// Sound map
const soundFunctions = {
  kick: playKick,
  snare: playSnare,
  hihat: playHiHat,
  clap: playClap,
  bass: playBass,
  synth: playSynth,
  bell: playBell,
  guitar: playGuitar,
  crash: playCrash,
  wood: playWood,
  drum: playDrum,
  applause: playApplause
};

// Initialize audio context on user interaction
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }
  return audioContext;
}

// Create sound pads
const grid = document.getElementById('soundGrid');
const audioPlayers = [];

soundConfigs.forEach((config, index) => {
  const pad = document.createElement('div');
  pad.className = 'sound-pad';
  const keyMap = 'abcdefghijkl'.split('');
  const shortcut = keyMap[index] || '';
  pad.innerHTML = `<i class="${config.icon}"></i> ${config.name}<span>${shortcut}</span>`;
  grid.appendChild(pad);
  
  // Create audio player object
  const player = {
    element: pad,
    soundType: config.type,
    isPlaying: false
  };
  audioPlayers.push(player);
  
  // Play sound on click
  pad.addEventListener('click', () => {
    playSound(player);
  });
});

// Play sound function
function playSound(player) {
  const ctx = initAudioContext();
  const volume = parseFloat(document.getElementById('volumeSlider').value);
  
  // Reset visual
  player.element.classList.remove('active');
  
  // Play the sound
  const soundFunc = soundFunctions[player.soundType];
  if (soundFunc) {
    soundFunc(ctx, volume);
  }
  
  // Visual feedback
  player.element.classList.add('active');
  setTimeout(() => {
    player.element.classList.remove('active');
  }, 200);
}

// Volume slider
const volumeSlider = document.getElementById('volumeSlider');
const volumeDisplay = document.getElementById('volumeDisplay');

volumeSlider.addEventListener('input', (e) => {
  const volume = parseFloat(e.target.value);
  volumeDisplay.textContent = Math.round(volume * 100) + '%';
});

// Stop all button
const stopAllBtn = document.getElementById('stopAllBtn');

stopAllBtn.addEventListener('click', () => {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  // Remove active states
  audioPlayers.forEach(player => {
    player.element.classList.remove('active');
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const keyMap = 'abcdefghijkl'.split('');
  const index = keyMap.indexOf(key);
  if (index !== -1 && index < audioPlayers.length) {
    e.preventDefault();
    playSound(audioPlayers[index]);
  }
});

console.log('🎵 Soundboard loaded with 12 synthesized sounds!');
console.log('🔊 Volume slider and stop all button ready!');
console.log('⌨️ Keyboard shortcuts: keys A-L for pads 1-12');