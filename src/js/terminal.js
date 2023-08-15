var woprsound = new Audio("/assets/sounds/wopr-humming.mp3");

window.addEventListener("playwoprsound", (event) => {
  console.log("Terminal event listener playwoprsound: ", event);
  woprsound.loop = true;
  woprsound.play();
});

window.addEventListener("stopwoprsound", (event) => {
  console.log("Terminal event listener stopwoprsound: ", event);
  woprsound.pause();
});

async function dialer() {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/screens.js` /* @vite-ignore */
  );
  if (module) {
    module.dialer();
  }
}

async function login() {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/screens.js` /* @vite-ignore */
  );
  if (module) {
    module.login();
  }
}

async function games() {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/screens.js` /* @vite-ignore */
  );
  if (module) {
    module.games();
  }
}

async function main_with_info() {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/screens.js` /* @vite-ignore */
  );
  if (module) {
    module.main_with_info();
  }
}

async function main() {
  const module = await import(
    `${import.meta.env.BASE_URL}utils/screens.js` /* @vite-ignore */
  );
  if (module) {
    module.main();
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
async function loadingTerminal() {
  const screenStatus = localStorage.getItem("screenStatus");
  console.log("loadingTerminal. screenStatus: ", screenStatus);
  let screen = document.querySelector(".terminal");
  screen.innerHTML = "";
  if (screenStatus === "dialer") {
    dialer();
  } else if (screenStatus === "login") {
    login();
  } else if (screenStatus === "games") {
    games();
  } else if (screenStatus === "main") {
    main_with_info();
  } else {
    dialer();
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

// // Define some stuff on the window so we can use it directly from the HTML
// Object.assign(window, {
//   loadingTerminal,
//   theme,
//   fly,
//   handleClick,
// });

export { loadingTerminal };
