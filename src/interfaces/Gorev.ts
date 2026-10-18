export type Oncelik = 'dusuk' | 'orta' | 'yuksek'

export interface Gorev {
  id: string
  baslik: string
  ders: string
  oncelik: Oncelik
  sonTarih: string // YYYY-MM-DD
  tamamlandi: boolean
  olusturulma: string // ISO tarih
}

/** Formdan gelen, henüz kimliği olmayan görev bilgisi */
export type GorevGirdisi = Pick<Gorev, 'baslik' | 'ders' | 'oncelik' | 'sonTarih'>

export type DurumFiltresi = 'tumu' | 'aktif' | 'tamamlanan'

export const ONCELIK_ETIKETI: Record<Oncelik, string> = {
  dusuk: 'Düşük',
  orta: 'Orta',
  yuksek: 'Yüksek',
}
