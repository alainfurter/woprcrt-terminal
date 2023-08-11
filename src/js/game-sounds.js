let successSound = new Audio("/assets/sounds/success.mp3");
let looseSound = new Audio("/assets/sounds/loose.mp3");
let blipSound = new Audio("/assets/sounds/blip.mp3");
let mistakeSound = new Audio("/assets/sounds/mistake.mp3");

let buttonSound = new Audio("/assets/sounds/button.mp3");
let clickSound = new Audio("/assets/sounds/click.mp3");

let keys = [
  new Audio("/assets/sounds/key1.mp3"),
  new Audio("/assets/sounds/key2.mp3"),
  new Audio("/assets/sounds/key3.mp3"),
  new Audio("/assets/sounds/key4.mp3"),
];

function success() {
  successSound.play();
}

function loose() {
  looseSound.play();
}

function blip() {
  blipSound.play();
}

function mistake() {
  mistakeSound.play();
}

function button() {
  buttonSound.play();
}

function click() {
  clickSound.play();
}

function stopAllGameSounds() {
  successSound.pause();
  looseSound.pause();
  blipSound.pause();
  mistakeSound.pause();
}

function typeSound() {
  let i = Math.floor(Math.random() * keys.length);
  keys[i].currentTime = 0;
  keys[i].play();
}

export {
  button,
  click,
  typeSound,
  blip,
  success,
  loose,
  mistake,
  stopAllGameSounds,
};
