import type { Gorev } from '../interfaces/Gorev'
import { yerelTarih } from '../utils/tarih'

export default function IstatistikSayfasi({ gorevler }: { gorevler: Gorev[] }) {
  const bugun = yerelTarih()
  const toplam = gorevler.length
  const tamamlanan = gorevler.filter((g) => g.tamamlandi).length
  const geciken = gorevler.filter((g) => !g.tamamlandi && g.sonTarih < bugun).length
  const oran = toplam ? Math.round((tamamlanan / toplam) * 100) : 0

  const dersBazli = Object.entries(
    gorevler.reduce<Record<string, { toplam: number; biten: number }>>((acc, g) => {
      acc[g.ders] ??= { toplam: 0, biten: 0 }
      acc[g.ders].toplam++
      if (g.tamamlandi) acc[g.ders].biten++
      return acc
    }, {}),
  ).sort((a, b) => b[1].toplam - a[1].toplam)

  const kartlar = [
    { etiket: 'Toplam görev', deger: toplam, renk: 'text-stone-900' },
    { etiket: 'Tamamlanan', deger: tamamlanan, renk: 'text-emerald-600' },
    { etiket: 'Yapılacak', deger: toplam - tamamlanan, renk: 'text-amber-600' },
    { etiket: 'Geciken', deger: geciken, renk: 'text-rose-600' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">İstatistik</h1>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {kartlar.map((k) => (
          <div key={k.etiket} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <p className={`text-3xl font-bold ${k.renk}`}>{k.deger}</p>
            <p className="mt-1 text-sm text-stone-500">{k.etiket}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-semibold">Genel ilerleme</span>
          <span className="font-semibold text-emerald-600">%{oran}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-stone-100">
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${oran}%` }} />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
        <h2 className="mb-4 font-semibold">Derslere göre ilerleme</h2>
        {dersBazli.length === 0 ? (
          <p className="text-sm text-stone-500">Görev ekledikçe burada ders ders ilerlemen görünecek.</p>
        ) : (
          <ul className="space-y-4">
            {dersBazli.map(([ders, s]) => (
              <li key={ders}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{ders}</span>
                  <span className="text-stone-500">{s.biten} / {s.toplam} tamamlandı</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(s.biten / s.toplam) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
