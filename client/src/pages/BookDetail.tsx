import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Book = {
    id: number
    title: string
    author: string
    isbn: string
    totalCopies: number
    genreId: number
}

function BookDetail() {
    const {id} = useParams()

    const [book, setBook] = useState<Book | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchBook() {
            try {
                setLoading(true)
                setError('')

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/books/${id}`
                )

                if (!response.ok) {
                    throw new Error('Book not found')
                }

                const data: Book = await response.json()
                setBook(data)
            }
            catch (err) {setError('Could not load book details')}
            finally {setLoading(false)}
        }
        fetchBook()
    }, [id])

    if (loading) {
        return <p>Loading book details...</p>
    }

    if (error) {return <p>{error}</p>}

    if (!book) {return <p>Book not found!</p>}

    return (
        <div>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Total Copies: {book.totalCopies}</p>
        </div>
    )
}

export default BookDetail