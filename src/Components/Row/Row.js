import './Row.css'

function Row (props){
    return (
        <div className='row-element'>
            {props.children}
        </div>
    )
}

export default Row