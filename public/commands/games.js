import { prompt, type } from "/utils/io.js";
import alert from "/utils/alert.js";
import say from "/utils/speak.js";

const output = [
  " ",
  "Available games:",
  "(1) TIC-TAC-TOE",
  "(2) HANGMAN",
  "(3) SUDOKU",
  "(4) GLOBAL THERMONUCLEAR WAR",
  "  ",
];

const selectgame = async () => {
  console.log("Select game");
  say("WHICH GAME DO YOU WANT TO PLAY?");
  let game = await prompt("WHICH GAME DO YOU WANT TO PLAY (1-4) ?");
  if (game === "1") {
    console.log("TIC-TAC-TOE");
    await alert("The TIC-TAC-TOE game is not implemented yet");
  } else if (game === "2") {
    console.log("HANGMAN");
    await alert("The HANGMAN game is not implemented yet");
  } else if (game === "3") {
    console.log("SUDOKU");
    await alert("The SUDOKU game is not implemented yet");
  } else if (game === "4") {
    console.log("GLOBAL THERMONUCLEAR WAR");
    await alert("The GLOBAL THERMONUCLEAR WAR game is not implemented yet");
  } else {
    console.log("NO SUCH GAME");
    await type([" ", "THERE IS NO SUCH GAME", " "]);
    say("THERE IS NO SUCH GAME");
  }
};

export default () => {
  return selectgame();
};

export { output };
