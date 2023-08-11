import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

import { fill_async } from '/src/js/game-output-handling.js'
import say from '/src/js/game-speak.js'
import { button, success, loose, blip, mistake } from '/src/js/game-sounds.js'

import './Hangman.styles.css'
import { wordlist } from "./wordlist";

const hangman_title = [
   "  _    _                                             ",
   " | |  | |                                            ",
   " | |__| | __ _ _ __   __ _ _ __ ___   __ _ _ __      ",
   " |  __  |/ _` | '_ \\ / _` | '_ ` _ \\ / _` | '_ \\  ",
   " | |  | | (_| | | | | (_| | | | | | | (_| | | | |    ",
   " |_|  |_|\\__,_|_| |_|\\__, |_| |_| |_|\\__,_|_| |_| ",
   "                      __/ |                          ",
   "                     |___/                           ",
];

const hangman_animation = [
    [
       ' ___   ',
       ' |   | ',
       ' |     ',
       ' |     ',
       ' |     ',
    ], 
    [
       ' ___   ',
       ' |   | ',
       ' |   O ',
       ' |     ',
       ' |     ',
    ], 
    [
       ' ___   ',
       ' |   | ',
       ' |  \\O ',
       ' |     ',
       ' |     ',
    ],  
    [
       ' ___   ',
       ' |   | ', 
       ' |  \\O/',
       ' |     ',
       ' |     ',
    ],
    [
       ' ___   ',
       ' |   | ', 
       ' |  \\O/',
       ' |   | ',
       ' |     ',
    ],
    [
       ' ___   ',
       ' |   | ',
       ' |  \\O/',
       ' |   | ',
       ' |  /  ',
    ],
    [
       ' ___   ',
       ' |   | ',
       ' |  \\O/',
       ' |   | ',
       ' |  / \\',
    ]
];

const hangman_animation_html = [
   [
      '&nbsp;___&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<span class="char">&nbsp;</span>'
   ],
   [
      '&nbsp;___&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;O&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<span class="char">&nbsp;</span>'
   ],
   [
      '&nbsp;___&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;\\O&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<span class="char">&nbsp;</span>'
   ],
   [
      '&nbsp;___&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;\\O/<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<span class="char">&nbsp;</span>'
   ],
   [
      '&nbsp;___&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;\\O/<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<span class="char">&nbsp;</span>'
   ],
   [
      '&nbsp;___&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;\\O/<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;/&nbsp;<span class="char">&nbsp;</span>'
   ],
   [
      '&nbsp;___&nbsp;&nbsp;&nbsp;<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;\\O/<br>&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;<br>&nbsp;|&nbsp;&nbsp;/&nbsp;<span class="char">\\</span>'
   ],
];

let eventHandler = null;

