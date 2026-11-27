import { useReadingList } from "../context/ReadingListContext"
import { Link } from "react-router-dom"

function Navbar() {
    const {readingList} = useReadingList()
    return (
        <nav>
            <h2>Library Management System</h2>

            <p>Reading List: {readingList.length} books</p>

            <div>
                <Link to="/">Home</Link>
                {' | '}
                <Link to="/login">Login</Link>
                {' | '}
                <Link to="/register">Register</Link>
                {' | '}
                <Link to="/space-booking">Space Booking</Link>
            </div>
        </nav>
    )
}

export default Navbar