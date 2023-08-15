import { useCallback, useEffect, useRef } from 'react';

import '../../css/Terminal.styles.css'
import '../../js/terminal.js'
import { loadingTerminal } from '../../js/terminal.js';


// import { memo } from 'react';

const Terminal = ({ reset, on }) => {

    const ref = useRef(true);
    const loadTerminalOn = useRef(false);
    const loadTerminalReset = useRef(false);

    useEffect(() => {
        console.log('Main use effect');
        const firstRender = ref.current;
        console.log('Ref: ', ref.current);
        if (firstRender) {
          ref.current = false;
          console.log('First Render');
          console.log('Terminal loading, main...');
          loadingTerminal();
        } else {
          console.log('Not a first Render');
          loadTerminalOn.current = true;
          loadTerminalReset.current = true;
        }
      })
    
    useEffect(() => {
        console.log('Terminal on, off: ', on);
        console.log('Ref: ', ref.current);
        if (on==='on') {
            if (loadTerminalOn.current) {
                console.log('On, loading terminal: ', loadTerminalOn.current);
                loadingTerminal();
            }
        } else {
            const event = new CustomEvent("stopwoprsound");
            window.dispatchEvent(event);
        }
    }, [on]);

    useEffect(() => {
        console.log('Terminal resetting...');
        console.log('Ref: ', ref.current);
        const event = new CustomEvent("stopwoprsound");
        window.dispatchEvent(event);
        if (loadTerminalReset.current) { 
            console.log('Reset, loading terminal: ', loadTerminalReset.current);
            loadingTerminal();
        }
    }, [reset]);

    return (
        <div id="terminal-container" >
            <div className='terminal' id='terminal' >
                {/* child components added in javascript */}
            </div>
        </div>
    );
}

export default Terminal;
// export default memo(Terminal);