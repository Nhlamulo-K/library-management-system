import { useEffect, useState } from "react";
import BookCard from "./BookCard";

type Book = {
    id: number
    title: string
    author: string
    isbn: string
}

type BookBridProps = {
    search: string
    genreId: string
}

function BookGrid({search, genreId}: BookBridProps) {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function fetchBooks() {
            try {
                setLoading(true)
                setError('')

                const params = new URLSearchParams()
                params.append('page', page.toString())
                params.append('limit', '10')

                if (search) {
                    params.append('search', search)
                }

                if (genreId) {
                    params.append('genreId', genreId)
                }

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/books?${params.toString()}`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch books')
                }

                const data: Book[] = await response.json()
                setBooks(data)
            }
            catch (err) {
                setError('Could not load books. Please try again')
            }
            finally {
                setLoading(false)
            }
        }
        fetchBooks()
    }, [search, genreId, page])

    if (loading) {
        return <p>Loading books...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (books.length === 0) {
        return <p>No books found!</p>
    }

    useEffect(() => {
        setPage(1)
    }, [search, genreId])

    return (
        <div>
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}

            <div>
                <button onClick={() => setPage(page-1)} disabled={page===1}>
                    Previous
                </button>

                <span>Page {page}</span>

                <button onClick={() => setPage(page+1)} disabled={books.length<10}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default BookGrid