import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { bestSpot, checkWin, checkTie } from "./minimax-algo"
import { fill_async, pause } from '/src/js/game-output-handling.js'
import say from '/src/js/game-speak.js'
import { button, click } from '/src/js/game-sounds.js'

import './TicTacToe.styles.css'
import Cell from "./Cell"

const letter_o = [
    " #### ",
    "#    #",
    "#    #",
    "#    #",
    " #### ",
];

const letter_x = [
    "#    #",
    " #  # ",
    "  ##  ",
    " #  # ",
    "#    #",
];

// human
var human_player = "O";
// ai
var wopr_ai = "X";

const WINNING_COMBINATIONS = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8],
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8], 
    [2,4,6]
]

const game_background = [
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '-------------+-------------+-------------', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '-------------+-------------+-------------',
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ', 
    '             |             |             ',   
];
  
let eventHandler = null;

const TicTacToe = () => {
    const navigate = useNavigate();

    const [cells, _setCells] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])
    const cellsRef = useRef(cells);

    const [go, _setGo] = useState("circle")
    const goRef = useRef(go);

    const [turn, _setTurn] = useState(null);
    const turnRef = useRef(turn);


    const [winningMessage, _setWinningMessage] = useState(null)
    const winningMessageRef = useRef(winningMessage);

    //const turn = go === 'circle' ? 'O' : 'X';
    //const message = "Current turn: '" + turn + "'"

    const setCells = data => {
        cellsRef.current = data;
        _setCells(data);
      };

    const setGo = data => {
        goRef.current = data;
        _setGo(data);
      };

    const setWinningMessage = data => {
        winningMessageRef.current = data;
        _setWinningMessage(data);
      };

    const setTurn = data => {
        turnRef.current = data;
        _setTurn(data);
      };

    const getGo = (index) => {
        let currentGo = cells[index];
        if (currentGo === 'X') return ' cross';
        if (currentGo === 'O') return ' circle';
        return '';
    }

    const process_output = async () => {
        const player_starting = (Math.floor((Math.random() * 2) + 1)) === 1 ? "circle" : "cross";
        //console.log('First move: ', player_starting);
        const boardBackground = document.querySelector("#ttt-board-background");
        const squares = document.querySelectorAll(".ttt-square");
        const turns = document.querySelector("#turns");
        boardBackground.innerHTML = '';
        turns.innerHTML = '';
        squares.forEach((square) => {
            square.firstChild.innerHTML = '';
        })
        setTurn(null);
        setWinningMessage(null); 
        setCells([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        await fill_async(game_background, boardBackground);
        if (player_starting === 'cross') {
            await fill_async("Current turn: 'X'", turns);
            setGo('cross');
        } else {
            await fill_async("Current turn: 'O'", turns);
        }

        eventHandler = (event) => {
            console.log('Keypress TTT I: ', event.key);
            event.preventDefault();
            let isnumber = event.key.match(/[1-9]/i);
            if (event.key === "Escape") {
               console.log('Source: ', event )
               window.removeEventListener("keydown", eventhandler);
              exitGame();           
            } else if (event.key === "Backspace") {
              resetGame();           
            } else if (isnumber) {
                console.log('Number between 1 and 9: ', event.key);
                updateGame(Number(event.key - 1));
            }
         }
         window.addEventListener("keydown", eventHandler); 
    }

    const resetGame = () => {
        button();
        process_output();
    }

    const exitGame = () => {
        button();
        window.removeEventListener("keydown", eventHandler);
        navigate("/");
    }

    const updateGame = async (squarenumber) =>  {
        console.log('updateGame: ', squarenumber);
        if (winningMessageRef.current) return;
        click();
        const squares = document.querySelectorAll(".ttt-square");
        console.log(squares);
        const taken = squares[squarenumber].firstChild.classList.contains("circle") ||
        squares[squarenumber].firstChild.classList.contains("cross");
        console.log('Taken: ',taken);
        if (!taken) {                
                squares[squarenumber].firstChild.classList.add("circle")
                await fill_async(letter_o, squares[squarenumber].firstChild);
                handleCellChange("circle", squarenumber);
                setGo("cross")
        }
    }

    const checkScore = () => {
        //console.log('Check Score');
        let human_player = checkWin(cells, 'O');
        let wopr_ai = checkWin(cells, 'X');
        let stalemate = checkTie(cells);
        //console.log('SM: ', stalemate, ' hp: ', human_player, ' wa: ', wopr_ai);
        if (stalemate) {
            setTurn(null);
            setWinningMessage('STALEMATE. A STRANGE GAME...THE ONLY WINNING MOVE IS NOT TO PLAY.')
            say('A STRANGE GAME...THE ONLY WINNING MOVE IS NOT TO PLAY.');
        } else if (human_player) {
            setTurn(null);
            setWinningMessage('YOU WON (O). CONGRATULATIONS!')
            say('YOU WON (O). CONGRATULATIONS!');
        } else if (wopr_ai) {
            setTurn(null);
            setWinningMessage('I WON (X). DID YOU REALLY THINK YOU CAN WIN AGAINST A GAME COMPUTER?')
            say('I WON. DID YOU REALLY THINK YOU CAN WIN AGAINST A GAME COMPUTER?');
        }
    }

    const handleClick = async (e) => {
        //console.log('Click event: ', e);
        //e.preventDefault();
        if (winningMessage || go === 'cross') return;
        click();
        //console.log('Target: ', e.target.className)
        //console.log('Square id:', e.target.id);
        //console.log('First child: ', e.target);
        const squares = document.querySelectorAll(".ttt-square");
        const taken = e.target.firstChild.classList.contains("circle") ||
            e.target.firstChild.classList.contains("cross");
        //console.log('Taken: ', taken);
        if (!taken) {
            if (go === "circle") {
                e.target.firstChild.classList.add("circle")
                await fill_async(letter_o, squares[e.target.id].firstChild);
                handleCellChange("circle", e.target.id)
                setGo("cross")
            }
        }
    }

    const goWOPR = async () => {
        console.log('go WOPR');
        const squares = document.querySelectorAll(".ttt-square");
        let bestMove = bestSpot(cells);
        console.log('WOPR move: ', bestMove)
        await pause(1);
        if (bestMove !== undefined) {
            squares[bestMove].firstChild.classList.add("cross")
            fill_async(letter_x, squares[bestMove].firstChild);
            handleCellChange("cross", bestMove);
            setGo('circle');
        }
    }

    const handleCellChange = (currentGo, id) => {
        console.log('handleCellChange: ', currentGo, ': ', id);
        const player = currentGo === 'circle' ? 'O' : 'X';
        const newCells = [...cellsRef.current];
        newCells[id] = player;
        setCells(newCells)
    }

    useEffect(() => {
        console.log('Cells..');
        checkScore();
    }, [cells])

    useEffect(() => {
        console.log('Go..');
        //console.log(cells);
        if (go === 'cross') {
            setTurn("Current turn: 'X'");
            goWOPR(); 
        } else {
            setTurn("Current turn: 'O'");
        }
    }, [go])

    useEffect(() => {
        process_output();
    }, [])

      return (
        <div id="tic-tac-toe-container">
            <div id="tic-tac-toe">
                <h1>TIC TAC TOE</h1>
                <br></br>
                <div id="ttt-board-container">
                    <div id="ttt-board-wrapper">
                        <div id="ttt-board-background"></div>
                        <div id="ttt-board">
                            {cells.map((cell, index) =>
                                <Cell
                                    key={index}
                                    id={index}
                                    cell={cell}
                                    go={getGo(index)}
                                    winningMessage={winningMessage}
                                    handleClick={handleClick}
                                />)}
                        </div>
                    </div>
                </div>
                <br></br>
                <div id="turns">
                    {winningMessage || turn}
                </div>
                <div className='ttt-game-buttons'>
                    <button onClick={resetGame}>{"RESET (BACKSPACE)"}</button>
                    <button onClick={exitGame}>{"EXIT (ESC)"}</button>
                </div> 
            </div> 
        </div>)
}

export default TicTacToe;