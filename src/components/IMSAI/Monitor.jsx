import {  Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { memo } from 'react';

import '../../css/Monitor.styles.css';
import '../../css/Screen.styles.css';
import '../../css/Interlace.styles.css';
import '../../css/Scanline.styles.css';
import Terminal from './Terminal';

import TicTacToe from '../games/tic-tac-toe/TicTacToe';
import Hangman from '../games/hangman/Hangman';
import Sudoku from '../games/sudoku/Sudoku';
import GTW from '../games/gtw/GTW';

const Monitor = ({on, reset}) => {

    const navigate = useNavigate();

    useEffect(()=>{
        console.log('Render Monitor');
        window.addEventListener("loadgame", (event) => {
            console.log('Event listener loadgame: ', event);
            console.log('Event listener loadgame: ', event.detail);
            if (event.detail === 'tic-tac-toe') {
                navigate('/tic-tac-toe')
            } else if (event.detail === 'hangman') {
                navigate('/hangman')
            } else if (event.detail === 'sudoku') {
                navigate('/sudoku')
            } else if (event.detail === 'gtw') {
                navigate('/global-thermonuclear-war')
            }
        });
        // console.log('Screen state: ', loggedIn.current);
    })

    return (
        <div id="monitor">
            <pre>
                <div id="screen">
                    <div id="screen-on-off-container" className={`${on}`}>
                        <div id="screen-container">
                            <div id="interlace" />
                            <div id="scanline" />
                            <Routes>
                                <Route 
                                    index
                                    element={<Terminal reset={reset}/>}>
                                </Route>
                                <Route 
                                    path='/tic-tac-toe/*' 
                                    element={<TicTacToe />}>
                                </Route> 
                                <Route 
                                    path='/hangman/*' 
                                    element={<Hangman />}>
                                </Route>
                                <Route 
                                    path='/sudoku/*' 
                                    element={<Sudoku />}>
                                </Route>
                                <Route 
                                    path='/global-thermonuclear-war/*' 
                                    element={<GTW />}>
                                </Route>                   
                            </Routes>
                            {/* <Terminal /> */}
                        </div>
                    </div>
                </div>
          </pre>
          <h2>IMSAI</h2>
        </div>
      )
}

export default memo(Monitor);