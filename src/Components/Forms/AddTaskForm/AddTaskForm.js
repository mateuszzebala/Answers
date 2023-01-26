import './AddTaskForm.css'
import Text from "../../Text/Text";
import Input from "../../Input/Input";
import Message from "../../Message/Message";
import Button from "../../Button/Button";
import Form from "../../Form/Form";
import React, {useEffect, useRef} from "react";
import axios from "axios";
import apiUrl from "../../../apiUrl";
import getCsrfToken from "../../../utils/csrf";
import { Editor as EditorTiny } from '@tinymce/tinymce-react';
import Row from "../../Row/Row";
import Column from "../../Column/Column";
import Select from "../../Select/Select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {useGlobalState} from "../../../utils/globalState";
import {Redirect} from "react-router-dom";


const AddTaskForm = props => {
    let [message, setMessage] = React.useState("")
    let [color, setColor] = React.useState("red")
    let [special, setSpecial] = React.useState(Math.random())
    let [number, setNumber] = React.useState("")
    let [page, setPage] = React.useState("")
    let [books, setBooks] = React.useState([])
    let [task, setTask] = React.useState("")
    let [answer, setAnswer] = React.useState("")
    let [book, setBook] = React.useState("")
    let [downloaded_books, setDB] = React.useState([])
    const editorRef = useRef(null)

    function handleBookChange(event){setBook(event.target.value)}
    function handleNumberChange(event){setNumber(event.target.value)}
    function handlePageChange(event){setPage(event.target.value)}
    function handleTaskChange(event){setTask(event.target.value)}
    function handleAnswerChange(event){setAnswer(event.target.value)}
    function resetForm(){
        setNumber("")
        setTask("")
        setAnswer("")
        setPage("")
    }

    useEffect(()=>{
        axios({
            method:'get',
            url: `${apiUrl}/all_books/0/end`,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            withCredentials: true,
            responseType: 'json',
        }).then(response=>{
            let bks = response.data
            setDB(bks)
            let new_bks = {}
            for(let i = 0; i < Object.keys(bks).length; i++){
                new_bks[i] = {"0":bks[i].id, "1":bks[i].name}
            }
            setBooks(new_bks)
        })
    }, [])

    async function submitLogin(event){
        event.preventDefault()
        axios({
            method:'post',
            url: `${apiUrl}/add/`,
            data:{
                book: downloaded_books[book]['id'],
                number: number,
                page: page,
                task: task,
                answer: await editorRef.current.getContent(),
            },
            headers: {
                'X-CSRFTOKEN': await getCsrfToken(),
                'Content-type': 'application/json; charset=UTF-8',
            },
            withCredentials: true,
            responseType: 'json',

        }).then(async response=>{
            setSpecial(Math.random())
            if(response.data.code === 200){
                setColor("#00FF00")
            }else{
                setColor("#FF0000")
            }
            setMessage(response.data.message.text)

        })


    }

    let [is_superuser] = useGlobalState('is_superuser')
    if(is_superuser === false){
        return  <Redirect exact to="/"/>
    }
    return (
        <div className="add-task-form">
            <Form className="login-form">
                <Text font="30" fontWeight="700" pad="10px">DODAWANIE ZADANIA</Text>
                <Column>
                    <Row>

                        <Select onChange={handleBookChange} value={book} elements={books} title="Książka"/>
                        <Row>
                            <Input text="Nr zadania" type="text" name="number" value={number} onChange={handleNumberChange}/>
                        </Row>
                        <Row>
                            <Input text="Strona" type="text" name="page" value={page} onChange={handlePageChange}/>
                        </Row>


                    </Row>
                    <Column>
                        <EditorTiny
                            apiKey="4c5ubylmkd32esa7gn5drh38i4pqdzpm8w3ccx4rbs30o6qx"
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue= {answer}
                            fullscreen_native={true}
                            init={{
                                height: 720,
                                menubar: 'file edit insert view format table tools help',
                                toolbar_location: 'top',
                                paste_data_images: true,
                                plugins: [
                                    'table', 'lists', 'image', 'media', 'preview', 'fullscreen', 'emoticons'
                                ],
                                extended_valid_elements:"a[*],altGlyph[*],altGlyphDef[*],altGlyphItem[*],animate[*],animateMotion[*],animateTransform[*],circle[*],clipPath[*],color-profile[*],cursor[*],defs[*],desc[*],ellipse[*],feBlend[*],feColorMatrix[*],feComponentTransfer[*],feComposite[*],feConvolveMatrix[*],feDiffuseLighting[*],feDisplacementMap[*],feDistantLight[*],feFlood[*],feFuncA[*],feFuncB[*],feFuncG[*],feFuncR[*],feGaussianBlur[*],feImage[*],feMerge[*],feMergeNode[*],feMorphology[*],feOffset[*],fePointLight[*],feSpecularLighting[*],feSpotLight[*],feTile[*],feTurbulence[*],filter[*],font[*],font-face[*],font-face-format[*],font-face-name[*],font-face-src[*],font-face-uri[*],foreignObject[*],g[*],glyph[*],glyphRef[*],hkern[*],image[*],line[*],linearGradient[*],marker[*],mask[*],metadata[*],missing-glyph[*],mpath[*],path[*],pattern[*],polygon[*],polyline[*],radialGradient[*],rect[*],script[*],set[*],stop[*],style[*],svg[*],switch[*],symbol[*],text[*],textPath[*],title[*],tref[*],tspan[*],use[*],view[*],vkern[*],a[*],animate[*],animateMotion[*],animateTransform[*],circle[*],clipPath[*],defs[*],desc[*],discard[*],ellipse[*],feBlend[*],feColorMatrix[*],feComponentTransfer[*],feComposite[*],feConvolveMatrix[*],feDiffuseLighting[*],feDisplacementMap[*],feDistantLight[*],feDropShadow[*],feFlood[*],feFuncA[*],feFuncB[*],feFuncG[*],feFuncR[*],feGaussianBlur[*],feImage[*],feMerge[*],feMergeNode[*],feMorphology[*],feOffset[*],fePointLight[*],feSpecularLighting[*],feSpotLight[*],feTile[*],feTurbulence[*],filter[*],foreignObject[*],g[*],hatch[*],hatchpath[*],image[*],line[*],linearGradient[*],marker[*],mask[*],metadata[*],mpath[*],path[*],pattern[*],polygon[*],polyline[*],radialGradient[*],rect[*],script[*],set[*],stop[*],style[*],svg[*],switch[*],symbol[*],text[*],textPath[*],title[*],tspan[*],use[*],view[*],g[*],animate[*],animateColor[*],animateMotion[*],animateTransform[*],discard[*],mpath[*],set[*],circle[*],ellipse[*],line[*],polygon[*],polyline[*],rect[*],a[*],defs[*],g[*],marker[*],mask[*],missing-glyph[*],pattern[*],svg[*],switch[*],symbol[*],desc[*],metadata[*],title[*],feBlend[*],feColorMatrix[*],feComponentTransfer[*],feComposite[*],feConvolveMatrix[*],feDiffuseLighting[*],feDisplacementMap[*],feDropShadow[*],feFlood[*],feFuncA[*],feFuncB[*],feFuncG[*],feFuncR[*],feGaussianBlur[*],feImage[*],feMerge[*],feMergeNode[*],feMorphology[*],feOffset[*],feSpecularLighting[*],feTile[*],feTurbulence[*],font[*],font-face[*],font-face-format[*],font-face-name[*],font-face-src[*],font-face-uri[*],hkern[*],vkern[*],linearGradient[*],radialGradient[*],stop[*],circle[*],ellipse[*],image[*],line[*],path[*],polygon[*],polyline[*],rect[*],text[*],use[*],use[*],feDistantLight[*],fePointLight[*],feSpotLight[*],clipPath[*],defs[*],hatch[*],linearGradient[*],marker[*],mask[*],metadata[*],pattern[*],radialGradient[*],script[*],style[*],symbol[*],title[*],hatch[*],linearGradient[*],pattern[*],radialGradient[*],solidcolor[*],a[*],circle[*],ellipse[*],foreignObject[*],g[*],image[*],line[*],path[*],polygon[*],polyline[*],rect[*],svg[*],switch[*],symbol[*],text[*],textPath[*],tspan[*],use[*],g[*],circle[*],ellipse[*],line[*],path[*],polygon[*],polyline[*],rect[*],defs[*],g[*],svg[*],symbol[*],use[*],altGlyph[*],altGlyphDef[*],altGlyphItem[*],glyph[*],glyphRef[*],textPath[*],text[*],tref[*],tspan[*],altGlyph[*],textPath[*],tref[*],tspan[*],clipPath[*],cursor[*],filter[*],foreignObject[*],hatchpath[*],script[*],style[*],view[*],altGlyph[*],altGlyphDef[*],altGlyphItem[*],animateColor[*],cursor[*],font[*],font-face[*],font-face-format[*],font-face-name[*],font-face-src[*],font-face-uri[*],glyph[*],glyphRef[*],hkern[*],missing-glyph[*],tref[*],vkern[*]",
                                toolbar: 'preview image media | undo redo | formatselect | ' +
                                'bold italic underline strikethrough backcolor forecolor | emoticons fontsize blocks fontfamily | bullist numlist outdent indent | ' +
                                'removeformat | subscript superscript | code | pastetext | numlist bullist | fullscreen | spellCheck',
                                table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"
                             }}
                        />
                    </Column>
                </Column>
                <span className="error">
                   <Message text={message} color={color} special={special}/>
                </span>
                <Row>
                    <Button type="reset" onClick={resetForm}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                    <Button type="submit" onClick={submitLogin}>Dodaj</Button>
                </Row>
            </Form>
        </div>
    )
}

export default AddTaskForm