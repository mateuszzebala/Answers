import './Task.css'

import React , {Component} from 'react'
import Text from '../Text/Text'
import Image from "../Image/Image";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Select from "../Select/Select";
import { createBrowserHistory } from 'history';
import Loading from "../Loading/Loading";
import apiUrl from "../../apiUrl";
import {Link} from "react-router-dom";
import HyperButton from "../HyperButton/HyperButton";

class Task extends Component {
    state = {
        id: this.props.id,
        current_page: 0,
        current_book: 0,
        current_task: 0,
        current_category: 0,
        number: 0,
        page: 0,
        book: "",
        answer: "",
        images: [],
        audios: [],
        videos: [],
        books: [],
        pages: [],
        tasks: [],
        categories: [],
        show: false,
    }

    constructor(props) {
        super(props);
        this.history = createBrowserHistory()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            this.setState({
                id: this.props.id
            }, ()=>{
                this.componentDidMount()
            })

        }
    }


    loadTask(id = this.state.id) {
        this.history.push(`/task/${this.state.id}`)
        this.setState({show: false})
        fetch(`${apiUrl}/task/${id}`).then(response => {
            return response.json()
        }).then(data => {
            this.setState({
                number: data.number,
                page: data.page,
                answer: data.answer,
                book: data.book,
                images: data.images,
                audios: data.audios,
                videos: data.videos,
                current_task: data.current_task,
                current_book: data.current_book,
                current_page: data.current_page,
                current_category: data.current_category
            }, () => {
                let title = this.state.answer.replace(/<[^>]+>/g, '');
                document.title = title.charAt(0).toUpperCase() + title.slice(1)
                fetch(`${apiUrl}/books/${this.state.categories[this.state.current_category][0]}`).then(response => {
                    return response.json()
                }).then(data => {
                    this.setState({
                        books: data
                    }, () => {
                        fetch(`${apiUrl}/pages/${this.state.books[this.state.current_book][0]}`).then(response => {
                            return response.json()
                        }).then(data => {
                            this.setState({
                                pages: data
                            }, () => {
                                fetch(`${apiUrl}/page/${this.state.pages[this.state.current_page][0]}`).then(response => {
                                    return response.json()
                                }).then(data => {
                                    this.setState({
                                        tasks: data,
                                        show: true
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    componentDidMount() {
        fetch(`${apiUrl}/categories`).then(response => {
            return response.json()
        }).then(data => {
            let event = {}
            event.value = this.state.current_category
            this.setState({
                categories: data
            }, () => {
                if (!this.props.id){
                     this.changeCategory(event)
                }
                else {
                    this.loadTask(this.props.id)
                }
            })
        })
    }

    changePage(event) {
        this.setState({
            current_page: event.value,
            current_task: 0,
        }, () => {
            fetch(`${apiUrl}/page/${this.state.pages[this.state.current_page][0]}`).then(response => {
                return response.json()
            }).then(data => {
                let event = {};
                event.value = 0;
                this.setState({
                    tasks: data,
                }, ()=>{
                    this.changeTask(event)
                })

            })
        })
    }

    changeBook(event) {
        this.setState({
            current_book: event.value,
            current_page: 0,
            current_task: 0,
        }, () => {
            fetch(`${apiUrl}/pages/${this.state.books[this.state.current_book][0]}`).then(response => {
                return response.json()
            }).then(data => {
                let event = {};
                event.value = 0;
                this.setState({
                    pages: data
                }, () => {
                    this.changePage(event)
                })
            })
        })
    }

    changeTask(event) {
        this.setState({current_task: event.value}, () => {
            this.setState({id: this.state.tasks[this.state.current_task][0]}, ()=>{
                this.loadTask()
            })
        })
    }


    changeCategory(event){
        this.setState({
            current_category: event.value,
            current_book: 0,
            current_page: 0,
            current_task: 0,
        }, ()=>{
             fetch(`${apiUrl}/books/${this.state.categories[this.state.current_category][0]}`).then(response => {
                return response.json()
            }).then(data => {
                let event = {}
                event.value = this.state.current_book
                this.setState({
                    books: data
                }, () => {
                    this.changeBook(event)
                })
            })
        })
    }

    render() {

        return (
            <div className='task-element'>
                {this.props.admin == true ? <>
                    <span style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        zIndex: 30
                    }}>
                        <HyperButton color="#292929" fontColor="white" to={"/editor/"+this.state.id}>Edytor</HyperButton>
                    </span>
                </> : ""}

                <div className='selects'>
                    <Select hideTop={true} value={this.state.current_category} title="Kategoria" name="category" elements={this.state.categories}
                            onChange={this.changeCategory.bind(this)}/>
                    <Select hideTop={true} value={this.state.current_book} title="Książka" name="book" elements={this.state.books}
                            onChange={this.changeBook.bind(this)}/>
                    <Select hideTop={true} toogles={true} value={this.state.current_page} title="Strona" name="page" elements={this.state.pages}
                            onChange={this.changePage.bind(this)}/>
                    <Select hideTop={true} toogles={true} value={this.state.current_task} title="Zadanie" name="task" elements={this.state.tasks}
                            onChange={this.changeTask.bind(this)}/>
                </div>
                <br/>
                <div style={{display: this.state.show ? "block" : "none"}} className="task">
                    {Object.keys(this.state.audios).map((elem, key) => {
                        return <AudioPlayer text="Audio" src={apiUrl + "/" + this.state.audios[elem]} key={key}></AudioPlayer>
                    })}

                    <Text dangerouslySetInnerHTML={{__html: this.state.answer}}/>

                    {Object.keys(this.state.videos).map((elem, key) => {
                        return <VideoPlayer src={apiUrl + "/" + this.state.videos[elem]} key={key}></VideoPlayer>
                    })}
                </div>
                {this.state.show ? "":<Loading/>}

            </div>
        )
    }
}

export default Task
