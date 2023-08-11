import { useCallback, useEffect } from 'react';

import '../../css/Terminal.styles.css'
import '../../js/terminal.js'
import { loadingTerminal } from '../../js/terminal.js';


// import { memo } from 'react';

const Terminal = ({ reset }) => {

    // const loadingTerminal = useCallback(() => {
    //     console.log('Terminal loading...');
    //     console.log(logon);
    //     onload(logon, callBack);
    // }, []);

    useEffect(() => {
        console.log('Terminal resetting..');
        loadingTerminal();
    }, [reset]);

    useEffect(() => {
        console.log('Terminal loading...');
        loadingTerminal();
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
// export default memo(Terminal);