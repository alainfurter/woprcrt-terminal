import { useEffect } from 'react';

import '../../css/Base.styles.css'

const Base = ({on, setOn, setReset }) => {  

    const handleSwitch = (event) => {
        //console.log(event);
        // Switch 'RUN, STOP'. Turn monitor on and off
        if (event.target.id === '3') {
            const powerStatus = event.target.checked ? 'on' : 'off';
            setOn(powerStatus);
        }
        // Switch 'RESET, EXT. CLR'. Reset the login status of the terminal that is stored in local storage. Begin from scratch
        if (event.target.id === '2') {
            localStorage.removeItem("screenStatus");
            setOn('off');
            setTimeout(function(){
                event.target.checked = !event.target.checked;
                setOn('on');
                const randomNumber = Math.floor(Math.random() * 1000);
                setReset(randomNumber.toString());
            }, 300);
            setTimeout(function(){
                //window.alert("The terminal login status has been reset. You can begin completely from scratch. Good luck!");
                // When the user clicks on the button, open the modal
                var modal = document.getElementById("myModal");
                modal.style.display = "block";
            }, 3000);   
        }
    }

    const textsBlock3 = (texts) => {
        return texts.map((text, index) => 
         ( <div key={index} className='text-item-container-3'> 
                <div  className="text-item-3">{text}</div>
            </div> 
         )
        )
    }
    const eightTextsBlock = (texts) => {
        return texts.map((text, index) => 
         (
            <div key={index} className="text-item">{text}</div>
         )
        )
    }
    const eightButtonBlockLeft = Array.from({length: 8}, (_, index) => {
        const defaultChecked = [0, 1, 5, 7].includes(index, 0);
        const passiveUp = [0, 5].includes(index, 0);
        const passiveMiddle = [1, 3, 4, 5, 7].includes(index, 0);
        const passiveDown = [0, 2, 3, 4, 6, 7].includes(index, 0);
        return (
            <label key={index}  className='checkboxControl'>
                <input type='checkbox' defaultChecked={defaultChecked}/>
                <div className={index < 4 ? 'blue-button' : 'red-button'}></div>
                <span className={`indicator up ${passiveUp?'passive':''}`}></span>
                <span className={`indicator middle ${passiveMiddle?'passive':''}`}></span>
                <span className={`indicator down ${passiveDown?'passive':''}`}></span>
            </label>
        );
      });

    const eightButtonBlockMiddle = Array.from({length: 8}, (_, index) => {
        const defaultChecked = [0, 1, 5].includes(index, 0);
        const passiveMiddle = [2, 4, 5].includes(index, 0);
        const passiveDown = [0, 1, 2, 3, 7].includes(index, 0);
        return (
            <label key={index}  className='checkboxControl'>
                <input type='checkbox' defaultChecked={defaultChecked}/>
                <div className={index < 4 ? 'blue-button' : 'red-button'}></div>
                <span className={`indicator middle ${passiveMiddle?'passive':''}`}></span>
                <span className={`indicator down ${passiveDown?'passive':''}`}></span>
            </label>
        );
      });

    const sixButtonBlock = Array.from({length: 6}, (_, index) => {
        let defaultChecked = [3].includes(index, 0);
        const passiveDown = [0, 1, 4, 5].includes(index, 0);
        defaultChecked = (index === 3) ? (on ==='on' ? true : false ) : defaultChecked; 
        return (
            <label key={index}  className='checkboxControl'>
                <input type='checkbox' defaultChecked={defaultChecked} onClick={handleSwitch} id={index}/>
                <div className={(index % 2 == 0) ? 'blue-button' : 'red-button'}></div>
                <span className={`indicator down ${passiveDown?'passive':''}`}></span>
            </label>
        );
      });

      useEffect(()=>{
        // Get the modal
        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
      }, []);

    return (
      <div className='cpu'>
        <div className='cpu-base'>
            <div className='upper-base'>
                <div className='upper-section-1'>
                    <div className='upper-section-block'>
                        <div className='text-container'>
                            {eightTextsBlock(['7', '6', '5', '4', '3', '2', '1', '0'])}
                        </div>
                        <div className='text-container'>
                            {eightTextsBlock(['MEMR', 'INP', 'M1', 'OUT', 'HLTA', 'STACK', 'WO', 'INTA'])}
                        </div>
                    </div>
                    <div className='upper-section-block'>
                        <div className='text-container'>
                            {eightTextsBlock(['8', '4', '2', '1', '8', '4', '2', '1'])}
                        </div>
                        <div className="innerline"></div>
                        <div className='text-container'>
                            {eightTextsBlock(['2', '1', '4', '2', '1', '4', '2', '1'])}
                        </div>
                    </div>
                    <div className='upper-section-block'>
                        <div className='text-container'>
                            {eightTextsBlock(['15', '14', '13', '12', '11', '10', '9', '8'])}
                        </div>
                        <div className="innerline"></div>
                        <div className='text-container'>
                            {eightTextsBlock(['7', '6', '5', '4', '3', '2', '1', '0'])}
                        </div>
                        <div className='text-container'>
                            ADDRESS-PROGRAMMED INPUT
                        </div>
                    </div>
                </div>
                <div className='upper-section-2'>
                    <div className='upper-section-block'>
                        <div className='text-container'>
                            {eightTextsBlock([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])}
                        </div>
                        <div className='text-container'>
                            {eightTextsBlock(['7', '6', '5', '4', '3', '2', '1', '0'])}
                        </div>
                    </div>
                    <div className='upper-section-block'>
                        <div className='text-container'>
                            {eightTextsBlock(['8', '4', '2', '1', '8', '4', '2', '1'])}
                        </div>
                        <div className="innerline"></div>
                        <div className='text-container'>
                            {eightTextsBlock(['2', '1', '4', '2', '1', '4', '2', '1'])}
                        </div>
                    </div>
                    <div className='upper-section-block'>
                        <div className='text-container'>
                            {eightTextsBlock(['7', '6', '5', '4', '3', '2', '1', '0'])}
                        </div>
                        <div className='text-container'>
                            {eightTextsBlock([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])}
                        </div>
                        <div className="innerline-empty"></div>
                        <div className='text-container'>
                            ADRESS-DATA
                        </div>
                    </div>
                </div>
                <div className='upper-section-3'>
                    <div className='upper-section-block-3'>
                        <div className='title-container'>
                            <div className='imsai-title'>IMSAI 8080</div>
                            <p>-------------------------- MICROCOMPUTER SYSTEM</p>
                        </div>
                    </div>
                    <div className='upper-section-block-3'>
                        <div className='text-container-ext'>
                            {eightTextsBlock([' ', ' ', ' ', ' ', ' ', ' '])}
                        </div>
                        <div className='text-container-ext'>
                            {eightTextsBlock([' ', ' ', 'INTERR. ENABLD', 'RUN', 'WAIT', 'HOLD'])}
                        </div>
                    </div>
                    <div className='upper-section-block-3'>
                        <div className='text-container-ext'>
                        {textsBlock3(['EXAMINE', 'DEPOSIT', 'RESET', 'RUN', 'SINGLE SLEEP', 'PWR ON'])}
                        </div>
                        <div className="innerline-3"></div>
                        <div className='text-container-ext'>
                            {eightTextsBlock(['EXAMINE NEXT ', 'DEPOSIT NEXT', 'EXT. CLR', 'STOP', 'SINGLE STEP', 'PWR OFF'])}
                        </div>
                        <div className='text-container'>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='lower-base'>
                <div className='buttons-section'>
                    <div className='buttons-container'>
                        {eightButtonBlockLeft}
                    </div>
                </div>
                <div className='buttons-section'>
                    <div className='buttons-container'>
                        {eightButtonBlockMiddle}
                    </div>
                </div>
                <div className='buttons-section'>
                    <div className='buttons-container-3'>
                        {sixButtonBlock}
                    </div>
                </div>
            </div>
        </div>
        <div className='disquette-base'>
            <div className='title-container-disc'>
                <div className='imsai-title-disc'>IMSAI</div>
            </div>
            <div className="disquette">
                <div className="disqueteline"></div>
                <div className="disquetesquare"></div> 
            </div>
            <div className="disquette">
                <div className="disqueteline"></div>                    
                <div className="disquetesquare"></div> 
            </div>
        </div>
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <p>The terminal login status has been reset. You can begin completely from scratch. Good luck!</p>
            </div>
        </div>
      </div>
    )
  }

  export default Base;