import './Wrapper.styles.css'

import Interlace from './Interlace'
import Scanline from './Scanline'
import Envelope from './Envelope'

const Wrapper = () => {
    return (
        <div id="wrapper" className='off'>
          <Interlace />
          <Scanline />
          <Envelope />
        </div>
      )
}

export default Wrapper;