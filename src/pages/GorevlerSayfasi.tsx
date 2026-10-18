import { useMemo, useState } from 'react'
import FiltreCubugu from '../components/FiltreCubugu'
import GorevFormu from '../components/GorevFormu'
import GorevKarti from '../components/GorevKarti'
import type { DurumFiltresi, Gorev, GorevGirdisi } from '../interfaces/Gorev'

interface Props {
  gorevler: Gorev[]
  ekle: (g: GorevGirdisi) => void
  guncelle: (id: string, d: Partial<Gorev>) => void
  sil: (id: string) => void
}

const ONCELIK_SIRASI = { yuksek: 0, orta: 1, dusuk: 2 }

export default function GorevlerSayfasi({ gorevler, ekle, guncelle, sil }: Props) {
  const [duzenlenenId, setDuzenlenenId] = useState<string | null>(null)
  const [durum, setDurum] = useState<DurumFiltresi>('tumu')
  const [ders, setDers] = useState('')
  const [arama, setArama] = useState('')

  const duzenlenen = gorevler.find((g) => g.id === duzenlenenId) ?? null
  const dersler = useMemo(() => [...new Set(gorevler.map((g) => g.ders))].sort((a, b) => a.localeCompare(b, 'tr')), [gorevler])

  // Listeleme: filtrele, sonra yapılacakları öne, onları da tarih ve önceliğe göre sırala
  const liste = useMemo(() => {
    const aranan = arama.trim().toLocaleLowerCase('tr')
    return gorevler
      .filter((g) => durum === 'tumu' || (durum === 'aktif' ? !g.tamamlandi : g.tamamlandi))
      .filter((g) => !ders || g.ders === ders)
      .filter((g) => !aranan || g.baslik.toLocaleLowerCase('tr').includes(aranan))
      .sort((a, b) =>
        Number(a.tamamlandi) - Number(b.tamamlandi) ||
        a.sonTarih.localeCompare(b.sonTarih) ||
        ONCELIK_SIRASI[a.oncelik] - ONCELIK_SIRASI[b.oncelik])
  }, [gorevler, durum, ders, arama])

  const kalan = gorevler.filter((g) => !g.tamamlandi).length

  const kaydet = (girdi: GorevGirdisi) => {
    if (duzenlenen) {
      guncelle(duzenlenen.id, girdi)
      setDuzenlenenId(null)
    } else {
      ekle(girdi)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <GorevFormu duzenlenen={duzenlenen} dersler={dersler} onKaydet={kaydet} onVazgec={() => setDuzenlenenId(null)} />
      </aside>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Görevlerim</h1>
          <p className="text-sm text-stone-500">
            {kalan === 0 ? 'Her şey tamam 🎉' : `${kalan} görev seni bekliyor`}
          </p>
        </div>

        <FiltreCubugu durum={durum} ders={ders} arama={arama} dersler={dersler}
          onDurum={setDurum} onDers={setDers} onArama={setArama} />

        {liste.length === 0 ? (
          <div className="mt-6 rounded-xl border-2 border-dashed border-stone-300 p-10 text-center text-stone-500">
            {gorevler.length === 0 ? 'Henüz görev yok. Soldaki formdan ilk görevini ekle.' : 'Bu filtreye uyan görev bulunamadı.'}
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {liste.map((g) => (
              <GorevKarti key={g.id} gorev={g} duzenleniyor={g.id === duzenlenenId}
                onTamamla={() => guncelle(g.id, { tamamlandi: !g.tamamlandi })}
                onDuzenle={() => setDuzenlenenId(g.id)}
                onSil={() => { sil(g.id); if (g.id === duzenlenenId) setDuzenlenenId(null) }} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
