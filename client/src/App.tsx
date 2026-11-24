import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookDetail from './pages/BookDetail'
import { ReadingListProvider } from './context/ReadingListContext'

function App() {
  return (
    <ReadingListProvider>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </ReadingListProvider>
  )
}

export default App
