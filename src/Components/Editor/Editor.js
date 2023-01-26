import './Editor.css'

import Button from "../Button/Button";
import { Editor as EditorTiny } from '@tinymce/tinymce-react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Column from "../Column/Column";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import apiUrl from "../../apiUrl";
import getCsrfToken from "../../utils/csrf";
import Message from "../Message/Message";
import HyperButton from "../HyperButton/HyperButton";
import Text from "../Text/Text";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk, faPen} from "@fortawesome/free-solid-svg-icons";
import {useGlobalState} from "../../utils/globalState";
import {Redirect} from "react-router-dom";
import Window from "../Window/Window";

function Editor(props){
    let [value, setValue] = useState("")
    let [message, setMessage] = React.useState("")
    let [color, setColor] = React.useState("red")
    let [special, setSpecial] = React.useState(Math.random())
    let [number, setNumber] = React.useState(0)
    let [page, setPage] = React.useState(0)
    let [book, setBook] = React.useState("")
    let [images_s, setImages_s] = React.useState("")
    let [saved, setSaved] = React.useState(true)
    let [showWindow, setShowWindow] = React.useState(false)
    let [images, setImages] = React.useState([])

    const editorRef = useRef(null)



    async function onSubmit(){
         axios({
            method:'post',
            url: `${apiUrl}/edit_task/`,
            headers: {
                'X-CSRFTOKEN': await getCsrfToken(),
                'Content-type': 'application/json; charset=UTF-8',
            },
            data:{
                answer: await editorRef.current.getContent(),
                task: props.match.params.id
            },
            withCredentials: true,
            responseType: 'json',
        }).then(response=>{
            setSpecial(Math.random())
            if(response.data.code === 200){
                setColor("#00FF00")
                setSaved(true)
            }else{
                setColor("#FF0000")
                setSaved(false)
            }
            setMessage(response.data.message.text)
        })
    }

    function getValue(){
        axios({
            method:'get',
            url: `${apiUrl}/task/${props.match.params.id}`,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            withCredentials: true,
            responseType: 'json',
        }).then(response=>{
            setValue(response.data.answer)
            setPage(response.data.page)
            setNumber(response.data.number)
            setBook(response.data.book.name)
            setImages(response.data.images)


        })

    }
    useEffect(()=>{
        getValue()
    }, [])

    useEffect(()=>{
        let imgs = new Set()
        Object.entries(images).forEach(([key, val])=>{
            imgs.add(<Button onClick={() => {navigator.clipboard.writeText(`<img src='${apiUrl}/image/${key}'>`)}}>{key}</Button>)
        })
        setImages_s(Array.from(imgs))
    }, [images])

    function unSave(){
        setSaved(false)
    }

    let [is_superuser] = useGlobalState('is_superuser')
    if(is_superuser === false){
        return  <Redirect exact to="/"/>
    }
    return (
        <>
            <span style={{
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 30
            }}>
                <HyperButton color="#292929" fontColor="white" to={"/task/"+props.match.params.id}>Zadanie</HyperButton>
            </span>
            <EditorTiny
                apiKey="4c5ubylmkd32esa7gn5drh38i4pqdzpm8w3ccx4rbs30o6qx"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue= {value}
                onEditorChange={unSave}
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
            <Column>
                <Button onClick={onSubmit} style={{
                    position: "fixed",
                    top: 10,
                    left: 0,
                    border: "3px solid #000",
                    zIndex: 30,
                    backgroundColor: saved ? "#2de388" : "#e33c2d",
                    color: saved ? "black" : "white",
                }}>

                    <span
                        style={{

                            margin: "0 10px 0 10px"
                        }}
                    ><FontAwesomeIcon icon={faFloppyDisk}/></span>
                </Button>
                <Button onClick={()=>{setShowWindow(!showWindow)}} style={{
                    position: "fixed",
                    top: 10,
                    left: 100,
                    border: "3px solid #000",
                    zIndex: 30,
                    backgroundColor: "white",
                }}>

                    <span
                        style={{

                            margin: "0 10px 0 10px"
                        }}
                    ><FontAwesomeIcon icon={faPen}/></span>
                </Button>
            </Column>
            <br/><br/>
            <div className="preview_html">
                <CodeEditor
                    value={value}
                    language="html"
                    placeholder="Empty"
                    onChange={(evn) => setValue(evn.target.value)}
                    padding={30}
                    style={{
                        width: "100%",
                        fontSize: 17,
                        borderRadius:'10px',
                        backgroundColor: "#292929",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </div>
            <Window show={showWindow} setShow={setShowWindow} background="white">
                <div className="numberPageBook">
                    {images_s}
                    <Text
                        fontWeight={700}
                        font={30}
                        align="center"
                    >
                        <br/>
                        <br/>
                        <HyperButton blank={true} to={`${apiUrl}/admin/main/task/${props.match.params.id}/change/`}>ADMIN</HyperButton>
                        <HyperButton blank={true} to={`${apiUrl}/add_image/${props.match.params.id}`}>DODAJ ZDJĘCIE</HyperButton>
                        <HyperButton blank={true} to={`${apiUrl}/convert_svg/${props.match.params.id}`}>SVG - PNG</HyperButton>
                    </Text>
                    <br/>

                </div>
            </Window>

            <span className="error">
               <Message text={message} color={color} special={special}/>
            </span>

        </>
    )
}

export default Editor