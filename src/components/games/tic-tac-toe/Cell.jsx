const Cell = ({id, cell, go, handleClick}) => {
    return (
        <div className="ttt-square" id={id} onClick={handleClick}>
            <div className={`${cell} ${go}`}></div>
            {go?'':id+1} 
        </div>
    )
}

export default Cell
