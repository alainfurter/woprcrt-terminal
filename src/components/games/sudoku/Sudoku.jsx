import { useState, useEffect, useRef} from "react"
import { useNavigate } from "react-router-dom"

import { fill_async, delay } from '/src/js/game-output-handling.js'
import say from '/src/js/game-speak.js'
import { button, success, loose, blip, mistake, stopAllGameSounds } from '/src/js/game-sounds.js'

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";

import './Sudoku.styles.css'
import Cell from "./Cell"


const game_background = [
    '               |               |               ',
    '               |               |               ',  
    '               |               |               ', 
    '               |               |               ', 
    '               |               |               ', 
    '---------------+---------------+---------------', 
    '               |               |               ',
    '               |               |               ',  
    '               |               |               ', 
    '               |               |               ', 
    '               |               |               ', 
    '---------------+---------------+---------------', 
    '               |               |               ',
    '               |               |               ',  
    '               |               |               ', 
    '               |               |               ', 
    '               |               |               ', 
];

// const game_background = [
//     '===============================', 
//     '|         |         |         |', 
//     '|         |         |         |', 
//     '|         |         |         |', 
//     '+---------+---------+---------+', 
//     '|         |         |         |', 
//     '|         |         |         |', 
//     '|         |         |         |', 
//     '+---------+---------+---------+',
//     '|         |         |         |', 
//     '|         |         |         |', 
//     '|         |         |         |', 
//     '===============================',
// ];

// const game_background = [
//     '+-------+-------+-------+', 
//     '|       |       |       |', 
//     '|       |       |       |', 
//     '|       |       |       |', 
//     '+-------+-------+-------+', 
//     '|       |       |       |', 
//     '|       |       |       |', 
//     '|       |       |       |', 
//     '+-------+-------+-------+',
//     '|       |       |       |', 
//     '|       |       |       |', 
//     '|       |       |       |', 
//     '+-------+-------+-------+',
// ];

let eventHandler = null;

