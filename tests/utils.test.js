import { describe, it, expect } from 'vitest'
import { formatAuthors, extractDescription, generatePageNumber } from '../src/js/utils.js'

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

describe('generatePageNumbers', () => {
  //totalPages <= 7
  it('restituisce [1, 2, 3] se siamo a pagina 2 e ci sono solo tre pagine', () => {
    expect(generatePageNumber(2, 3)).toStrictEqual([1, 2, 3])
  })
  it(`restituisce [1] se c'è solo una pagina`, () => {
    expect(generatePageNumber(1, 1)).toStrictEqual([1])
  })

  //totalPages > 7
  it(`restituisce [1, 2, '...', 10] se siamo a pagina 1 e ci sono 10 pagine`, () => {
    expect(generatePageNumber(1, 10)).toStrictEqual([1, 2, '...', 10])
  })
  it(`restituisce [1, '...', 4, 5, 6, '...', 10] se siamo a pagina 5 e ci sono 10 pagine`, () => {
    expect(generatePageNumber(5, 10)).toStrictEqual([1, '...', 4, 5, 6, '...', 10])
  })
  it(`restituisce [1, '...', 9, 10] se siamo a pagina 10 e ci sono 10 pagine`, () => {
    expect(generatePageNumber(10, 10)).toStrictEqual([1, '...', 9, 10])
  })
  it(`restituisce [1, 2, '...', 53] se siamo a pagina 1 e ci sono 53 pagine`, () => {
    expect(generatePageNumber(1, 53)).toStrictEqual([1, 2, '...', 53])
  })
  it(`restituisce [1, '...', 26, 27, 28, '...', 53] se siamo a pagina 27 e ci sono 53 pagine`, () => {
    expect(generatePageNumber(27, 53)).toStrictEqual([1, '...', 26, 27, 28, '...', 53])
  })
  it(`restituisce [1, '...', 52, 53] se siamo a pagina 53 e ci sono 53 pagine`, () => {
    expect(generatePageNumber(53, 53)).toStrictEqual([1, '...', 52, 53])
  })
})