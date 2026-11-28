import { Link } from "react-router-dom"
import { useReadingList } from "../context/ReadingListContext"

type BookCardProps = {
    book: {
        id: number
        title: string
        author: string
        isbn: string
    }
}

function BookCard({book}: BookCardProps) {
    const {readingList, dispatch} = useReadingList()

    const isInReadingList = readingList.some(
        (item) => item.id === book.id
    )

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>

            <Link to={`/books/${book.id}`}>View Details</Link>

            <button
                onClick={() => {
                    if (isInReadingList) {
                        dispatch({
                            type: 'REMOVE_BOOK',
                            payload: book.id
                        })
                    }
                    else {
                        dispatch({
                            type: 'ADD_BOOK',
                            payload: book
                        })
                    }
                }}
            >
                {isInReadingList ? 'Already in Reading List' : 'Add to Reading List'}
            </button>
        </div>
    )
}

export default BookCard