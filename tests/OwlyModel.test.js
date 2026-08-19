import { describe, it, expect, vi } from 'vitest'
vi.mock('axios');
import axios from 'axios';
import { searchByCategory, bookDetails } from '../src/js/OwlyModel.js'


describe('searchByCategory', () => { it('restituisce un oggetto che contiene i titoli dei libri ed il numero di libri trovati', async () => {
  axios.get.mockResolvedValue({ data: { works: [{ title: "Libro1"}, {title: "Libro2"}], work_count: 2}})
  expect(await searchByCategory('thriller', 0)).toStrictEqual({works: [{title:"Libro1"}, {title:"Libro2"}], workCount: 2})
})})

describe('bookDetails', () => { it('restituisce un oggetto che contiene titolo, descrizione e link al libro selezionato', async () => {
  axios.get.mockResolvedValue({ data: { title: "Libro1", description: "Descrizione del libro"}})
  expect(await bookDetails('/works/12345')).toStrictEqual({ workTitle: "Libro1", workDescription: "Descrizione del libro", linkOL: 'https://openlibrary.org/works/12345'})
})})