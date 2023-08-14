import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

import { fill_async, pause } from '/src/js/game-output-handling.js'
import say from '/src/js/game-speak.js'
import { button, click } from '/src/js/game-sounds.js'

import './Pacman.styles.css'

const Pacman = () => {
    const navigate = useNavigate();

    const [winningMessage, setWinningMessage] = useState(null)

    const process_output = async () => {
        setWinningMessage(null); 
       
        const eventhandler = (event) => {
            console.log('Keypress: ', event.key);
            if (event.key === "Escape") {
               //console.log('Source: ', event )
               window.removeEventListener("keydown", eventhandler);
              exitGame();           
            } else if (event.key === "Backspace") {
              resetGame();           
            }
         }
         window.addEventListener("keydown", eventhandler); 
    }

    const resetGame = () => {
        button();
        process_output();
    }

    const exitGame = () => {
        button();
        navigate("/");
    }

    useEffect(() => {
        process_output();
    }, [])

      return (
        <div id="pacman-container">
            <div id="pacman">
                <h1>PAC MAN</h1>
                <br></br>
                <p>You found the hidden easter egg. Congratulations.</p>
                <p>Unfortunately, the game is not yet implemented.</p>
                <p>Try again later. Thank you!</p>
                <br></br>
                <div id="turns">
                    {winningMessage}
                </div>
                <div className='game-buttons'>
                    <button onClick={resetGame}>{"RESET (BACKSPACE)"}</button>
                    <button onClick={exitGame}>{"EXIT (ESC)"}</button>
                </div> 
            </div> 
        </div>)
}

export default Pacman;