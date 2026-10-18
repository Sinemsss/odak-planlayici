import type { DurumFiltresi } from '../interfaces/Gorev'

interface Props {
  durum: DurumFiltresi
  ders: string
  arama: string
  dersler: string[]
  onDurum: (d: DurumFiltresi) => void
  onDers: (d: string) => void
  onArama: (a: string) => void
}

const DURUMLAR: [DurumFiltresi, string][] = [
  ['tumu', 'Tümü'],
  ['aktif', 'Yapılacak'],
  ['tamamlanan', 'Tamamlanan'],
]

export default function FiltreCubugu({ durum, ders, arama, dersler, onDurum, onDers, onArama }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex rounded-lg bg-stone-200/70 p-1 text-sm">
        {DURUMLAR.map(([deger, etiket]) => (
          <button key={deger} onClick={() => onDurum(deger)}
            className={`flex-1 rounded-md px-3 py-1.5 font-medium transition sm:flex-none
              ${durum === deger ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}>
            {etiket}
          </button>
        ))}
      </div>
      <div className="flex flex-1 gap-2">
        <select value={ders} onChange={(e) => onDers(e.target.value)}
          className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500">
          <option value="">Tüm dersler</option>
          {dersler.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <input value={arama} onChange={(e) => onArama(e.target.value)} placeholder="Görev ara…"
          className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500" />
      </div>
    </div>
  )
}
