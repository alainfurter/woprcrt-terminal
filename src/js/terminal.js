// import { main, dialer } from "./util/screens.js";
// import { type, parse } from "./util/io.js";

// import { click } from "/utils/sounds.js";

async function main() {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/screens.js` /* @vite-ignore */
  );
  if (module) {
    module.main();
  }
}

async function dialer() {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/screens.js` /* @vite-ignore */
  );
  if (module) {
    module.dialer();
  }
}

async function type(...args) {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/io.js` /* @vite-ignore */
  );
  if (module) {
    module.type(args);
  }
}

async function parse(...args) {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/io.js` /* @vite-ignore */
  );
  if (module) {
    module.parse(args);
  }
}

// Check if query param is set and load that command
async function onload() {
  console.log("Onload");

  const urlParams = new URLSearchParams(window.location.search);
  const command = urlParams.get("command");

  if (command) {
    console.log("onload, command");
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

async function click() {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/sounds.js` /* @vite-ignore */
  );
  if (module) {
    module.click();
  }
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

function globalListener({ keyCode }) {
  const element = document.querySelector("#input");
  if (!element) return;
  element.focus();
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
  onload,
  theme,
  fly,
  handleClick,
});
