import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Match() {
  const { id } = useParams()
  const [matches, setMatches] = useState([])
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMatches()
  }, [id])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://127.0.0.1:8000/match/${id}`)
      const result = await response.json()

      if (result.status === 'success') {
        setMatches(result.matches)
        // Get the original item details
        const itemRes = await fetch(`http://127.0.0.1:8000/items/${id}`)
        const itemResult = await itemRes.json()
        if (itemResult.status === 'success') {
          setItem(itemResult.data)
        }
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Cannot connect to server!')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500'
    if (score >= 60) return 'text-amber-500'
    return 'text-red-500'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-emerald-500'
    if (score >= 60) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return '🔥 Strong Match'
    if (score >= 60) return '⚡ Possible Match'
    return '🔍 Weak Match'
  }

  return (
    <main className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link
            to="/browse"
            className="text-sm text-gray-400 hover:text-emerald-500 transition-colors mb-4 inline-block"
          >
            ← Back to Browse
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            AI Matches
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Items that might be related to your report
          </p>
        </div>

        {/* Original Item Card */}
        {item && (
          <div className="mb-10 p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5">
            <p className="text-xs font-bold text-emerald-500 mb-2 uppercase tracking-wider">Your Item</p>
            <div className="flex items-start gap-4">
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="w-20 h-20 object-cover rounded-xl" />
              )}
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block ${
                  item.type === 'found' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {item.type === 'found' ? '✓ Found' : '✗ Lost'}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                <p className="text-xs text-gray-400 mt-2">📍 {item.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 animate-pulse">🤖</div>
            <p className="text-gray-500 dark:text-gray-400">AI is finding matches...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Matches */}
        {!loading && !error && (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Found <span className="font-bold text-gray-900 dark:text-white">{matches.length}</span> potential matches
            </p>

            {matches.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No matches yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  We'll notify you when a match is found!
                </p>
                <Link
                  to="/browse"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
                >
                  Browse All Items
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((match, index) => (
                  <div
                    key={match.item.id}
                    className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/3 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-gray-300 dark:text-white/20">
                          #{index + 1}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {getScoreLabel(match.score)}
                          </span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-400">AI Confidence</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${getScoreBg(match.score)}`}
                              style={{ width: `${match.score}%` }}
                            />
                          </div>
                          <span className={`text-lg font-black ${getScoreColor(match.score)}`}>
                            {match.score}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex items-start gap-4">
                      {match.item.image_url && (
                        <img
                          src={match.item.image_url}
                          alt={match.item.title}
                          className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            match.item.type === 'found'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-red-500/10 text-red-500'
                          }`}>
                            {match.item.type === 'found' ? '✓ Found' : '✗ Lost'}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                          {match.item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                          {match.item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">📍 {match.item.location}</p>
                          <button className="text-xs font-bold px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all duration-200">
                            Contact Owner →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}