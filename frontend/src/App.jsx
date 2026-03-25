import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ReportItem from './pages/ReportItem'
import Browse from './pages/Browse'
import Match from './pages/Match'

function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ring, setRing] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const moveCursor = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 80)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <>
      <div className="cursor-dot" style={{ left: pos.x - 4, top: pos.y - 4 }} />
      <div className="cursor-ring" style={{ left: ring.x - 17, top: ring.y - 17 }} />
    </>
  )
}

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
    <BrowserRouter>
      <CursorFollower />
      <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <Navbar dark={dark} toggleDark={toggleDark} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/match/:id" element={<Match />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}