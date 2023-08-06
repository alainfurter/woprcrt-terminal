import '../css/IMSAI.styles.css'

import Monitor from "./Monitor";
import CPU from "./CPU";

const IMSAI = () => {
    return (
        <div className='imsai'>
            <Monitor />
            <CPU />
        </div>
      )
}

export default IMSAI;