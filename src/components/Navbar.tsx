import { NavLink } from 'react-router-dom'

const link = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
    isActive ? 'bg-emerald-600 text-white' : 'text-stone-600 hover:bg-stone-200/70'
  }`

export default function Navbar() {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-emerald-600">
            <span className="size-3 rounded-full bg-white" />
          </span>
          <span className="text-lg font-bold tracking-tight">Odak</span>
          <span className="hidden text-sm text-stone-400 sm:inline">Çalışma Planlayıcı</span>
        </NavLink>
        <div className="flex gap-1">
          <NavLink to="/" end className={link}>Görevler</NavLink>
          <NavLink to="/istatistik" className={link}>İstatistik</NavLink>
        </div>
      </nav>
    </header>
  )
}
