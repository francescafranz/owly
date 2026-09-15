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

document.body.addEventListener('click',(e) => {
  if(e.target.classList.contains('openlibrary-button')){
    window.open(`https://openlibrary.org${e.target.dataset.key}`, '_blank');
  }
})

}

//render results
function renderResults(){
const currentPage = appState.loadedNumber / limit + 1;
const totalPages = Math.ceil(appState.worksCount / limit); 
renderBooks(appState.books); 
renderPagination(currentPage, totalPages);
}

//form submit management
async function handleSearch() {
const inputValue = document.getElementById('subject-input').value.trim().toLowerCase();
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
  renderResults();
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
  const pageResults = await searchByCategory(appState.currentCategory, appState.loadedNumber);
  appState.books = pageResults.works;
  appState.worksCount = pageResults.workCount;
  renderResults();
  document.querySelector('#results')?.firstElementChild?.scrollIntoView({behavior: 'smooth', block:'start'});
  } catch (error) {
    showError('Ops! Qualcosa è andato storto!');
  }
}

export {init};