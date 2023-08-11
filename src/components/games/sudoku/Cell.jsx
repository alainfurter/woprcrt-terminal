const Cell = ({id, cell, puzzleInit, handleClick, cursor}) => {
    let classList = 
        `sudoku-square${puzzleInit ? ' given' : ''}${id === cursor ? (puzzleInit ? ' square-non-editable' : ' square-editable') : ''}`
    return (
        <div 
            id={id} 
            className={classList} 
            // contentEditable={puzzleInit ? "true" : "false"}
            onClick={handleClick} 
        >
            {(cell !== null) ? cell + 1  : '.'}
        </div>
    )
}

export default Cell
