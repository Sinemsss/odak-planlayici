import { useEffect, useState, type FormEvent } from 'react'
import { yerelTarih } from '../utils/tarih'
import type { Gorev, GorevGirdisi, Oncelik } from '../interfaces/Gorev'
import { ONCELIK_ETIKETI } from '../interfaces/Gorev'

interface Props {
  duzenlenen: Gorev | null
  dersler: string[]
  onKaydet: (girdi: GorevGirdisi) => void
  onVazgec: () => void
}

const bugun = () => yerelTarih()
const bos: GorevGirdisi = { baslik: '', ders: '', oncelik: 'orta', sonTarih: bugun() }

const alan =
  'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'

export default function GorevFormu({ duzenlenen, dersler, onKaydet, onVazgec }: Props) {
  const [form, setForm] = useState<GorevGirdisi>(bos)
  const [hata, setHata] = useState('')

  // Düzenleme moduna geçildiğinde formu o görevle doldur
  useEffect(() => {
    setForm(duzenlenen
      ? { baslik: duzenlenen.baslik, ders: duzenlenen.ders, oncelik: duzenlenen.oncelik, sonTarih: duzenlenen.sonTarih }
      : { ...bos, sonTarih: bugun() })
    setHata('')
  }, [duzenlenen])

  const gonder = (e: FormEvent) => {
    e.preventDefault()
    if (form.baslik.trim().length < 3) return setHata('Görev başlığı en az 3 karakter olmalı.')
    if (!form.ders.trim()) return setHata('Bir ders adı gir.')
    onKaydet({ ...form, baslik: form.baslik.trim(), ders: form.ders.trim() })
    if (!duzenlenen) setForm({ ...bos, sonTarih: bugun() })
    setHata('')
  }

  return (
    <form onSubmit={gonder} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <h2 className="mb-4 text-lg font-semibold">
        {duzenlenen ? 'Görevi güncelle' : 'Yeni görev ekle'}
      </h2>

      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-stone-500">Görev</span>
          <input className={alan} value={form.baslik} placeholder="Örn. Limit konusundan 30 soru"
            onChange={(e) => setForm({ ...form, baslik: e.target.value })} />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-stone-500">Ders</span>
          <input className={alan} list="ders-listesi" value={form.ders} placeholder="Örn. Matematik"
            onChange={(e) => setForm({ ...form, ders: e.target.value })} />
          <datalist id="ders-listesi">
            {dersler.map((d) => <option key={d} value={d} />)}
          </datalist>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-stone-500">Öncelik</span>
            <select className={alan} value={form.oncelik}
              onChange={(e) => setForm({ ...form, oncelik: e.target.value as Oncelik })}>
              {(Object.keys(ONCELIK_ETIKETI) as Oncelik[]).map((o) => (
                <option key={o} value={o}>{ONCELIK_ETIKETI[o]}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-stone-500">Son tarih</span>
            <input type="date" className={alan} value={form.sonTarih}
              onChange={(e) => setForm({ ...form, sonTarih: e.target.value })} />
          </label>
        </div>
      </div>

      {hata && <p className="mt-3 text-sm text-rose-600">{hata}</p>}

      <div className="mt-5 flex gap-2">
        <button type="submit"
          className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
          {duzenlenen ? 'Değişiklikleri kaydet' : 'Görevi ekle'}
        </button>
        {duzenlenen && (
          <button type="button" onClick={onVazgec}
            className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 ring-1 ring-stone-300 hover:bg-stone-50">
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}
