export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">LF</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-sm">Lost<span className="text-emerald-500">Found</span></span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          © 2026 LostFound — Reuniting people with their belongings worldwide
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-600">
          <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">API</a>
        </div>
      </div>
    </footer>
  )
}