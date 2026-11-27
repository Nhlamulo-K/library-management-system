import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookDetail from './pages/BookDetail'
import { ReadingListProvider } from './context/ReadingListContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SpaceBookingPage from './pages/SpaceBookingPage'

function App() {
  return (
    <ReadingListProvider>
      <Routes>
        <Route path="/" element={<><Navbar /> <HomePage/> </>} />
        <Route path="/books/:id" element={<><Navbar /> <BookDetail /> </>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/space-booking" element={<ProtectedRoute><><Navbar /> <SpaceBookingPage/> </> </ProtectedRoute>} />
      </Routes>
    </ReadingListProvider>
  )
}

export default App
