import coverPlaceholderModal from '../assets/img/png/cover-placeholder-M.png';
import coverPlaceholderCard from '../assets/img/png/cover-placeholder-S.png';
import { extractDescription, formatAuthors, generatePageNumber } from './utils.js';

//Funzioni per renderizzare la lista libri nel DOM
//Render di header e griglia separati per supportare la paginazione

//Si chiama una volta per ricerca
function renderHeader(category, workCount) {
  const resultsHeader = document.createElement('results-header');
  const resultsText = document.createElement('p');
  resultsText.classList.add('body-large');
  resultsText.textContent = `Risultati per ${category}:`;
  const title = resultsHeader.appendChild(resultsText);
  const badge = document.createElement('span');
  badge.classList.add('label-tag')
  badge.textContent = `${workCount} libri`;
  title.appendChild(badge);
  document.getElementById('results').appendChild(resultsHeader);
}

//Si richiama ad ogni cambio pagina
function renderBooks(works) {
  document.querySelector('.books-grid')?.remove();
  const booksGrid = document.createElement('div');
  booksGrid.classList.add('books-grid');
  const bookCards = works.map(work => createBookCard(work));
  bookCards.forEach(card => booksGrid.appendChild(card));
  document.getElementById('results').appendChild(booksGrid);
}

//Pagine risultati
function renderPagination(currentPage, totalPages) {
  document.querySelector('.pagination')?.remove();
  const pageNumbers = generatePageNumber(currentPage, totalPages);
  const pagesNavigation = document.createElement('nav');
  pagesNavigation.classList.add('pagination');
  const prevArrowButton = document.createElement('button');
  prevArrowButton.classList.add('page-arrow', 'page-btn');
  prevArrowButton.textContent = '‹';
  prevArrowButton.dataset.page = currentPage - 1;
  if (currentPage === 1) {
    prevArrowButton.disabled = true;
  }
  pagesNavigation.appendChild(prevArrowButton);
  pageNumbers.forEach(arrayElement => {
    if(typeof(arrayElement) === 'number'){
    const navButton = document.createElement('button');
    navButton.classList.add('page-btn');
    navButton.textContent = arrayElement;
    navButton.dataset.page = arrayElement;
    if(arrayElement === currentPage) {
      navButton.classList.add('active');
      navButton.disabled = true;
    }
    pagesNavigation.appendChild(navButton);
    } else if(arrayElement === '...') {
      const threeDots = document.createElement('span');
      threeDots.textContent = arrayElement;
      pagesNavigation.appendChild(threeDots);
    }
  })
  const nextArrowButton = document.createElement('button');
  nextArrowButton.classList.add('page-arrow', 'page-btn');
  nextArrowButton.textContent = '›';
  nextArrowButton.dataset.page = currentPage + 1;
  if (currentPage === totalPages) {
    nextArrowButton.disabled = true;
  }
  pagesNavigation.appendChild(nextArrowButton);
  document.getElementById('results').appendChild(pagesNavigation);
}

//createBookCard(work): cover con fallback, titolo, autore/i, 'vedi dettagli' btn - formatAuthors da utils e vedi dettagli salva libro in appState.selectedBook
function createBookCard(work) {
  const card = document.createElement('div');
  card.classList.add('book-card');
  //Cover Image
  const bookCover = document.createElement('img');
  if (work.cover_id && work.cover_id !== null && work.cover_id !== undefined) {
    bookCover.src = `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`;
  } else {
    bookCover.src = `${coverPlaceholderCard}`;
  }
  bookCover.setAttribute('onerror', `this.src= '${coverPlaceholderCard}'`);

  //Info Container
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('card-info');
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = work.title;
  const authorsNames = document.createElement('h4');
  authorsNames.textContent = formatAuthors(work.authors);
  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'Vedi dettagli';
  detailsButton.classList.add('show-details', 'button-secondary');
  detailsButton.dataset.key = work.key;
  const bookInfo = document.createElement('div');
  bookInfo.classList.add('book-info');
  infoContainer.append(bookTitle, authorsNames);
  bookInfo.append(bookCover, infoContainer);
  card.append(bookInfo, detailsButton);
  return card;
}

//Funzione per mostrare il modale con i dettagli e overlay
function showModal(selectedBook, description) {
  //Overlay
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  overlay.addEventListener('click', (e) => {
    if(e.target === overlay){closeModal();}
  });

  //Modal
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal');

  //Modal Header
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const bookCover = document.createElement('img');
  if (selectedBook.cover_id && selectedBook.cover_id !== null && selectedBook.cover_id !== undefined) {
    bookCover.src = `https://covers.openlibrary.org/b/id/${selectedBook.cover_id}-M.jpg`;
  } else {
    bookCover.src = `${coverPlaceholderModal}`;
  }
  bookCover.setAttribute('onerror', `this.src= '${coverPlaceholderModal}'`);
  const modalText = document.createElement('div');
  modalText.classList.add('modal-text');
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = selectedBook.title;
  const modalMeta = document.createElement('div');
  modalMeta.classList.add('modal-meta');
  const authorsNames = document.createElement('p');
  authorsNames.textContent = formatAuthors(selectedBook.authors);
  const separator = document.createElement('span');
  separator.textContent = '·';
  const publishYear = document.createElement('p');
  publishYear.textContent = selectedBook.first_publish_year;
  modalMeta.append(authorsNames, separator, publishYear);
  modalText.append(bookTitle, modalMeta);
  modalContent.appendChild(bookCover);

  //Modal Body
  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  const descriptionTitle = document.createElement('h3');
  descriptionTitle.textContent = 'DESCRIZIONE';
  const bookDescription = document.createElement('p');
  bookDescription.textContent = extractDescription(description);
  modalBody.append(descriptionTitle, bookDescription);
  modalText.appendChild(modalBody);
  modalContent.appendChild(modalText);
  modalContainer.appendChild(modalContent);

  //Modal Footer
  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');
  const openLibraryButton = document.createElement('button');
  openLibraryButton.textContent = 'Apri in Open Library';
  openLibraryButton.addEventListener('click', () => window.open(`https://openlibrary.org${selectedBook.key}`, '_blank'));
  openLibraryButton.classList.add('button-primary');
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Chiudi';
  closeButton.addEventListener('click', closeModal);
  closeButton.classList.add('button-secondary');
  modalFooter.append(closeButton, openLibraryButton);
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
const loaderText = document.createElement('span');
loaderText.classList.add('loader-text');
loaderText.textContent = 'Caricamento...';
loader.appendChild(loaderText);
document.getElementById('results').appendChild(loader);
}

function hideLoader() {
const loader = document.querySelector('.loader')
if(loader) loader.remove();
}

function showError(message) {
  document.getElementById('results').innerHTML = '';
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  document.getElementById('results').appendChild(errorMessage);
}

function showEmptyState() {
  document.getElementById('results').innerHTML = '';
  const emptyState = document.createElement('p');
  emptyState.classList.add('empty-state');
  emptyState.textContent = 'Nessun risultato';
  document.getElementById('results').appendChild(emptyState);
}

export { closeModal, hideLoader, renderBooks, renderHeader, renderPagination, showEmptyState, showError, showLoader, showModal };
