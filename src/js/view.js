// view: manages DOM rendering and UI components

import coverPlaceholderModal from '../assets/img/png/cover-placeholder-M.png';
import coverPlaceholderCard from '../assets/img/png/cover-placeholder-S.png';
import { extractDescription, formatAuthors, generatePageNumber } from './utils.js';

let lastFocusedElement = null;

// renderHeader is being called once per search
function renderHeader(category, workCount) {
  const resultsHeader = document.createElement('section');

  const resultsText = document.createElement('p');
  resultsText.classList.add('body-large');
  resultsText.textContent = `Risultati per ${category}:`;

  const badge = document.createElement('span');
  badge.classList.add('label-tag')
  badge.textContent = `${workCount} libri`;

  resultsText.appendChild(badge);
  resultsHeader.appendChild(resultsText);
  document.getElementById('results').appendChild(resultsHeader);
}

// renderBooks is being called at every page-change
function renderBooks(works) {
  document.querySelector('.books-grid')?.remove();

  const booksGrid = document.createElement('div');
  booksGrid.classList.add('books-grid');

  const bookCards = works.map(work => createBookCard(work));

  bookCards.forEach(card => booksGrid.appendChild(card));
  document.getElementById('results').appendChild(booksGrid);
}

// results pages pagination rendering
function renderPagination(currentPage, totalPages) {
  document.querySelector('.pagination')?.remove();

  // navigation
  const pagesNavigation = document.createElement('nav');
  pagesNavigation.classList.add('pagination');
  pagesNavigation.setAttribute('aria-label', 'Paginazione risultati');
  
  // left arrow button
  const prevArrowButton = document.createElement('button');
  prevArrowButton.classList.add('page-arrow', 'page-btn');
  prevArrowButton.textContent = '‹';
  prevArrowButton.setAttribute('aria-label', 'Pagina precedente');
  prevArrowButton.dataset.page = currentPage - 1;
  if (currentPage === 1) {
    prevArrowButton.disabled = true;
  }
  pagesNavigation.appendChild(prevArrowButton);
  
  // page numbers
  const pageNumbers = generatePageNumber(currentPage, totalPages);
  pageNumbers.forEach(arrayElement => {
    if(typeof(arrayElement) === 'number'){
      const navButton = document.createElement('button');
      navButton.classList.add('page-btn');
      navButton.textContent = arrayElement;
      navButton.dataset.page = arrayElement;

      if(arrayElement === currentPage) {
        navButton.classList.add('active');
        navButton.disabled = true;
        navButton.setAttribute('aria-current', 'page');
      }

      pagesNavigation.appendChild(navButton);
    } else if(arrayElement === '...') {
      const threeDots = document.createElement('span');
      threeDots.textContent = arrayElement;
      pagesNavigation.appendChild(threeDots);
    }
  })

  // right arrow button
  const nextArrowButton = document.createElement('button');
  nextArrowButton.classList.add('page-arrow', 'page-btn');
  nextArrowButton.textContent = '›';
  nextArrowButton.setAttribute('aria-label', 'Pagina successiva');
  nextArrowButton.dataset.page = currentPage + 1;
  if (currentPage === totalPages) {
    nextArrowButton.disabled = true;
  }
  pagesNavigation.appendChild(nextArrowButton);

  document.getElementById('results').appendChild(pagesNavigation);
}

// book card rendering
function createBookCard(work) {
  const card = document.createElement('div');
  card.classList.add('book-card');

  // cover image
  const bookCover = document.createElement('img');
  if (work.cover_id && work.cover_id !== null && work.cover_id !== undefined) {
    bookCover.src = `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`;
  } else {
    bookCover.src = `${coverPlaceholderCard}`;
  }
  bookCover.addEventListener('error', () => {bookCover.src = coverPlaceholderCard;});
  bookCover.alt = work.title ? `Copertina di ${work.title}` : `Copertina non disponibile`;

  // info container
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('card-info');

  // book title
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = work.title;

  // author(s) names
  const authorsNames = document.createElement('p');
  authorsNames.classList.add('author-names')
  authorsNames.textContent = formatAuthors(work.authors);

  // details button
  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'Vedi dettagli';
  detailsButton.classList.add('show-details', 'button-secondary');
  detailsButton.dataset.key = work.key;

  //book information container
  const bookInfo = document.createElement('div');
  bookInfo.classList.add('book-info');

  infoContainer.append(bookTitle, authorsNames);
  bookInfo.append(bookCover, infoContainer);
  card.append(bookInfo, detailsButton);

  return card;
}

// book modal rendering
function showModal(selectedBook, description) {
  lastFocusedElement = document.activeElement;

  //overlay
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');

  overlay.addEventListener('click', (e) => {
    if(e.target === overlay){
      closeModal();
    }
  });

  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  })

  // modal container
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal');
  modalContainer.setAttribute('role', 'dialog');
  modalContainer.setAttribute('aria-modal', 'true');
  modalContainer.setAttribute('tabindex', '-1');

  // modal header
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const bookCover = document.createElement('img');
  if (selectedBook.cover_id && 
    selectedBook.cover_id !== null && 
    selectedBook.cover_id !== undefined) {
    bookCover.src = `https://covers.openlibrary.org/b/id/${selectedBook.cover_id}-M.jpg`;
  } else {
    bookCover.src = `${coverPlaceholderModal}`;
  }

  // visual fallback handling
  bookCover.addEventListener('error', () => {
    bookCover.src = coverPlaceholderModal;
  });

  bookCover.alt = selectedBook.title ? 
    `Copertina di ${selectedBook.title}` : 
    `Copertina non disponibile`;
  
  const modalText = document.createElement('div');
  modalText.classList.add('modal-text');

  const bookTitle = document.createElement('h2');
  bookTitle.setAttribute('id', 'modal-title');
  bookTitle.textContent = selectedBook.title;

  modalContainer.setAttribute('aria-labelledby', 'modal-title');

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

  // modal body
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

  // modal footer
  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');

  const openLibraryButton = document.createElement('button');
  openLibraryButton.textContent = 'Apri in Open Library';
  openLibraryButton.classList.add('button-primary', 'openlibrary-button');
  openLibraryButton.dataset.key = selectedBook.key;

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Chiudi';
  closeButton.addEventListener('click', closeModal);
  closeButton.classList.add('button-secondary');

  modalFooter.append(closeButton, openLibraryButton);
  modalContainer.appendChild(modalFooter);
  overlay.appendChild(modalContainer);
  document.body.appendChild(overlay);

  modalContainer.focus();
}

// remove overlay and close modal
function closeModal() {
 const overlay = document.querySelector('.modal-overlay');
 if(overlay) overlay.remove();
 if(lastFocusedElement) lastFocusedElement.focus();
}

// loader functions
function showLoader () {
  document.getElementById('results').innerHTML = '';

  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.setAttribute('role', 'status');

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

// error message
function showError(message) {
  document.getElementById('results').innerHTML = '';

  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.setAttribute('role', 'alert');
  errorMessage.textContent = message;

  document.getElementById('results').appendChild(errorMessage);
}

// empty state
function showEmptyState() {
  document.getElementById('results').innerHTML = '';

  const emptyState = document.createElement('p');
  emptyState.classList.add('empty-state');
  emptyState.textContent = 'Nessun risultato';
  
  document.getElementById('results').appendChild(emptyState);
}

export { closeModal, hideLoader, renderBooks, renderHeader, renderPagination, showEmptyState, showError, showLoader, showModal };
