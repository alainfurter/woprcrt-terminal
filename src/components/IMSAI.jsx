import { memo } from 'react';
import { useEffect, useState } from 'react';

import '../css/IMSAI.styles.css'

import Monitor from "./IMSAI/Monitor";
import Base from './IMSAI/Base';

const IMSAI = () => {

    const [on, setOn] = useState('on');
    const [reset, setReset] = useState('off');

    useEffect(()=>{
        console.log('Render IMSAI');
    })

    return (
        <div className='imsai'>
            <Monitor on={on} reset={reset} />
            <Base on={on} setOn={setOn} setReset={setReset} />
            <br></br>
            <p>{"Reset the terminal login status with 'RESET / EXT CLR'. Turn the computer on, off with 'RUN / STOP' "}</p>
        </div>
      )
}

export default memo(IMSAI);