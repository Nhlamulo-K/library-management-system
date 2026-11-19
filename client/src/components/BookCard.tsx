type BookCardProps = {
    book: {
        id: number
        title: string
        author: string
        isbn: string
    }
}

function BookCard({book}: BookCardProps) {
    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
        </div>
    )
}

export default BookCard