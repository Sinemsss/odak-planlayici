import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useGorevler } from './hooks/useGorevler'
import GorevlerSayfasi from './pages/GorevlerSayfasi'
import IstatistikSayfasi from './pages/IstatistikSayfasi'

export default function App() {
  const { gorevler, ekle, guncelle, sil } = useGorevler()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<GorevlerSayfasi gorevler={gorevler} ekle={ekle} guncelle={guncelle} sil={sil} />} />
          <Route path="/istatistik" element={<IstatistikSayfasi gorevler={gorevler} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="pb-8 text-center text-xs text-stone-400">
        Veriler yalnızca bu tarayıcıda (LocalStorage) saklanır.
      </footer>
    </div>
  )
}
