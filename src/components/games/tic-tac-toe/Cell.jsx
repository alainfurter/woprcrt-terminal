const Cell = ({id, cell, go, handleClick}) => {
    return (
        <div className="ttt-square" id={id} onClick={handleClick}>
            <div className={`${cell}{${go}`}></div>
        </div>
    )
}

export default Cell
