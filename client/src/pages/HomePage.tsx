import { useState, useEffect } from "react"
import BookGrid from "../components/BookGrid"
import SearchBar from "../components/SearchBar"

type Genre = {
    id: number
    name: string
}

function HomePage() {
    const [search, setSearch] = useState('')
    const [genreId, setGenreId] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/genres`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch genres')
                }

                const data: Genre[] = await response.json()
                setGenres(data)
            }
            catch (error) {
                console.error('Could not load genres:', error)
            }
        }
        fetchGenres()
    }, [])

    return (
        <div>
            <h1>Library Management System</h1>
            <SearchBar onSearch={setSearch} />

            <select
                value={genreId}
                onChange={(event) => setGenreId(event.target.value)}
            >
                <option value="">All Genres</option>

                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>

            <BookGrid search={search} genreId={genreId}/>
        </div>
    )
}

export default HomePage