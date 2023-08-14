import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/Base.styles.css'

const Base = ({on, setOn, setReset }) => {  

    const navigate = useNavigate();

    const handleSwitch = (event) => {
        console.log(event);
        // Switch 'RUN, STOP'. Turn monitor on and off
        if (event.target.classList.contains('right-part')) {
            console.log('Right button block: ', event.target.id);
            if (event.target.id === '3') {
                const powerStatus = event.target.checked ? 'on' : 'off';
                const indicatorLeftDown = document.getElementsByClassName('indicator middle left-part')[3];
                indicatorLeftDown.classList.remove('passive');
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
            if (event.target.id === '0') {
                setTimeout(function(){
                    event.target.checked = !event.target.checked;
                }, 300);
            }
            if (event.target.id === '5') {
                const switchMid01 = document.getElementsByClassName('mid-part 2')[0];
                const switchMid02 = document.getElementsByClassName('mid-part 5')[0];
                console.log(switchMid01);
                switchMid01.checked = false;
                switchMid02.checked = !switchMid02.checked;
                const indicatorLeftDown = document.getElementsByClassName('indicator down left-part')[3];
                console.log(indicatorLeftDown)
                indicatorLeftDown.classList.remove('passive');
            }
        }
        if (event.target.classList.contains('left-part')) {
            console.log('Left button block: ', event.target.id);
            if (event.target.id === '6') {
                const switchLeft01 = document.getElementsByClassName('left-part 0')[0];
                console.log(switchLeft01);
                

                let allSet = true;
                const indicatorLeft = Array.from(document.getElementsByClassName('indicator left-part'));
                indicatorLeft.forEach((indicator) => {
                    //console.log(indicator);
                    if (indicator.classList.contains('passive')) allSet = false;
                });
                const switchesLeft = Array.from(document.getElementsByClassName('checkbox left-part'));
                //console.log(switchesLeft);
                switchesLeft.forEach((switches) => {
                    if (!switches.checked) allSet = false;
                })
                console.log('all set');
                if (!allSet) {
                    switchLeft01.checked = !switchLeft01.checked;
                    const indicatorLeftDown = document.getElementsByClassName('indicator down left-part')[4];
                    indicatorLeftDown.classList.remove('passive');
                    setTimeout(function(){
                        event.target.checked = !event.target.checked;
                    }, 300);
                } else {
                    navigate('/pacman')
                }
            }
        }
        if (event.target.classList.contains('mid-part')) {
            console.log('Middle button block: ', event.target.id);
            if (event.target.id === '2') {
                const switchLeft07 = document.getElementsByClassName('left-part 7')[0];
                switchLeft07.checked = false
            }
            if (event.target.id === '1') {
                const indicatorLeftUp = document.getElementsByClassName('indicator up left-part')[0];
                const indicatorLeftDown = document.getElementsByClassName('indicator down left-part')[0];
                if (indicatorLeftUp.classList.contains('passive')) {
                    indicatorLeftUp.classList.remove('passive');
                } else {
                    indicatorLeftUp.classList.add('passive');
                }
                if (indicatorLeftDown.classList.contains('passive')) {
                    indicatorLeftDown.classList.remove('passive');
                } else {
                    indicatorLeftDown.classList.add('passive');
                }
            }
            if (event.target.id === '0') {
                const indicatorLeftDown = document.getElementsByClassName('indicator down left-part')[6];
                if (indicatorLeftDown.classList.contains('passive')) {
                    indicatorLeftDown.classList.remove('passive');
                } else {
                    indicatorLeftDown.classList.add('passive');
                }
            }
            if (event.target.id === '4') {
                const indicatorMid1 = document.getElementsByClassName('indicator middle left-part')[1];
                const indicatorMid2 = document.getElementsByClassName('indicator middle left-part')[4];
                if (indicatorMid1.classList.contains('passive')) {
                    indicatorMid1.classList.remove('passive');
                } else {
                    indicatorMid1.classList.add('passive');
                }
                if (indicatorMid2.classList.contains('passive')) {
                    indicatorMid2.classList.remove('passive');
                } else {
                    indicatorMid2.classList.add('passive');
                }
            }
            if (event.target.id === '5') {
                const indicatorMid1 = document.getElementsByClassName('indicator middle left-part')[7];
                const indicatorMid2 = document.getElementsByClassName('indicator middle left-part')[5];
                if (indicatorMid1.classList.contains('passive')) {
                    indicatorMid1.classList.remove('passive');
                } else {
                    indicatorMid1.classList.add('passive');
                }
                if (indicatorMid2.classList.contains('passive')) {
                    indicatorMid2.classList.remove('passive');
                } else {
                    indicatorMid2.classList.add('passive');
                }
                const switchLeft01 = document.getElementsByClassName('left-part 1')[0];
                const switchLeft02 = document.getElementsByClassName('left-part 1')[4];
                switchLeft01.checked = !switchLeft01.checked;
                switchLeft02.checked = false;
            }
            if (event.target.id === '7') {
                const indicatorMid1 = document.getElementsByClassName('indicator up left-part')[5];
                const indicatorMid2 = document.getElementsByClassName('indicator down left-part')[7];
                const indicatorMid3 = document.getElementsByClassName('indicator down left-part')[2];
                if (indicatorMid1.classList.contains('passive')) {
                    indicatorMid1.classList.remove('passive');
                } else {
                    indicatorMid1.classList.add('passive');
                }
                if (indicatorMid2.classList.contains('passive')) {
                    indicatorMid2.classList.remove('passive');
                } else {
                    indicatorMid2.classList.add('passive');
                }
                indicatorMid3.classList.remove('passive');
            }
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
            <label key={index}  className='checkboxControl left-part'>
                <input type='checkbox' defaultChecked={defaultChecked} onClick={handleSwitch} id={index} className={`checkbox left-part ${index}`}/>
                <div className={index < 4 ? 'blue-button' : 'red-button'}></div>
                <span className={`indicator up left-part ${passiveUp?'passive':''}`}></span>
                <span className={`indicator middle left-part ${passiveMiddle?'passive':''}`}></span>
                <span className={`indicator down left-part ${passiveDown?'passive':''}`}></span>
            </label>
        );
      });

    const eightButtonBlockMiddle = Array.from({length: 8}, (_, index) => {
        const defaultChecked = [0, 1, 5].includes(index, 0);
        const passiveMiddle = [2, 4, 5].includes(index, 0);
        const passiveDown = [0, 1, 3, 7].includes(index, 0);
        return (
            <label key={index}  className='checkboxControl mid-part'>
                <input type='checkbox' defaultChecked={defaultChecked} onClick={handleSwitch} id={index} className={`checkbox mid-part ${index}`}/>
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
            <label key={index}  className='checkboxControl right-part'>
                <input type='checkbox' defaultChecked={defaultChecked} onClick={handleSwitch} id={index} className='checkbox right-part'/>
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
                    <div className='buttons-container left-part'>
                        {eightButtonBlockLeft}
                    </div>
                </div>
                <div className='buttons-section'>
                    <div className='buttons-container mid-part'>
                        {eightButtonBlockMiddle}
                    </div>
                </div>
                <div className='buttons-section'>
                    <div className='buttons-container-3 right-part'>
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