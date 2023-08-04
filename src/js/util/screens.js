import clear from "./clear.js";
import { parse, type, prompt, input } from "./io.js";
import pause from "./pause.js";
import alert from "./alert.js";
import say from "./speak.js";

var woprsound = new Audio("/assets/sounds/wopr-humming.mp3");
woprsound.loop = true;
woprsound.addEventListener(
  "stopwoprsound",
  (event) => {
    event.preventDefault();
    woprsound.pause();
    woprsound.remove();
  },
  false
);

/** Boot screen */
async function boot() {
  console.log("Boot");
  clear();
  await type(
    [
      "Welcome to ECMA industries(TM) terminal",
      " ",
      "> SET TERMINAL/BOOT",
      "Loading........................",
      "Please wait........",
      "..........",
      "...",
      ".",
      "OK.",
      " ",
      "> SET TERMINAL/LOGON",
      "USER AUTHENTICATION CHECK",
    ],
    { wait: 20 }
  );

  //await pause();
  //return login();
  return dialer();
}

/** Login screen */
async function login() {
  console.log("Login");
  //await pause(2);
  clear();
  await type(
    [
      "reloading sysop WOPR",
      "JOSHUA v0.6b",
      "data transfer from network",
      "relinking initial mem-banks",
      "activating p-synap",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );
  clear();
  await type(
    [
      "##################",
      "||45-45-F6-3456    NOPR STATUS: TRAK OFF    PRON ACTIVE",
      "#45:45 || WER: 45/29  XCOMP: 432  YCOMP: 349 ZCOMP: 343",
      "###############################TRON:🀫",
      // " ",
      // "@@@  @@@  @@@     @@@@@@     @@@@@@@@@@     @@@@@@@@@@",
      // "@@@  @@@  @@@    @@@@@@@@    @@@@@@@@@@@    @@@@@@@@@@@",
      // "@@!  @@!  @@!    @@@  @@!    @@!     @@!    @@!     @@!",
      // "!@!  !@!  !@!    !@!  @!@    !@!     !@!    !@!     !@!",
      // "@!!  !!@  @!@    @!@  !@!    @!! !!@ @!@    @!! !!@ @!@ ",
      // "!@!  !!!  !@!    !@!  !!!    !@!            !@!   !@! ",
      // "!!:  !!:  !!:    !!:  !!!    !!:            !!:     !!: ",
      // ":!:  :!:  :!:    :!:  !:!    :!:            :!:     :!: ",
      // " :::: :: :::     ::::::::    :::            :::      ::",
      // "  :::  :::        ::::::      :              :        :",
      " ",
      "",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );

  let logon = await prompt("LOGON: ");

  if (logon === "joshua") {
    await pause();
    //say("AUTHENTICATION SUCCESSFUL");
    await alert("AUTHENTICATION SUCCESSFUL");
    clear();
    //return main();
    return games();
  } else {
    await type(["Incorrect logon.", "Please try again"]);
    await pause(3);
    clear();
    return login();
  }
}

async function dialer() {
  console.log("Dialer");
  clear();
  await type(
    [
      "                  NUMBERS FOR WHICH CARRIER TONES WERE DETECTED:",
      " ",
      " ",
      "                                  (311) 399-2364  🀫🀫🀫🀫🀫🀫🀫",
      "                                  (311) 399-3582  ",
      "                                  (311) 437-8739  ",
      "                                  (311) 437-1083  ",
      "                                  (311) 437-2977  ",
      "                                  (311) 767-7305  ",
      "                                  (311) 767-3395  ",
      "                                  (311) 936-1493  ",
      "                                  (311) 936-3923  ",
      " ",
      " ",
      "                          Press (RETURN) to begin dialing",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );

  async function waitforuserkeypressed() {
    return new Promise((resolve) => {
      let terminal = document.querySelector("body");
      terminal.addEventListener(
        "keydown",
        (event) => {
          event.preventDefault();
          resolve(true);
        },
        { once: true }
      );
    });
  }

  await waitforuserkeypressed();
  console.log("dial...");

  var dialupsound = new Audio("/assets/sounds/dtmf-wopr.wav");
  dialupsound.playbackRate = 2.0;
  var modemupsound = new Audio("/assets/sounds/modem.wav");
  modemupsound.playbackRate = 3.0;

  await alert("DIALING (311) 399-2364...");

  dialupsound.play();
  dialupsound.onended = function () {
    modemupsound.play();
    modemupsound.onended = function () {
      woprsound.play();
      return login();
    };
  };
}

/** Professor Furter */
async function games() {
  console.log("Games");
  clear();
  await type(
    ["GREETINGS PROFESSOR FURTER.", " ", "SHALL WE PLAY A GAME?", " "],
    { speak: true }
  );
  return main();
}

/** Main input terminal, recursively calls itself */
async function main() {
  let command = await input();
  try {
    await parse(command);
  } catch (e) {
    if (e.message) await type(e.message);
  }

  main();
}

function addClasses(el, ...cls) {
  let list = [...cls].filter(Boolean);
  el.classList.add(...list);
}

function getScreen(...cls) {
  let div = document.createElement("div");
  addClasses(div, "fullscreen", ...cls);
  document.querySelector("#crt").appendChild(div);
  return div;
}

function toggleFullscreen(isFullscreen) {
  document.body.classList.toggle("fullscreen", isFullscreen);
}

/** Attempts to load template HTML from the given path and includes them in the <head>. */
async function loadTemplates(path) {
  let txt = await fetch(path).then((res) => res.text());
  let html = new DOMParser().parseFromString(txt, "text/html");
  let templates = html.querySelectorAll("template");

  templates.forEach((template) => {
    document.head.appendChild(template);
  });
}

/** Clones the template and adds it to the container. */
async function addTemplate(id, container, options = {}) {
  let template = document.querySelector(`template#${id}`);
  if (!template) {
    throw Error("Template not found");
  }
  // Clone is the document fragment of the template
  let clone = document.importNode(template.content, true);

  if (template.dataset.type) {
    await type(clone.textContent, options, container);
  } else {
    container.appendChild(clone);
  }

  // We cannot return clone here
  // https://stackoverflow.com/questions/27945721/how-to-clone-and-modify-from-html5-template-tag
  return container.childNodes;
}

/** Creates a new screen and loads the given template into it. */
async function showTemplateScreen(id) {
  let screen = getScreen(id);
  await addTemplate(id, screen);
  return screen;
}

function el(type, container = document.querySelector(".terminal"), cls = "") {
  let el = document.createElement(type);
  addClasses(el, cls);

  container.appendChild(el);
  return el;
}

function div(...args) {
  return el("div", ...args);
}

export {
  boot,
  login,
  main,
  games,
  dialer,
  woprsound,
  getScreen,
  toggleFullscreen,
  div,
  el,
  loadTemplates,
  addTemplate,
  showTemplateScreen,
};
