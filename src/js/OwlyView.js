import { formatAuthors, extractDescription } from './utils.js';
import coverPlaceholder from '../assets/img/cover_placeholder.png';

//Funzioni per renderizzare la lista libri nel DOM
//funzione renderBooks(works, category, workCount): 'Risultati per categoria', badge conteggio, griglia card nel #results
function renderBooks(works, category, workCount) {
 const resultsHeader = document.createElement('header');
 let h2 = document.createElement('h2');
 h2.textContent = `Risultati per ${category}`;
 const titolo = resultsHeader.appendChild(h2);
 let span = document.createElement('span')
 span.textContent = `${workCount} libri trovati`;
 const badge = titolo.appendChild(span);
 const booksGrid = document.createElement('div');
 booksGrid.classList.add('books-grid');
 const bookCards = works.map(work => createBookCard(work));
 bookCards.forEach(card => booksGrid.appendChild(card));
 document.getElementById('results').appendChild(resultsHeader);
 document.getElementById('results').appendChild(booksGrid);
}

//createBookCard(work): cover con fallback, titolo, autore/i, 'vedi dettagli' btn - formatAuthors da utils e vedi dettagli salva libro in appState.selectedBook
function createBookCard(work) {
  const card = document.createElement('div');

  //Cover Image
  const bookCover = document.createElement('img');
  if (work.cover_id && work.cover_id !== null && work.cover_id !== undefined) {
    bookCover.src = `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`;
  } else {
    bookCover.src = `${coverPlaceholder}`;
  }
  bookCover.setAttribute('onerror', `this.src= '${coverPlaceholder}'`);

  //Info Container
  const infoContainer = document.createElement('div');
  const bookTitle = document.createElement('h3');
  bookTitle.textContent = work.title;
  const authorsNames = document.createElement('p');
  authorsNames.textContent = formatAuthors(work.authors);
  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'Vedi dettagli';
  detailsButton.addEventListener('click', () => showModal(work));
  infoContainer.append(bookTitle, authorsNames, detailsButton);
  card.append(bookCover, infoContainer);
  return card;
}

//Funzione per mostrare il modale con i dettagli e overlay
function showModal(selectedBook, description) {
  //Overlay
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  overlay.addEventListener('click', closeModal);

  //Modal
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal');

  //Modal Header
  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');
  const bookCover = document.createElement('img');
  if (selectedBook.cover_id && selectedBook.cover_id !== null && selectedBook.cover_id !== undefined) {
    bookCover.src = `https://covers.openlibrary.org/b/id/${selectedBook.cover_id}-M.jpg`;
  } else {
    bookCover.src = `${coverPlaceholder}`;
  }
  bookCover.setAttribute('onerror', `this.src= '${coverPlaceholder}'`);
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = selectedBook.title;
  const authorsNames = document.createElement('p');
  authorsNames.textContent = formatAuthors(selectedBook.authors);
  const publishYear = document.createElement('p');
  publishYear.textContent = selectedBook.first_publish_year;
  modalHeader.append(bookCover, bookTitle, authorsNames, publishYear);
  modalContainer.appendChild(modalHeader);

  //Modal Body
  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  const descriptionTitle = document.createElement('h4');
  descriptionTitle.textContent = 'DESCRIZIONE';
  const bookDescription = document.createElement('p');
  bookDescription.textContent = extractDescription(description);
  modalBody.append(descriptionTitle, bookDescription);
  modalContainer.appendChild(modalBody);

  //Modal Footer
  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');
  const openLibraryButton = document.createElement('button');
  openLibraryButton.textContent = 'Apri in Open Library';
  openLibraryButton.addEventListener('click', () => window.open(`https://openlibrary.org${selectedBook.key}`, '_blank'));
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Chiudi';
  closeButton.addEventListener('click', closeModal);
  modalFooter.append(openLibraryButton, closeButton);
  modalContainer.appendChild(modalFooter);

  overlay.appendChild(modalContainer);
  document.body.appendChild(overlay);
}

//closeModal(): rimuove overlay e chiude il modale
function closeModal() {
 const overlay = document.querySelector('.modal-overlay');
 if(overlay) overlay.remove();
}

//Funzioni per loader, errore e stato vuoto

function showLoader () {
document.getElementById('results').innerHTML = '';
const loader = document.createElement('div');
loader.classList.add('loader');
loader.textContent = 'Caricamento...';
document.getElementById('results').appendChild(loader);
}

function hideLoader() {
const loader = document.querySelector('.loader')
if(loader) loader.remove();
}

function showError(message) {
  document.getElementById('results').innerHTML = '';
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  document.getElementById('results').appendChild(errorMessage);
}

function showEmptyState() {
  document.getElementById('results').innerHTML = '';
  const emptyState = document.createElement('p');
  emptyState.textContent = 'Nessun risultato';
  document.getElementById('results').appendChild(emptyState);
}

export {renderBooks, showModal, closeModal, showLoader, hideLoader, showError, showEmptyState};