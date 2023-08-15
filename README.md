# WOPR (Joshua) War Games CRT Terminal and Game Hub.

USE GOOGLE CHROME AND TURN UP THE SOUND VOLUME FOR THE BEST EXPERIENCE!!!

The aim was to develop a game hub for playing Tic Tac Toe, Hangman and Sudoku. Whenver I think about Tic Tac Toe I remember the movie "War Games" that was released in 1983 when I was a you boy becoming a computer and tech enthusiast. All three games are design wise and grafically very simple. 
The end result is an interactive old CRT style terminal where the user can play games, execute commands and ask questions which are either answered with pre-defined sentences or with answers from Chat GPT. The interaction is supported with old CRT monitor style animations, sounds and a synthezied computer voice.

## Design Ideas and Flow of User Interactions

War Games Movie:
In the movie WOPR (Joshua) is a game computer developed by Prof. Falken and named after his son Joshua. The uniqueness of this game computer was that it could learn from its own mistake. WOPR was then used by the military to simulate scenarios for World War III. 
In the movie a young college student, David, hacks into WOPR using an old login (backdoor) left by Falken. Not knowing that WOPR is now part of the norad military defence program, he starts the game "Global Thermonuclear War". The game computer simulates World War III on the real systems of Norad and with real nuclear war heads it is connected to. He manages to stop WOPR when he plays Tic Tac Toe against himself learning that the game does no make any sense as there are no winners. And the only winning move is not to play because winning is the game computers primary goal. When he learns that Tic Tac Toe does not make any sense he tries every scenario of the Global Nuclear War simulation coming to the same conlusion and stops playing. The movie ends. Peace.

<img src="/public/assets/screenshots/wg1.jpg" alt="War Games" width:200px />
<img src="/public/assets/screenshots/wg2.jpg" alt="War Games" width:200px />


Remembering this with a touch of nostalgia, I decided to develop an old CRT style terminal similar to the one David had at his home when he connects to WOPR and interacts with it. He used an IMSAI 8080. So the monitor and cpu base were designed accordingly. In the movie WOPR speaks with a synthezized voice, I wanted to have the player of my terminal to have a similar experience. I used the Voice 'Zarvox' with a lower pitch that is present on Google Chrome and Safari as a synthetic voice out of around 140 voices. The terminal had to have some old CRT screen effects like scanlines, blue / back color text and background with blurred letters and some skew animation that distorts the screen frequently. When the user types the letters should show up with a delay one by one simulating the low processing power at the time. The retro sounds of the keyboard click also adds to the old CRT experience.

Design flow and terminal screens:
1. Dialer screen: When the web application is loaded the users sees the IMSAI monitor and cpu base. The monitor shows the dialer screen similar to the movie War Games. David let his computer call all numbers with certain area codes and to detect if a modem picks up on the other side search for the game computer of Protovision (at the end we connects to WOPR). When the user clicks a button or with the mouse, the terminal starts dialing WOPR's phone number. The dialing process is accompanied with old modem sounds and animated with a few network screens like in the movie until finally the logon screen shows up.

<img src="/public/assets/screenshots/dialer.png" alt="Dialer Screen" width:200px />

2. Logon screen: When the logon screens shows up, the user is asked for the logon. Only one word allows to pass. The same logon as in the movie. There is a hint (link) on the webpage what the logon is. After the user types in the correct logon he is welcomed by WOPR with background sound and hears his synthezized voice for the first time
.
<img src="/public/assets/screenshots/logon.png" alt="Logon Screen" width:200px />

https://youtu.be/q14OTYVKMWc

3. Game screen: when WOPR welcomes the user he asks him if he wants to play a game out of the list. Answering with 'Y' and selecting a game afterwards loads it in order to play. Exiting the game returns to the main screen, see below.

<img src="/public/assets/screenshots/games.png" alt="Games List Screen" width:200px />

