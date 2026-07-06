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