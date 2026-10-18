import { useEffect, useState } from 'react'
import { yerelTarih } from '../utils/tarih'
import type { Gorev, GorevGirdisi } from '../interfaces/Gorev'

const ANAHTAR = 'odak.gorevler'

function gunSonra(gun: number): string {
  const d = new Date()
  d.setDate(d.getDate() + gun)
  return yerelTarih(d)
}

// İlk açılışta boş bir ekran yerine örnek görevler göster
function ornekGorevler(): Gorev[] {
  const simdi = new Date().toISOString()
  const ornek: [string, string, Gorev['oncelik'], number, boolean][] = [
    ['Türev konu tekrarı ve 20 soru', 'Matematik', 'yuksek', 1, false],
    ['Hücre bölünmesi özet çıkar', 'Biyoloji', 'orta', 3, false],
    ['Paragraf testi (40 soru)', 'Türkçe', 'orta', -1, true],
    ['Newton yasaları deneme sınavı', 'Fizik', 'yuksek', 5, false],
    ['İngilizce kelime listesi 3. ünite', 'İngilizce', 'dusuk', 7, false],
  ]
  return ornek.map(([baslik, ders, oncelik, gun, tamamlandi], i) => ({
    id: `ornek-${i}`, baslik, ders, oncelik, sonTarih: gunSonra(gun), tamamlandi, olusturulma: simdi,
  }))
}

function oku(): Gorev[] {
  try {
    const ham = localStorage.getItem(ANAHTAR)
    return ham ? (JSON.parse(ham) as Gorev[]) : ornekGorevler()
  } catch {
    return ornekGorevler()
  }
}

/** Görevlerin tüm CRUD işlemleri; veriler LocalStorage'da saklanır. */
export function useGorevler() {
  const [gorevler, setGorevler] = useState<Gorev[]>(oku)

  useEffect(() => {
    try {
      localStorage.setItem(ANAHTAR, JSON.stringify(gorevler))
    } catch {
      /* gizli sekmede depolama kapalı olabilir; uygulama yine çalışır */
    }
  }, [gorevler])

  const ekle = (girdi: GorevGirdisi) =>
    setGorevler((liste) => [
      { ...girdi, id: crypto.randomUUID(), tamamlandi: false, olusturulma: new Date().toISOString() },
      ...liste,
    ])

  const guncelle = (id: string, degisiklik: Partial<Gorev>) =>
    setGorevler((liste) => liste.map((g) => (g.id === id ? { ...g, ...degisiklik } : g)))

  const sil = (id: string) => setGorevler((liste) => liste.filter((g) => g.id !== id))

  return { gorevler, ekle, guncelle, sil }
}
