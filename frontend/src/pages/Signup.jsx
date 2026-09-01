import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e?.preventDefault()
    if (!email || !password || !confirm) { setError('Please fill in all fields!'); return }
    if (password !== confirm) { setError('Passwords do not match!'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters!'); return }
    setLoading(true)
    setError(null)
    const { error } = await signUp(email, password)
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="pt-28 pb-20 px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-full max-w-md p-8 text-center rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 shadow-xl backdrop-blur-xl">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Check your email!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">
            We sent a confirmation link to <br /><span className="text-emerald-500 font-bold">{email}</span>
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
          >
            Go to Login →
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-20 px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 shadow-xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md shadow-emerald-500/25 mb-4">
              <span className="text-white text-base font-black">LF</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
              Create Account 🚀
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Join LostFound to report and track lost items
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="Repeat password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
              />
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-base bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? '⏳ Creating...' : '🚀 Create Account'}
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-3">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-500 font-bold hover:text-emerald-400 transition-colors">
                Sign in →
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
