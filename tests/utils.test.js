import { describe, it, expect } from 'vitest'
import { formatAuthors } from '../src/js/utils.js'

describe('formatAuthors', () => {

  it('restituisce i nomi degli autori separati da virgola', () => {
    const input = [{ name: 'J.R.R. Tolkien' }, { name: 'C.S. Lewis' }]
    expect(formatAuthors(input)).toBe('J.R.R. Tolkien, C.S. Lewis')
  })

  it('restituisce "No authors found" se la lista è vuota', () => {
    expect(formatAuthors([])).toBe('No authors found')
  })

})