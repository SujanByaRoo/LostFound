import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ dark, toggleDark }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Report Item', path: '/report' },
    { name: 'Browse', path: '/browse' },
  ]

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <span className="text-white text-xs font-black tracking-tight">LF</span>
          </div>
          <div>
            <span className="font-black text-gray-900 dark:text-white text-lg tracking-tight">
              Lost<span className="text-emerald-500">Found</span>
            </span>
            <div className="text-[10px] text-gray-400 dark:text-gray-500 -mt-1 font-medium">Global Network</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                location.pathname === link.path
                  ? 'text-emerald-500 bg-emerald-500/10'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            title="Toggle theme"
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-105"
          >
            {dark ? '🌙' : '☀️'}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/5">
                👤 {user.email?.split('@')[0]}
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/report"
                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 shadow-md shadow-emerald-500/20"
              >
                <span>+</span>
                <span>Report Found</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-sm"
          >
            {dark ? '🌙' : '☀️'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold ${
                location.pathname === link.path
                  ? 'text-emerald-500 bg-emerald-500/10'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-200 dark:border-white/10">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}