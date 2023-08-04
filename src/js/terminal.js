import { setVolume } from "./util/speak.js";
import { click } from "./util/sounds.js";
import { on, off } from "./util/power.js";
import { main, toggleFullscreen, login, dialer } from "./util/screens.js";
import { type, parse } from "./util/io.js";

// Check if query param is set and load that command
async function onload() {
  console.log("Onload");
  const urlParams = new URLSearchParams(window.location.search);
  const command = urlParams.get("command");

  if (command) {
    console.log("onload, command");
    //const { power } = await import("./util/power.js");
    //const { parse } = await import("./util/io.js");
    //power();
    await type("> " + command, { initialWait: 3000, finalWait: 1500 });
    await parse(command);

    //const { main } = await import("./util/screens.js");
    main();
    //boot();
  } else {
    console.log("onload no command");
    //const { boot, login, dialer } = await import("./util/screens.js");
    //boot();
    dialer();
    //login();
  }
}

// Change the command passed to the parse function in order to directly load that command.
// Then visit /debug.html which calls this function in <body> onLoad().
// async function debug() {
//   const { power } = await import("./util/power.js");
//   const { main } = await import("./util/screens.js");
//   const { parse } = await import("./util/io.js");
//   power();
//   main();
//   parse("fallout");
// }

function togglePower() {
  let isOff = document.getElementById("crt").classList.contains("off");
  if (isOff) {
    on();
  } else {
    off();
  }
}

function handleClick(event) {
  if (event) {
    event.preventDefault();
  }
  let input = document.querySelector("[contenteditable='true']");
  if (input) {
    input.focus();
  }
}

function fly(event) {
  event.target.classList.toggle("fly");
}

function theme(event) {
  click();
  let theme = event.target.dataset.theme;
  [...document.getElementsByClassName("theme")].forEach((b) =>
    b.classList.toggle("active", false)
  );
  event.target.classList.add("active");
  document.body.classList = "theme-" + theme;
  handleClick();
}

function fullscreen(event) {
  toggleFullscreen();
  event.target.blur();
}

function globalListener({ keyCode }) {
  const element = document.querySelector("#input");
  if (!element) return;
  element.focus();
  if (keyCode === 122) {
    // F11
    toggleFullscreen();
  } else if (keyCode === 27) {
    // ESC
    toggleFullscreen(false);
  }
}

document.addEventListener("keydown", globalListener);

document.addEventListener("click", () => {
  const element = document.querySelector("#input");
  if (element) {
    element.focus();
  }
});

// Define some stuff on the window so we can use it directly from the HTML
Object.assign(window, {
  // debug,
  onload,
  togglePower,
  theme,
  fly,
  handleClick,
  fullscreen,
});
