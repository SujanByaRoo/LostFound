import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const categories = [
  { value: 'all', label: '🌍 All Categories' },
  { value: 'electronics', label: '💻 Electronics' },
  { value: 'bags', label: '🎒 Bags' },
  { value: 'keys', label: '🔑 Keys' },
  { value: 'documents', label: '📄 Documents' },
  { value: 'accessories', label: '💍 Accessories' },
  { value: 'clothing', label: '👕 Clothing' },
]

const categoryLabels = {
  electronics: '💻 Electronics',
  bags: '🎒 Bags',
  keys: '🔑 Keys',
  documents: '📄 Documents',
  accessories: '💍 Accessories',
  clothing: '👕 Clothing',
  other: '📦 Other',
}

function timeAgo(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`
  return `${Math.floor(diff / 86400)} days ago`
}

export default function Browse() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://127.0.0.1:8000/items')
      const result = await response.json()
      if (result.status === 'success') {
        setItems(result.data)
      } else {
        setError('Failed to load items')
      }
    } catch (err) {
      setError('Cannot connect to server. Is backend running?')
    } finally {
      setLoading(false)
    }
  }

  const filtered = items.filter(item => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'all' || item.type === typeFilter
    const matchCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchSearch && matchType && matchCategory
  })

  return (
    <main className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            Browse Items
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Search through lost and found reports worldwide
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search by item name, description, or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex bg-gray-100 dark:bg-white/5 rounded-xl p-1 border border-gray-200 dark:border-white/10">
            {['all', 'lost', 'found'].map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                  typeFilter === type
                    ? type === 'lost'
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : type === 'found'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {type === 'all' ? '🌍 All' : type === 'lost' ? '✗ Lost' : '✓ Found'}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  categoryFilter === cat.value
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                    : 'bg-gray-50 dark:bg-white/3 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-emerald-500/30 hover:text-emerald-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> results
            {search && <span> for "<span className="text-emerald-500">{search}</span>"</span>}
          </p>
          <Link to="/report" className="text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
            + Add Report
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-gray-500 dark:text-gray-400">Loading items...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchItems}
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Items Grid */}
        {!loading && !error && (
          filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Try different search terms or filters</p>
              <Link
                to="/report"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
              >
                + Report an Item
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map(item => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    hoveredId === item.id
                      ? 'border-emerald-500/30 bg-white dark:bg-white/5 -translate-y-1 shadow-xl shadow-emerald-500/10'
                      : 'border-gray-100 dark:border-white/5 bg-white dark:bg-white/3'
                  }`}
                >
                  {/* Image if exists */}
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}

                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.type === 'found'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {item.type === 'found' ? '✓ Found' : '✗ Lost'}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-600">
                        {categoryLabels[item.category] || item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200 ${
                    hoveredId === item.id ? 'text-emerald-500' : ''
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-600">
                      <span>📍 {item.location}</span>
                      <span>🕐 {timeAgo(item.created_at)}</span>
                    </div>
                    <Link
                    to={`/match/${item.id}`}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                      item.type === 'found'
                      ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                      : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                      }`}
>
{item.type === 'found' ? 'This is mine →' : 'I found this →'}
</Link>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </main>
  )
}