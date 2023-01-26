import './Text.css'

function Text(props){
    return (
        <span 
            className='text-element' 
            style={{
                fontSize: props.font ? props.font + "px" : "20px",
                fontWeight: props.fontWeight ? props.fontWeight : "300",
                padding: props.pad ? props.pad : "5",
                textAlign: props.align ? props.align : "left",
            }}
            {...props}
        >{props.children}</span>
    )
}

export default Text