4. Main screen: when the user anser 'N' (don't want to play a game) he reaches the main screen. Here he can interact with WOPR in different ways. WOPR explains him that he can ask for help to get a list of available commands. There are three different modes the user can interact with WOPR:
    4.1 Typing in a one letter word. The terminal looks through the dynamic javascript modules. If there is a module with the name of the commands, the module gets loaded dynamically. Each module must return and export either an OUTPUT value (shown as text on the terminal screen) or a default function which is executed (for more sophisticated and interactive commands) or both. As the command js modules are dynamically loaded, further commands could be added in the future. The web app is quite dynamic. The functions are mostly executed in async mode with the following command waiting until the promise of the previous command is resolved. The currently available commands are: 
        'CLEAR': deletes the text on the terminal screen
        'GAMES': shows the list of available games itself in order select one and play it
        'HELLO': WOPR says hello
        'HELP': showhs the available list of commands
        'LOGOUT': logs the user out and returns to the login screen
        'MATRIX': answer with a matrix move like statement
        'QUIT': WOPR says goodbye and the computer turns off
    4.2 Typing in 3 or more words. When the user types in 3 or more words a special command is loaded and given the word list as parameter (__sentences). This module interprets the user input as a sentence, question. 
        First it tries to match the words with a list of pre-defined questions and if succefull shows the answer. F.e. when the user types a sentence containing the words 'JOE' and 'BIDEN', the module finds a corresponding entry and shows the predefined answer.
        If there is no match in the list, the module connects to the Chat GPT API and asks Chat GPI for an answer. If successful, the answer is shown to the user and spoken out by the synthezied voice. This results in an interative conversation between WOPR and the user which is quite impressive. 
The flow through the screens is recorded in the localstorage of the browser. This way, after having loggin in, the users goes directly to the last screen when he returns to the webpage or reloads. The value of the saved screen can be reset with the button 'RESET', 'EXT. CLR' on the cpu base. By doing that, the interaction starts again on teh dialer screen. The screen flow and corresponding values stored are like this:
(E)                     (E)      (E)           (E)
Dialer -> Connecting -> Logon -> Games -> main,main-with-info
Wheres only the ones with E are accessible when the user returns and the last screen is loaded according to the value saved in localstorage.

IMSAI CPU Base
1. The 'RESET', 'EXT CLR' button on the right allows the user to delete the value of the last screen stored in localstorage and therefore to start from scratch on the dialer screen.
2. The 'RUN', 'STOP' button turns the computer on and off.
3. All other buttons: try to find out :-)

In case of any suggestions, questions or if you want to add games, please contact me (check socials on the webpage).

<img src="/public/assets/screenshots/question.png" alt="Question for WOPR" width:200px />

Games:
The games can be either played with the keyboard or the mouse. Keyboard: the user types in the numbers of the cells (Tic Tac Toe), moves the cursor to the cell and changes the number (Sudoku) or types in the letter of the word (hangman). To exit the game, he can press the 'ESC' key and 'BACKSPACE' to restart the game.
Tic-Tac-Toe: the user plays againt the WOPR AI (minimax algorithm). Who starts is choosen randomly.
Sudoku: the game has an integrated solver which shows the solution if required.
Hangman: just like any other version
Global Thermonuclear War: is not really a game, integrated just for fun. The US always looses.

<img src="/public/assets/screenshots/tictactoe.png" alt="Tic Tac Toe" width:200px />
<img src="/public/assets/screenshots/hangman.png" alt="Hangman" width:200px />
<img src="/public/assets/screenshots/sudoku.png" alt="Sudoku" width:200px />
<img src="/public/assets/screenshots/gtw.png" alt="Global Thermonuclear War" width:200px />

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software

```
- VSCode or other editor for development
- Command line tool 
- NodeJS installation (>= version 16)
```

### Installing

Steps to get a development env running

```
- Go the main folder of the project.
- Install the nodes module according to package.json, 'npm i'.
- Run the development environment, 'npm run dev'.
- Check the link in the browser in the output.
- Copy and paste the link into your browser (Google Chrome works best).
```

## Deployment

- Type 'npm run build' to get the package under the 'dist' folder that can be hosted as a static website.

## Built With

While developing this web app I did a lot of research and the following publications helped me a lot. Thanks to all of them.

* [VSCode](https://code.visualstudio.com) - Code editor
* [VITE](https://vitejs.dev) - Development environment. Configuration: React and Javascript
* [NodeJS](https://nodejs.org/) - Open source javascript runtine environment

## Authors

* **Alain Furter** - [Alain Furter](https://github.com/alainfurter)

## License

This project is licensed under the Attribution-NonCommercial-ShareAlike 4.0 International - see the [LICENSE](LICENSE) file for details

## Acknowledgments / Credits

While developing this web app I did a lot of research and the following publications helped me a lot. Thanks to all of them.

* Screen turn on / off effects: 
https://codepen.io/lbebber/pen/XJRdrV
* Old PC design: 
https://codepen.io/DalonsoAG/pen/oGzQyo 
https://codepen.io/deluxive/details/AZeBjz
* WOPR font 
https://fontstruct.com/fontstructions/show/1854233/wopr-terminal-1
* Sounds 
https://github.com/zompiexx/wargames
* Texts 
https://github.com/abs0/wargames
https://github.com/built1n/wargames
https://github.com/BlckChainDev/WarGames
https://github.com/Gravy59/WOPR-Console
* Switch design
https://codepen.io/pluton/pen/DWwBpr







