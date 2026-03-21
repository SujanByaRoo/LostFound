import { useState } from 'react'
import { Link } from 'react-router-dom'

const allItems = [
  { id: 1, type: 'found', title: 'Silver MacBook Pro', desc: 'Found at Starbucks, 5th Ave. Apple sticker on lid. Charger included.', location: 'New York, USA', category: 'electronics', categoryLabel: '💻 Electronics', time: '2 mins ago', match: 94 },
  { id: 2, type: 'lost', title: 'Black North Face Backpack', desc: 'Left at Shibuya Station. Contains laptop and notebooks. Very important.', location: 'Tokyo, Japan', category: 'bags', categoryLabel: '🎒 Bags', time: '5 mins ago', match: null },
  { id: 3, type: 'found', title: 'Car Keys — Toyota Fob', desc: 'Red braided keychain. Found on bench outside mall. Toyota key fob.', location: 'Dubai, UAE', category: 'keys', categoryLabel: '🔑 Keys', time: '12 mins ago', match: 87 },
  { id: 4, type: 'lost', title: 'Blue Hydroflask Bottle', desc: '32oz with stickers. Dent near bottom. Last seen at Heathrow Airport.', location: 'London, UK', category: 'accessories', categoryLabel: '💍 Accessories', time: '18 mins ago', match: null },
  { id: 5, type: 'found', title: 'iPhone 15 Pro — Black', desc: 'Found on metro seat. Cracked screen protector. No passcode visible.', location: 'Paris, France', category: 'electronics', categoryLabel: '💻 Electronics', time: '25 mins ago', match: 76 },
  { id: 6, type: 'lost', title: 'Brown Leather Wallet', desc: 'Contains ID cards and some cash. Lost near Central Station platform 4.', location: 'Amsterdam, Netherlands', category: 'accessories', categoryLabel: '💍 Accessories', time: '1 hr ago', match: null },
  { id: 7, type: 'found', title: 'Passport — Indian', desc: 'Found near immigration counter. Name visible on cover page.', location: 'Singapore Changi Airport', category: 'documents', categoryLabel: '📄 Documents', time: '1 hr ago', match: 99 },
  { id: 8, type: 'lost', title: 'AirPods Pro — White Case', desc: 'Lost at gym. Case has a small scratch on the lid. Engraved initials SR.', location: 'Mumbai, India', category: 'electronics', categoryLabel: '💻 Electronics', time: '2 hrs ago', match: null },
]

const categories = [
  { value: 'all', label: '🌍 All Categories' },
  { value: 'electronics', label: '💻 Electronics' },
  { value: 'bags', label: '🎒 Bags' },
  { value: 'keys', label: '🔑 Keys' },
  { value: 'documents', label: '📄 Documents' },
  { value: 'accessories', label: '💍 Accessories' },
  { value: 'clothing', label: '👕 Clothing' },
]

export default function Browse() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = allItems.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
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

          {/* Type Filter */}
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

          {/* Category Filter */}
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
          <Link
            to="/report"
            className="text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            + Add Report
          </Link>
        </div>

        {/* Items Grid */}
        {filtered.length === 0 ? (
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
                    <span className="text-xs text-gray-400 dark:text-gray-600">{item.categoryLabel}</span>
                  </div>

                  {/* AI Match Score */}
                  {item.match && (
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-400">AI Match</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${item.match}%`,
                              background: item.match > 90
                                ? '#10b981'
                                : item.match > 75
                                ? '#f59e0b'
                                : '#ef4444'
                            }}
                          />
                        </div>
                        <span className={`text-xs font-black ${
                          item.match > 90 ? 'text-emerald-500' : item.match > 75 ? 'text-amber-500' : 'text-red-500'
                        }`}>
                          {item.match}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className={`font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200 ${
                  hoveredId === item.id ? 'text-emerald-500' : ''
                }`}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-600">
                    <span>📍 {item.location}</span>
                    <span>🕐 {item.time}</span>
                  </div>
                  <button className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    item.type === 'found'
                      ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                      : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                  }`}>
                    {item.type === 'found' ? 'This is mine →' : 'I found this →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}