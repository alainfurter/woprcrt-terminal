import '../css/Monitor.styles.css';
import '../css/Screen.styles.css';
import '../css/Interlace.styles.css';
import '../css/Scanline.styles.css';
import Terminal from './Terminal';

const Monitor = () => {
    return (
        <div id="monitor">
            <pre>
                <div id="screen">
                    <div id="screen-on-off-container" className='on'>
                        <div id="screen-container">
                            <div id="interlace" />
                            <div id="scanline" />
                            <Terminal />
                        </div>
                    </div>
                </div>
          </pre>
          <h2>IMSAI</h2>
        </div>
      )
}

export default Monitor;