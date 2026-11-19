import { useEffect, useState } from "react";

type SearchBarProps = {
    onSearch: (search: string) => void
}

function SearchBar({onSearch}: SearchBarProps) {
    const [search, setSearch] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(search)
        }, 500)

        return () => clearTimeout(timer)
    }, [search, onSearch])

    return (
        <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
    )
}

export default SearchBar