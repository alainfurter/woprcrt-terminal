import './Terminal.styles.css'
import '../js/terminal.js'

import { useEffect, useCallback } from 'react';

const Terminal = () => {

    const loadTerminal = useCallback(() => {
        console.log('Terminal loading...');
        onload();
      }, []);

    // useEffect(()=>{
    //     console.log('Terminal loading...');
    //     loadTerminal();
    // }, []);

    return (
        <div className='terminal' id='terminal' >
            {/* child components added in javascript */}
        </div>
    );
}

export default Terminal;