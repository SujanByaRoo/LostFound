import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const recentItems = [
  { id: 1, type: 'found', title: 'Silver MacBook Pro', desc: 'Found at Starbucks, 5th Ave. Apple sticker on lid.', location: 'New York, USA', category: '💻 Electronics', time: '2 mins ago', match: 94 },
  { id: 2, type: 'lost', title: 'Black North Face Backpack', desc: 'Left at Shibuya Station. Contains laptop and notebooks.', location: 'Tokyo, Japan', category: '🎒 Bags', time: '5 mins ago', match: null },
  { id: 3, type: 'found', title: 'Car Keys — Toyota Fob', desc: 'Red braided keychain. Found on bench outside mall.', location: 'Dubai, UAE', category: '🔑 Keys', time: '12 mins ago', match: 87 },
  { id: 4, type: 'lost', title: 'Blue Hydroflask Bottle', desc: '32oz with stickers. Dent near bottom. Heathrow Airport.', location: 'London, UK', category: '🎒 Accessories', time: '18 mins ago', match: null },
]

const words = ['Wallet', 'Keys', 'Laptop', 'Passport', 'Phone', 'Bag','what']

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 300)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="pt-20">

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          AI-powered lost & found — worldwide
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white leading-none mb-6 tracking-tight">
          Lost your{' '}
          <span
            className="gradient-text transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {words[wordIndex]}
          </span>
          ?<br />
          <span className="text-emerald-500">We'll find it.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Snap a photo. Our AI matches lost items with found ones globally —
          across airports, streets, and cities worldwide.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link
            to="/report"
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 text-lg"
          >
            📸 Report an Item
          </Link>
          <Link
            to="/browse"
            className="flex items-center justify-center gap-2 bg-white/5 dark:bg-white/5 hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 text-lg"
          >
            🔍 Browse Lost & Found
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {[
            { value: '12.4k', label: 'Items Reunited' },
            { value: '92%', label: 'Match Rate' },
            { value: '185+', label: 'Countries' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">How it works</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Three steps to reunite with your belongings</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📸', step: '01', title: 'Snap & Report', desc: 'Take a photo of a lost or found item. Our AI instantly extracts details — color, brand, features.' },
              { icon: '🤖', step: '02', title: 'AI Matches', desc: 'Our semantic engine compares across thousands of reports globally. No keyword matching — pure intelligence.' },
              { icon: '🤝', step: '03', title: 'Reunite', desc: 'Get notified instantly. Chat securely inside the app. No phone numbers exposed. Ever.' },
            ].map(item => (
              <div key={item.step} className="relative p-8 rounded-3xl bg-white dark:bg-white/3 border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-2 group">
                <div className="absolute top-6 right-6 text-5xl font-black text-gray-100 dark:text-white/5 group-hover:text-emerald-500/10 transition-colors duration-300">{item.step}</div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">Live Feed</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time lost & found reports worldwide</p>
            </div>
            <Link to="/browse" className="text-emerald-500 hover:text-emerald-400 font-semibold text-sm flex items-center gap-1 transition-colors">
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {recentItems.map(item => (
              <div key={item.id} className="group p-6 rounded-2xl bg-white dark:bg-white/3 border border-gray-100 dark:border-white/5 hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.type === 'found'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {item.type === 'found' ? '✓ Found' : '✗ Lost'}
                  </span>
                  {item.match && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${item.match}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-emerald-500">{item.match}%</span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-600">
                  <span>📍 {item.location}</span>
                  <span>{item.category}</span>
                  <span className="ml-auto">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 border border-emerald-500/20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Found something?<br />
              <span className="text-emerald-500">Be a hero today.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">Post it in 30 seconds. Someone out there is looking for it right now.</p>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 text-lg"
            >
              📸 Post a Found Item
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}