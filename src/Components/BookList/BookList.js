import './BookList.css'
import {useEffect, useState} from "react";
import apiUrl from "../../apiUrl";
import axios from "axios";
import Book from "../Book/Book";
import Loading from "../Loading/Loading";

const BookList = () => {
    let [books, setBooks] = useState([])
    let [f, setF] = useState(0)
    let [loaded, setloaded] = useState(false)
    let [t, setT] = useState(30)

    useEffect(()=>{
        axios({
            method: 'get',
            url: `${apiUrl}/all_books/${f}/${t}`,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            withCredentials: true,
            responseType: 'json',
        }).then(response=>{
            setBooks(response.data)
            setloaded(true)
        })
    }, [f, t])
    if(loaded)
    {
        return (
            <div className="book-list-element">
                {Object.keys(books).map(elem => {
                    return <Book key={elem} element={books[elem]}/>
                })}
            </div>
        )
    }
    else{
        return (
            <Loading/>
        )
    }
}

export default BookList