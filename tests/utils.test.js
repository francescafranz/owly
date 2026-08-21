import { describe, it, expect } from 'vitest'
import { formatAuthors, extractDescription } from '../src/js/utils.js'

describe('formatAuthors', () => {

  it('restituisce i nomi degli autori separati da virgola', () => {
    const input = [{ name: 'J.R.R. Tolkien' }, { name: 'C.S. Lewis' }]
    expect(formatAuthors(input)).toBe('J.R.R. Tolkien, C.S. Lewis')
  })

  it('restituisce "Nessun autore trovato" se la lista è vuota', () => {
    expect(formatAuthors([])).toBe('Nessun autore trovato')
  })
  it('restituisce "Nessun autore trovato" se null', () => {
    expect(formatAuthors(null)).toBe('Nessun autore trovato')
  })
  it('restituisce "Nessun autore trovato" se undefined', () => {
    expect(formatAuthors(undefined)).toBe('Nessun autore trovato')
  })

})

describe('extractDescription', () => {
  it('restituisce il valore se è un oggetto {value: "..."}', () => {
    expect(extractDescription({value: 'Una descrizione'})).toBe('Una descrizione')
  })
  it('restituisce la stringa se è una stringa', () => {
    expect(extractDescription('Una descrizione')).toBe('Una descrizione')
  })
  it('restituisce "Nessuna descrizione disponibile" se null', () => {
    expect(extractDescription(null)).toBe('Nessuna descrizione disponibile')
  })
})