import clear from "/commands/clear.js";
import { parse, type, prompt, input } from "/utils/io.js";
import pause from "/utils/pause.js";
import alert from "/utils/alert.js";
import say from "/utils/speak.js";
import selectgame, { output } from "/commands/games.js";

// var woprsound = new Audio("/assets/sounds/wopr-humming.mp3");
// woprsound.loop = true;
// woprsound.addEventListener(
//   "stopwoprsound",
//   (event) => {
//     event.preventDefault();
//     woprsound.pause();
//     woprsound.remove();
//   },
//   false
// );

/** Login screen */
async function login() {
  console.log("Login");
  //await pause(2);
  clear();
  localStorage.setItem("screenStatus", "login");

  console.log("Play wopr sound");
  //woprsound.play();
  const event = new CustomEvent("playwoprsound");
  window.dispatchEvent(event);
  await type(
    [
      " ",
      "FURTER AI INDUSTRIES  1977",
      "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫",
      " ",
      "||45-45-F6-3456            NOPR STATUS: TRAK OFF        PRON ACTIVE",
      "#45:45:45 ↑↑ WER:45/29/01 XCOMP:43239582 YCOMP:3492030D ZCOMP:343906834",

      "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫",
      " ",
      "-              PRT. STAT.                               CRT. DEF.",
      "(311) 936-3582 ===================================================",
      "               3453                                     3594",
      "SYSPROC FUNCT READY                            ALT NET READY",
      "CPU AUTH RV-345-AXO            SYSCOMP STATUS: ALL PORTS ACTIVE",
      " ",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );

  let logon = await prompt("LOGON: ");

  const stringHasAll = (s, query) =>
    // convert the query to array of "words" & checks EVERY item is contained in the string
    query.split(" ").every((q) => new RegExp("\\b" + q + "\\b", "i").test(s));

  if (stringHasAll(logon, "help logon")) {
    await type([" ", "HELP NOT AVAILABLE", " "]);
    await pause(3);
    clear();
    return login();
  }

  if (stringHasAll(logon, "help games")) {
    await type([
      " ",
      "'GAMES' REFERS TO MODELS, SIMULATIONS AND GAMES",
      "WHICH HAVE TACTICAL AND STRATEGIC APPLICATIONS.",
      " ",
    ]);
    await pause(2);
    clear();
    return login();
  }

  if (stringHasAll(logon, "list games")) {
    await type([
      " ",
      "TIC-TAC-TOE",
      "HANGMAN",
      "SUDOKU",
      "GLOBAL THERMONUCLEAR WAR",
      " ",
    ]);
    await pause(2);
    clear();
    return login();
  }

  if (logon === "joshua") {
    await pause();
    await alert("LOGON SUCCESSFUL");
    clear();
    //return main();
    return games();
  } else {
    await type([
      " ",
      "IDENTIFICATION NOT RECOGNIZED BY SYSTEM",
      "--CONNECTION REINITIATED--",
    ]);
    await pause(2);
    clear();
    return login();
  }
}

/** Connecting screen */
async function connecting() {
  console.log("Connecting");
  //await pause(2);
  clear();
  await type(
    [
      " ",
      "#45  	↑↑456         ↑↑009       ↑↑893      ↑↑972       ↑↑315",
      "PRT CON. 3.4.5.  SECTRAN 9.4.3              PORT STAT: SD-345",
      " ",
      " (311) 699-7305",
      "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );
  clear();
  await type(
    [
      " ",
      "(311) 767-8739",
      "(311) 936-2364",
      "-           PRT. STAT.                              CRT. DEF.",
      "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫==============================================",
      "FSKDJLSD: SDSDKJ: SDFJSL:                    DKSJL: SFKJJ: SDKFJLJ:",
      "SYSPROC FUNCT READY                          ALT NET READY ",
      "CPU AUTH RV-345-AX8          SYSCOMP STATUS: ALL PORTS ACTIVE",
      "22/34534.90/3209                                 ↑↑CVB.3904-39490",
      "(311) 936-2364",
      "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫",
      "(311) 936-3582",
      "22/34534.90/3209                                 ↑↑CVB.3904-39490",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );
  clear();
  await type(
    [
      " ",
      "12934-AD-43KJ: CONTR PAK",
      "(311) 767-1083",
      "    FLD CRD: 33.04.543  HPBS: 34/56/67/88  STATUS FLT 034/304",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );
  clear();
  await type(
    [
      " ",
      "FL342    TK01    BM93     RG01    PY90    GJ62    FP03    ZW00    JM89",
      "REF TAPCON: 43.45342.349",
      "SYSPROC FUNCT READY                            ALT NET READY",
      " ",
      "CPU AUTH RV-345-AXO            SYSCOMP STATUS: ALL PORTS ACTIVE",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );
}

// Dialer screen
async function dialer() {
  console.log("Dialer");
  clear();
  localStorage.setItem("screenStatus", "dialer");

  await type(
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      "                  NUMBERS FOR WHICH CARRIER TONES WERE DETECTED:",
      " ",
      " ",
      "                                  (311) 399-2364  ",
      "                                  (311) 399-3582  ",
      "                           ===>   (311) 437-8739  ",
      "                                  (311) 437-1083  ",
      "                                  (311) 437-2977  ",
      "                                  (311) 767-7305  ",
      "                                  (311) 767-3395  ",
      "                                  (311) 936-1493  ",
      "                                  (311) 936-3923  ",
      " ",
      " ",
      "               Press <RETURN> to begin dialing the selected number",
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

  // DEVELOPMENT & TESTING SHORT CUTS
  //return main();
  //return games();

  var dialupsound = new Audio("/assets/sounds/dtmf-wopr.wav");
  dialupsound.playbackRate = 2.0;
  var modemupsound = new Audio("/assets/sounds/modem.wav");
  modemupsound.playbackRate = 3.0;

  await alert("DIALING (311) 437-8739");

  dialupsound.play();
  dialupsound.onended = function () {
    modemupsound.play();
    modemupsound.onended = async function () {
      await connecting();
      return login();
    };
  };
}

/** Professor Furter */
async function games() {
  console.log("Games");
  clear();
  localStorage.setItem("screenStatus", "games");

  console.log("Play wopr sound");
  //woprsound.play();
  const event = new CustomEvent("playwoprsound");
  window.dispatchEvent(event);
  // SyntaxError();
  await type(["GREETINGS PROFESSOR FURTER.", " "], { speak: true });
  say("SHALL WE PLAY A GAME?");
  let answer = await prompt(["SHALL WE PLAY A GAME? (Y/N)", " "]);
  if (answer === "y" || answer === "yes") {
    console.log("select game");
    await type(output);
    await selectgame();
    await type(["TYPE 'HELP' FOR A LIST OF AVAILABLE COMMANDS.", " "]);
    return main();
  } else {
    await type([
      " ",
      "1. TYPE 'HELP' FOR A LIST OF AVAILABLE COMMANDS. OR",
      "2. TYPE 'GAMES' FOR A LIST OF AVAILABLE GAMES. OR",
      "3. ASK ME A QUESTION.",
      " ",
      " ",
    ]);
    return main();
  }
}

/** Main input terminal, recursively calls itself */
async function main_with_info() {
  localStorage.setItem("screenStatus", "main");

  console.log("Play wopr sound");
  //woprsound.play();
  const event = new CustomEvent("playwoprsound");
  window.dispatchEvent(event);
  await type(
    [
      " ",
      "FURTER AI INDUSTRIES  1977",
      "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫",
      " ",
      "||45-45-F6-3456            NOPR STATUS: TRAK OFF        PRON ACTIVE",
      "#45:45:45 ↑↑ WER:45/29/01 XCOMP:43239582 YCOMP:3492030D ZCOMP:343906834",

      "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫",
      " ",
      " ",
      "1. TYPE 'HELP' FOR A LIST OF AVAILABLE COMMANDS.",
      "2. TYPE 'GAMES' FOR A LIST OF AVAILABLE GAMES. OR",
      "3. ASK ME A QUESTION.",
      " ",
      " ",
    ],
    { wait: false, initialWait: false, finalWait: false, speak: false }
  );

  let command = await input();
  try {
    await parse(command);
  } catch (e) {
    if (e.message) await type(e.message);
  }
  main();
}

/** Main input terminal, recursively calls itself */
async function main() {
  localStorage.setItem("screenStatus", "main");
  console.log("Play wopr sound");
  //woprsound.play();
  const event = new CustomEvent("playwoprsound");
  window.dispatchEvent(event);

  // type(" ", { wait: 0, initialWait: 0, finalWait: 0, stopBlinking: true });
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
  login,
  main,
  main_with_info,
  games,
  dialer,
  // woprsound,
  getScreen,
  toggleFullscreen,
  div,
  el,
  loadTemplates,
  addTemplate,
  showTemplateScreen,
};
