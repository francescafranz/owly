// salvare titolo, autori, cover_id e key in appState.selectedBook quando utente clicca su una determinata card
import { appState } from './AppState.js';
import {searchByCategory, bookDetails, limit} from './OwlyModel.js';
import {renderHeader, renderBooks, renderPagination, showModal, showLoader, hideLoader, showError, showEmptyState} from './OwlyView.js';

//listener initialization
function init() {
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (e) => {e.preventDefault(); handleSearch(); });
const results = document.getElementById('results');
results.addEventListener('click', (e) => {
  if (e.target.classList.contains('show-details')){
    handleBookDetails(e.target.dataset.key);
  } else if (e.target.classList.contains('page-btn')) {
    handlePageClick(e.target.dataset.page);
  }
})
}

//form submit management
async function handleSearch() {
const inputValue = document.getElementById('subject-input').value;
if (!inputValue) {
  showError('Inserisci una categoria');
  return;
}
appState.currentCategory = inputValue;
appState.loadedNumber = 0;
showLoader();
try {
const result = await searchByCategory(appState.currentCategory, appState.loadedNumber);
appState.books = result.works;
appState.worksCount = result.workCount;
if (!result.works || result.works.length === 0){
  showEmptyState();
} else {
  renderHeader(appState.currentCategory, appState.worksCount);
  renderBooks(appState.books);
} } catch (error) {
  showError('Ops! Qualcosa è andato storto!');
} finally {
  hideLoader(); 
}
}

//card click management
async function handleBookDetails(key) {
  appState.selectedBook = appState.books.find(book => book.key === key);
  try {
    const details = await bookDetails(key);
    showModal(appState.selectedBook, details.workDescription);
  } catch (error) {
    showError('Ops! Qualcosa è andato storto!');
  } 
  }

//page navigation click management
async function handlePageClick(pageNumber) {
  const newOffset = (parseInt(pageNumber) - 1) * limit;
  appState.loadedNumber = newOffset;
  try {
  const results = await searchByCategory(appState.currentCategory, appState.loadedNumber);
  appState.books = results.works;
  appState.worksCount = results.workCount;
  const currentPage = appState.loadedNumber / limit + 1;
  const totalPages = Math.ceil(appState.worksCount / limit);
  renderBooks(appState.books);
  renderPagination(currentPage, totalPages);
  } catch (error) {
    showError('Ops! Qualcosa è andato storto!');
  }
}

export {init};