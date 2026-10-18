import { useState } from 'react'
import { yerelTarih } from '../utils/tarih'
import type { Gorev } from '../interfaces/Gorev'
import { ONCELIK_ETIKETI } from '../interfaces/Gorev'

interface Props {
  gorev: Gorev
  duzenleniyor: boolean
  onTamamla: () => void
  onDuzenle: () => void
  onSil: () => void
}

const ONCELIK_RENGI = {
  yuksek: 'bg-rose-50 text-rose-700 ring-rose-200',
  orta: 'bg-amber-50 text-amber-700 ring-amber-200',
  dusuk: 'bg-sky-50 text-sky-700 ring-sky-200',
}

function tarihBilgisi(sonTarih: string, tamamlandi: boolean) {
  const bugun = new Date(yerelTarih())
  const fark = Math.round((new Date(sonTarih).getTime() - bugun.getTime()) / 86_400_000)
  const metin = new Date(sonTarih).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', timeZone: 'UTC' })
  if (tamamlandi) return { metin, renk: 'text-stone-400' }
  if (fark < 0) return { metin: `${metin} · ${-fark} gün gecikti`, renk: 'text-rose-600 font-medium' }
  if (fark === 0) return { metin: `${metin} · bugün`, renk: 'text-amber-600 font-medium' }
  return { metin: `${metin} · ${fark} gün kaldı`, renk: 'text-stone-500' }
}

export default function GorevKarti({ gorev, duzenleniyor, onTamamla, onDuzenle, onSil }: Props) {
  const [silOnayi, setSilOnayi] = useState(false)
  const tarih = tarihBilgisi(gorev.sonTarih, gorev.tamamlandi)

  return (
    <li className={`flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 transition
      ${duzenleniyor ? 'ring-2 ring-emerald-400' : 'ring-stone-200'}`}>
      <input type="checkbox" checked={gorev.tamamlandi} onChange={onTamamla}
        aria-label="Tamamlandı olarak işaretle"
        className="mt-1 size-5 shrink-0 cursor-pointer accent-emerald-600" />

      <div className="min-w-0 flex-1">
        <p className={`font-medium ${gorev.tamamlandi ? 'text-stone-400 line-through' : ''}`}>
          {gorev.baslik}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-stone-100 px-2 py-0.5 font-medium text-stone-600">{gorev.ders}</span>
          <span className={`rounded-full px-2 py-0.5 font-medium ring-1 ${ONCELIK_RENGI[gorev.oncelik]}`}>
            {ONCELIK_ETIKETI[gorev.oncelik]}
          </span>
          <span className={tarih.renk}>{tarih.metin}</span>
        </div>
      </div>

      {silOnayi ? (
        <div className="flex shrink-0 items-center gap-1 text-xs">
          <span className="mr-1 text-stone-500">Silinsin mi?</span>
          <button onClick={onSil} className="rounded-md bg-rose-600 px-2 py-1 font-semibold text-white hover:bg-rose-700">Sil</button>
          <button onClick={() => setSilOnayi(false)} className="rounded-md px-2 py-1 text-stone-600 hover:bg-stone-100">Vazgeç</button>
        </div>
      ) : (
        <div className="flex shrink-0 gap-1 text-xs">
          <button onClick={onDuzenle} className="rounded-md px-2 py-1 font-medium text-emerald-700 hover:bg-emerald-50">Düzenle</button>
          <button onClick={() => setSilOnayi(true)} className="rounded-md px-2 py-1 font-medium text-rose-600 hover:bg-rose-50">Sil</button>
        </div>
      )}
    </li>
  )
}
