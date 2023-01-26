import './Column.css'

function Row (props){
    return (
        <div className='column-element'>
            {props.children}
        </div>
    )
}

export default Row