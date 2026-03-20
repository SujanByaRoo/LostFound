import { useState } from 'react'

export default function ReportItem() {
  const [mode, setMode] = useState('found')
  const [dragOver, setDragOver] = useState(false)
  const [image, setImage] = useState(null)
  const [form, setForm] = useState({
    title: '', description: '', category: '', location: '', date: '', email: ''
  })

  const categories = [
    { value: 'electronics', label: '💻 Electronics' },
    { value: 'bags', label: '🎒 Bags' },
    { value: 'keys', label: '🔑 Keys' },
    { value: 'documents', label: '📄 Documents' },
    { value: 'accessories', label: '💍 Accessories' },
    { value: 'clothing', label: '👕 Clothing' },
    { value: 'other', label: '📦 Other' },
  ]

  const handleImage = (file) => {
    if (file) setImage(URL.createObjectURL(file))
  }

  return (
    <main className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            Report an Item
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Help reunite items with their owners worldwide
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="relative flex bg-gray-100 dark:bg-white/5 rounded-2xl p-1 mb-10 border border-gray-200 dark:border-white/10">
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-xl transition-all duration-300 ${
              mode === 'lost'
                ? 'left-1 bg-red-500 shadow-lg shadow-red-500/25'
                : 'left-1/2 -translate-x-1 bg-emerald-500 shadow-lg shadow-emerald-500/25'
            }`}
          />
          <button
            onClick={() => setMode('lost')}
            className={`relative z-10 flex-1 py-3 rounded-xl text-sm font-bold transition-colors duration-300 ${
              mode === 'lost' ? 'text-white' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            😟 I Lost Something
          </button>
          <button
            onClick={() => setMode('found')}
            className={`relative z-10 flex-1 py-3 rounded-xl text-sm font-bold transition-colors duration-300 ${
              mode === 'found' ? 'text-white' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            🎉 I Found Something
          </button>
        </div>

        {/* Mode Banner */}
        <div className={`mb-8 p-4 rounded-2xl border ${
          mode === 'found'
            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
            : 'bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400'
        }`}>
          <p className="text-sm font-medium">
            {mode === 'found'
              ? '✓ You are posting a FOUND item. The owner will be notified if we find a match.'
              : '✗ You are reporting a LOST item. We will notify you the moment a match is found.'}
          </p>
        </div>

        <div className="space-y-6">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📸 Photo <span className="text-gray-400 font-normal">(helps AI matching)</span>
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleImage(e.dataTransfer.files[0]) }}
              onClick={() => document.getElementById('fileInput').click()}
              className={`relative h-48 rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden ${
                dragOver
                  ? 'border-emerald-500 bg-emerald-500/5 scale-[1.02]'
                  : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/2 hover:border-emerald-500/50 hover:bg-emerald-500/2'
              }`}
            >
              {image ? (
                <img src={image} alt="preview" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <div className="text-4xl">📷</div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Drop a photo or click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB</p>
                  </div>
                </>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImage(e.target.files[0])}
              />
            </div>
            {image && (
              <button
                onClick={() => setImage(null)}
                className="mt-2 text-xs text-red-500 hover:text-red-400 transition-colors"
              >
                ✕ Remove photo
              </button>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Item Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Black North Face Backpack"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describe the item — color, size, brand, any distinguishing marks..."
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm resize-none"
            />
          </div>

          {/* Category + Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
              >
                <option value="">Select category</option>
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. JFK Airport, New York"
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Date + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({...form, date: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <span className="text-blue-500 text-lg">🔒</span>
            <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
              Your email is never shown publicly. It's only used to notify you of matches and shared only after a verified connection is made inside the app.
            </p>
          </div>

          {/* Submit */}
          <button
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl ${
              mode === 'found'
                ? 'bg-emerald-500 hover:bg-emerald-400 hover:shadow-emerald-500/30'
                : 'bg-red-500 hover:bg-red-400 hover:shadow-red-500/30'
            }`}
          >
            {mode === 'found' ? '🎉 Post Found Item' : '🔍 Report Lost Item'}
          </button>

        </div>
      </div>
    </main>
  )
}