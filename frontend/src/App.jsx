import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ReportItem from './pages/ReportItem'
import Browse from './pages/Browse'
import Match from './pages/Match'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
          <Navbar dark={dark} toggleDark={toggleDark} />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report" element={<ReportItem />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/match/:id" element={<Match />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}