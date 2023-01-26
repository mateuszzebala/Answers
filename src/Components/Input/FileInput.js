import './Input.css'
import React, { Component } from'react'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import TextButton from '../TextButton/TextButton'
import Row from '../Row/Row'
import Column from '../Column/Column'
import Text from '../Text/Text'

class FileInput extends Component {
    state = {
        focus: false,
        length: 0,
    }
    constructor(props) {
        super()
        this.inputRef = React.createRef()
        this.tempInputRef = React.createRef()

    }
    clickTempInput(event){
        this.tempInputRef.current.click()
    }
    handleChangeTemp(event){
        let dt = this.props.value
        let files = this.tempInputRef.current.files
        for (let i = 0; i < files.length; i++) {
            dt.items.add(files[i])
        }
         this.setState({length: dt.files.length})
        this.props.setValue(dt)
    }
    clearInput(){
        this.props.setValue(new DataTransfer())
        this.setState({length: 0})
    }

    render(){
        return (
            <div className='input-file-box'>
                <Column>
                    <Text font="30" fontWeight="500">{this.props.text}</Text>
                    <Row>
                        <input 
                            type="file"
                            name={this.props.name}
                            ref={this.inputRef}
                            multiple="multiple"
                            style={{
                                display: 'none',
                            }}
                        />
                        <TextButton>{this.state.length} FILES</TextButton>
                        <input 
                            type="file" 
                            onChange={this.handleChangeTemp.bind(this)}
                            ref={this.tempInputRef}
                            multiple="multiple"
                            style={{
                                display: 'none',
                            }}
                        />
                        <Button
                            onClick={this.clickTempInput.bind(this)}
                        ><FontAwesomeIcon icon={faPlus} /></Button>
                        <Button
                            onClick={this.clearInput.bind(this)}
                        ><FontAwesomeIcon icon={faTrash} /></Button>
                    </Row>
                </Column>
                

            </div>
            
        )
    }
}

export default FileInput