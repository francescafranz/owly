// salvare titolo, autori, cover_id e key in appState.selectedBook quando utente clicca su una determinata card
import { appState } from './AppState.js';
import {searchByCategory, bookDetails} from './OwlyModel.js';
import {renderHeader, renderBooks, showModal, showLoader, hideLoader, showError, showEmptyState} from './OwlyView.js';

//listener initialization
function init() {
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (e) => {e.preventDefault(); handleSearch(); });
const results = document.getElementById('results');
results.addEventListener('click', (e) => {
  if (e.target.classList.contains('show-details')){
    handleBookDetails(e.target.dataset.key);
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

export {init};