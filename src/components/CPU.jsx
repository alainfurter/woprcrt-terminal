import '../css/CPU.styles.css'

const CPU = () => {
    return (
        <div className='cpu'>
            <div className="pcbaseleft">
                 <div className="onoffbutton">
                    <div className="innercircle">
                        <div className="innerline"></div>
                    </div>
                </div> 
                <div className="logo">|||||||||</div> 
                <div className="onoffled"></div>
            </div>
            <div className="pcbaseright">
                <div className="disquette">
                    <div className="disqueteline"></div>
                    <div className="disquetesquare"></div> 
                </div>
                <div className="disquette">
                    <div className="disqueteline"></div>                    
                    <div className="disquetesquare"></div> 
                </div>
            </div>
        </div>
      )
}

export default CPU;