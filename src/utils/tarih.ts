/** Yerel saate göre YYYY-MM-DD (toISOString UTC verir; Türkiye'de gece yarısından sonra bir gün geride kalır). */
export function yerelTarih(d: Date = new Date()): string {
  const ay = String(d.getMonth() + 1).padStart(2, '0')
  const gun = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${ay}-${gun}`
}
