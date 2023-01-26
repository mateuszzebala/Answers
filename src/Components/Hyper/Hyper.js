import './Hyper.css'
import {Link} from 'react-router-dom'

function Hyper(props){
    return (
        <Link
            to={props.to}
            className= {props.className ? `hyper ${props.className}` : "hyper"}
            style={{
                fontSize: props.font ? props.font + "px" : "20px",
                fontWeight: props.fontWeight ? props.fontWeight : "400",
                padding: props.pad ? props.pad : "5",
            }}
        >
            {props.children}
        </Link>
    )
}

export default Hyper