const Sudoku = () => {
    const navigate = useNavigate();

    const [puzzle, _setPuzzle] = useState([])
    const [puzzleInit, _setPuzzleInit] = useState([])

    const puzzleRef = useRef(puzzle);
    const puzzleInitRef = useRef(puzzleInit);

    const [solution, _setSolution] = useState([])
    const solutionRef = useRef(solution);

    const [winningMessage, _setWinningMessage] = useState(null)
    const winningMessageRef = useRef(winningMessage);

    const [cursor, _setCursor] = useState(0)
    const cursorRef = useRef(cursor);

    const [allFilled, setAllFilled] = useState(0);

    let eventHandler = null;

    // Board output paiting

    const process_output = async () => {
        console.log('Process output');
        const sudoku_puzzle = makepuzzle();
        const sudoku_solution = solvepuzzle(sudoku_puzzle);
        const cursorpos = sudoku_puzzle.indexOf(null);
        setPuzzle(sudoku_puzzle);
        setPuzzleInit(sudoku_puzzle);
        setSolution(sudoku_solution);
        setCursor(cursorpos);
        setAllFilled(0);
        //console.log(sudoku_puzzle);
        const boardBackground = document.querySelector("#sudoku-board-background");
        const rowNumbers = document.querySelector("#row-numbers-container");
        const columnNumbers = document.querySelector("#column-numbers-container");
        const board = document.querySelector("#sudoku-board");
        boardBackground.innerHTML = '';

        setWinningMessage(null);

        await fill_async(game_background, boardBackground);
        board.classList.remove('hidden');
        rowNumbers.classList.remove('hidden');
        columnNumbers.classList.remove('hidden');

        eventHandler = (event) => {
            event.preventDefault();
            console.log('Keypress sudoku I: ', event.key);
            let isnumber = event.key.match(/[1-9]/i);
            if (event.key === "Escape") {
              console.log('Source: ', event )
              window.removeEventListener("keydown", eventHandler);
                exitGame();           
            } else if (event.key === "Backspace") {
                resetGame();           
            } else if (isnumber) {
                console.log('Number between 1 and 9: ', event.key);
                updatePuzzle(Number(event.key));
            }  else if (event.key === "ArrowLeft") {
                let cursor2D_y = Math.floor(cursorRef.current / 9);
                let cursor2D_x = cursorRef.current % 9;
                console.log('Cursor: ', cursorRef.current);  
                console.log('Cursor 2D: ', cursor2D_x, ' ', cursor2D_y);
                cursor2D_x = (cursor2D_x >= 1) ? cursor2D_x - 1 : cursor2D_x;
                const cursor1D = cursor2D_y * 9 + cursor2D_x;  
                setCursor(cursor1D);       
            }
            else if (event.key === "ArrowRight") {
                let cursor2D_y = Math.floor(cursorRef.current / 9);
                let cursor2D_x = cursorRef.current % 9;
                console.log('Cursor: ', cursorRef.current);  
                console.log('Cursor 2D: ', cursor2D_x, ' ', cursor2D_y);
                cursor2D_x = (cursor2D_x <= 7) ? cursor2D_x + 1 : cursor2D_x;
                const cursor1D = cursor2D_y * 9 + cursor2D_x;  
                setCursor(cursor1D);     
            }
            else if (event.key === "ArrowUp") {
                let cursor2D_y = Math.floor(cursorRef.current / 9);
                let cursor2D_x = cursorRef.current % 9;
                console.log('Cursor: ', cursorRef.current);  
                console.log('Cursor 2D: ', cursor2D_x, ' ', cursor2D_y);
                cursor2D_y = (cursor2D_y >= 1) ? cursor2D_y - 1 : cursor2D_y;
                const cursor1D = cursor2D_y * 9 + cursor2D_x;  
                setCursor(cursor1D);             
            }
            else if (event.key === "ArrowDown") {
                let cursor2D_y = Math.floor(cursorRef.current / 9);
                let cursor2D_x = cursorRef.current % 9;
                console.log('Cursor: ', cursorRef.current);  
                console.log('Cursor 2D: ', cursor2D_x, ' ', cursor2D_y);
                cursor2D_y = (cursor2D_y <= 7) ? cursor2D_y + 1 : cursor2D_y;
                const cursor1D = cursor2D_y * 9 + cursor2D_x;  
                setCursor(cursor1D);              
            } else if (event.key.toUpperCase() === "S") {
                solveGame();            
            }
        }
        window.addEventListener("keydown", eventHandler); 
     }

    // useState accessors via useRef for modification in event handlers

    const setPuzzle = data => {
        puzzleRef.current = data;
        _setPuzzle(data);
      };

    const setPuzzleInit = data => {
        puzzleInitRef.current = data;
        _setPuzzleInit(data);
      };

    const setSolution = data => {
        solutionRef.current = data;
        _setSolution(data);
      };

      const setWinningMessage = data => {
        winningMessageRef.current = data;
        _setWinningMessage(data);
      };

    const setCursor = data => {
        cursorRef.current = data;
        _setCursor(data);
      };
    
    // Puzzle handling

    const updatePuzzle = (number) => {
        if (puzzleInitRef.current[cursorRef.current]) return;
        //console.log('Update puzzle: ', number - 1, ' ', puzzleRef.current);
        const tempPuzzle = puzzleRef.current.map((c, i) => {
            if (i === cursorRef.current) {
                return number - 1;
            } else {
                return c;
            }
        });
        console.log(tempPuzzle);
        setPuzzle(tempPuzzle);
    }

    const handleClick = (e) => {
        console.log('Click event: ', e.target.id);
        console.log(typeof e.target.id);
        e.preventDefault();
        setCursor(Number(e.target.id));
    }

    // Button event handlers

    const solveGame = () => {
        button();
        setPuzzle(solutionRef.current);
     }
    
     const checkGame = () => {
        button();
        const solved = puzzleRef.current.toString() === solutionRef.current.toString();
        const puzzleSolvedText = solved ? 'PUZZLE SOLVED! :-)' : 'PUZZLE NOT SOLVED. :-(';
        if (solved) {
            say('PUZZLE SOLVED!');
            success(); 
            setTimeout(function(){
                stopAllGameSounds();
            }, 2000);
            setWinningMessage(puzzleSolvedText)
        } else {
            loose(); 
            setTimeout(function(){
                stopAllGameSounds();
            }, 2000);
            setWinningMessage(puzzleSolvedText)
        }
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

     // useEffect hooks
    
    useEffect(() => {
        console.log('Cursor: ', cursor);
    }, [cursor])
    
    useEffect(() => {
        //console.log('Puzzle: ', puzzle);
        const allFilled = puzzle.indexOf(null) === -1;
        setAllFilled(Number(allFilled));
    }, [puzzle])

    useEffect(() => {
        process_output();
        return function cleanup() {
            window.removeEventListener("keydown", eventHandler);
          };
    }, [])

    // Rendering

    const nineDivs = Array.from({length: 9}, (_, index) => {
        return <div key={index} >{index + 1}</div>;
      });

    return (
        <div id="sudoku-container">
            <div id="sudoku">
            <h1>SUDOKU</h1>
            <br></br>
            <div id="puzzle-container">
                <div id="row-wrapper">
                    <div id="row-numbers-container" className="hidden">
                        <div id="row-numbers">
                            {nineDivs}
                        </div>
                    </div>
                    <div id="column-wrapper">
                        <div id="column-numbers-container" className="hidden">
                            <div id="column-numbers">
                                {nineDivs}
                            </div>
                        </div>
                        <div id="sudoku-board-container">
                            <div id="sudoku-board-background"></div>
                            <div id="sudoku-board" className="hidden">
                                {puzzle?.map((cell, index) =>
                                    <Cell
                                        key={index}
                                        id={index}
                                        cell={cell}
                                        puzzleInit={puzzleInit[index]}
                                        winningMessage={winningMessage}
                                        handleClick={handleClick}
                                        cursor={cursor}
                                    />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="winningMessage">
                {winningMessage}
            </div>
            <div className='sudoku-game-buttons'>
                <button onClick={resetGame}>{"RESET (BACKSPACE)"}</button>
                <button className="small" onClick={solveGame}>{"SOLVE (S)"}</button>
                <button className="small" onClick={checkGame} disabled={!allFilled}>{"CHECK (C)"}</button>
                <button onClick={exitGame}>{"EXIT (ESC)"}</button>
            </div> 
        </div> 
    </div>
    );
}

export default Sudoku;