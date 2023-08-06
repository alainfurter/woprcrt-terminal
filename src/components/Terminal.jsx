import '../css/Terminal.styles.css'
import '../js/terminal.js'

import { useCallback } from 'react';

const Terminal = () => {

    const loadTerminal = useCallback(() => {
        console.log('Terminal loading...');
        onload();
      }, []);

    return (
        <div id="terminal-container" >
            <div className='terminal' id='terminal' >
                {/* child components added in javascript */}
            </div>
        </div>
    );
}

export default Terminal;