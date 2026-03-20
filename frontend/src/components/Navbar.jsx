import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ dark, toggleDark }) {
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Report Item', path: '/report' },
    { name: 'Browse', path: '/browse' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/5 dark:bg-black/20 border-b border-white/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center animate-pulse-glow group-hover:scale-110 transition-transform duration-200">
            <span className="text-white text-xs font-black tracking-tight">LF</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg text-gray-900 dark:text-white tracking-tight">
              Lost<span className="text-emerald-500">Found</span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">Global Network</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center hover:scale-110 transition-all duration-200"
          >
            <span className="text-base">{dark ? '🌛' : '🌞'}</span>
          </button>

          <Link
            to="/report"
            className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            <span>+</span>
            <span>Report Found</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}