const Hangman = () => {
   const navigate = useNavigate();

   const [winningMessage, setWinningMessage] = useState(null)
   const [word, setWord] = useState(null);
   const [maxTurns, setMaxTurns] = useState(6);
   const [currentTurn, setCurrentTurn] = useState(0);
   const [wrongLetters, setWrongLetters] = useState(0);
   const [wordSolution, setWordSolution] = useState(null);
   const [lettersTyped, setLettersTyped] = useState(null);
   const [wordField, setWordField] = useState(null);
   const [turns, setTurns] = useState(null);
   const [guess, setGuess] = useState(null);

   const process_output = async () => {
      const word = wordlist[Math.floor(Math.random() * wordlist.length) + 1];
      setWord(word);
      console.log('Selected word: ', word);
      const title = document.querySelector("#title");
      const hangingman = document.querySelector("#hanging-man");
      const worldField = document.querySelector("#word-field");
      const turnscontainer = document.querySelector("#turns-label");
      const guesscontainer = document.querySelector("#guess-label");
      const wrongscontainer = document.querySelector("#wrongs-label");
      const wrongs = document.querySelector("#wrongs-input");
      const turns = document.querySelector("#turns-input");
      const guess = document.querySelector("#guess-input");
      const enterLetters = document.querySelector("#enter-letters");
      const letters = document.querySelector("#letters");
      const cursor = document.querySelector("#cursorspan");
      title.innerHTML = '';
      hangingman.innerHTML = '';
      worldField.innerHTML = '';
      turnscontainer.innerHTML = '';
      guesscontainer.innerHTML = '';
      turns.innerHTML = '';
      guess.innerHTML = '';
      wrongscontainer.innerHTML = '';
      wrongs.innerHTML = '';
      enterLetters.innerHTML = '';
      letters.value = '';
      cursor.style.visibility = "hidden";

      setWinningMessage(null);
      setWordField(null);
      setTurns(null);
      setGuess(null);
      setCurrentTurn(0);
      setWrongLetters(0);
      setLettersTyped(null);
      
      let worldfieldtext = '';
      let wordsolutiontext = '';
      for (let i = 0; i < word.length; i++) {
         worldfieldtext += '_ ';
         wordsolutiontext += '_';
      }
   
      await fill_async(hangman_title, title);
      hangingman.innerHTML = '';
      await fill_async(hangman_animation[wrongLetters], hangingman);
      await fill_async('Turn                   : ', turnscontainer, true);
      await fill_async('Guess                  : ', guesscontainer, true);
      await fill_async('Wrong letters (max. 6) : ', wrongscontainer, true);
      await fill_async('Enter letter           :', enterLetters);

      //console.log(hangingman.innerHTML);

      setWordField(worldfieldtext);
      setWordSolution(wordsolutiontext);

      eventHandler = (event) => {
         //event.preventDefault();
         console.log('Keypress: ', event.key);
         if (event.key === "Escape") {
            console.log('Source: ', event )
            window.removeEventListener("keydown", eventHandler);
           exitGame();           
         } else if (event.key === "Backspace") {
           resetGame();           
         }
      }
      window.addEventListener("keydown", eventHandler); 

      letters.disabled = false;
      cursor.style.visibility = "visible";
      await letters.focus();
   }

   const anmiate_hangman = async () => {
      const hangingman = document.querySelector("#hanging-man");
      hangingman.innerHTML = '';
      hangingman.innerHTML = hangman_animation_html[wrongLetters];
   };

   const activateInput = () => {
      const input = document.querySelector("#letters");
      input.focus()
   }

   const clearInput = () => {
      const letters = document.querySelector("#letters");
      letters.value = '';
   }

   const resetGame = () => {
      const hangingman = document.querySelector("#hanging-man");
      hangingman.innerHTML = '';
      button();
      process_output();
   }

  const exitGame = () => {
      button();
      window.removeEventListener("keydown", eventHandler);
      navigate("/");
   }

   const onInputChange = () => {
      const letters_input = document.querySelector("#letters");
      if (wrongLetters === maxTurns) {
         //console.log('Game ended');
         letters_input.value = '';
         return; // Game has ended
      } 
      console.log('Keypress: ', letters_input.value);
      const lowerCaseLetter = letters_input.value.toLowerCase();
      let isLetter = lowerCaseLetter .length === 1 && lowerCaseLetter .match(/[a-z]/i);
      if (!isLetter) {
         //console.log('No letter');
         letters_input.value = '';
         return;
      }
      //console.log(lettersTyped && lettersTyped?.indexOf(lowerCaseLetter));

      if (lettersTyped && lettersTyped?.indexOf(lowerCaseLetter) !== -1) {
         //console.log('Alread typed');
         letters_input.value = '';
         return;
      }
      const lettersTypedText = lettersTyped ? (lettersTyped + lowerCaseLetter) : lowerCaseLetter;
      setLettersTyped(lettersTypedText);

      //console.log(lowerCaseLetter);
      let userGuessedOk = false;
      let wordSolutionText =  '';
      let wordFieldText = '';
      let turnText = turns ? (turns + ' ' + (currentTurn + 1)) : (currentTurn + 1);
      let guessText = guess ? (guess + ' ' + lowerCaseLetter) : lowerCaseLetter;
      setCurrentTurn(currentTurn + 1);
      setTurns(turnText);
      setGuess(guessText);
      for (let i = 0; i < word.length; i++) {
         if (wordSolution.charAt(i) === '_') {
            let char = word.charAt(i);
            if (char === lowerCaseLetter) {
               wordFieldText += char + ' ';
               wordSolutionText += char;
               userGuessedOk = true;
            } else {
               wordFieldText += '_ ';
               wordSolutionText += '_';
            }
         } else {
            wordSolutionText += wordSolution.charAt(i);
            wordFieldText += wordSolution.charAt(i) + ' ';
         }
      }
      setWordSolution(wordSolutionText);
      setWordField(wordFieldText);

      // Delay clearance of input field. Other input just disappears immediately before the next turn
      setTimeout(clearInput, 1000);

      if (!userGuessedOk) {
         mistake();
         setWrongLetters(wrongLetters + 1);
      } else {
         blip();
      }
   }

   useEffect(() => {
      if (wrongLetters === maxTurns) {
         setWinningMessage('YOU LOST THE GAME!')
         loose();
         say('YOU LOST THE GAME!');
         const letters = document.querySelector("#letters");
         letters.value = '';
         letters.disabled = true;
      } else {
         if (wordSolution?.indexOf('_') === -1) {
            setWinningMessage('YOU WON THE GAME. CONGRATULATIONS!')
            success();
            say('YOU WON THE GAME. CONGRATULATIONS!');
            const letters = document.querySelector("#letters");
            letters.value = '';
            letters.disabled = true;
         }
      }
  }, [wordSolution])

   useEffect(() => {
      anmiate_hangman();
      if (wrongLetters === maxTurns) {
         setWinningMessage('YOU LOST THE GAME!')
         loose();
         say('YOU LOST THE GAME!');
      }
  }, [wrongLetters])

   useEffect(() => {
      process_output();
      return function cleanup() {
         window.removeEventListener("keydown", eventHandler);
       };
  }, [])

   return (
      <div id="hangman-container" onClick={activateInput}>
         <div id="hangman">
            <div id="title-container">
               <h1 id="title"></h1>
            </div>
            <div id="game-container">
               <div id="hanging-man"></div>
               <div id="word-field">{wordField}</div>
               <br></br>
               <div id="turns-container">
                  <div id="turns-label"></div>
                  <div id="turns-input">{turns}</div>
               </div>
               <div id="guess-container">
                  <div id="guess-label"></div>
                  <div id="guess-input">{guess}</div>
               </div>
               <div id="wrongs-container">
                  <div id="wrongs-label"></div>
                  <div id="wrongs-input">{(wrongLetters === 0) ? null : wrongLetters}</div>
               </div>
               <div id="input-field">
                  <label htmlFor="enter-letters" id="enter-letters"></label>
                  <span id="cursorspan" ></span>
                  <input type="text" name="letters" id="letters" maxLength="1" autoFocus onChange={()=>onInputChange()} />
               </div>
            </div>
            <br></br>
            <div id="winningMessage">
               {winningMessage}
            </div>
            <div className='game-buttons'>
               <button onClick={resetGame}>{"RESET (BACKSPACE)"}</button>
               <button onClick={exitGame}>{"EXIT (ESC)"}</button>
            </div> 
         </div> 
   </div>);
}

export default Hangman;