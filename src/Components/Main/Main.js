import './Main.css'
import BookList from "../BookList/BookList";

function Main(props){
    document.title = "Home"
    return (
        <div className="main-element">
            <BookList/>
        </div>
    )
}

export default Main