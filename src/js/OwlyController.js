// salvare titolo, autori, cover_id e key in appState.selectedBook quando utente clicca su una determinata card
import { appState } from './AppState.js';
import {searchByCategory, bookDetails} from './OwlyModel.js';
import {renderBooks, showModal, closeModal, showLoader, hideLoader, showError, showEmptyState} from './OwlyView.js';

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
//read value from input in #subject-input
const inputValue = document.getElementById('subject-input').value;
//IF value is empty showError with message and stop
if (!inputValue) {
  showError('Inserisci una categoria');
  return;
}
//update appState.currentCategory with input value
appState.currentCategory = inputValue;
//reset appState.loadedNumber to 0
appState.loadedNumber = 0;
//show loader
showLoader();
//call searchByCategory(category, offset) from model
try {
const result = await searchByCategory(appState.currentCategory, appState.loadedNumber);
//update appState.books and appState.worksCount
appState.books = result.works;
appState.worksCount = result.workCount;
//IF works is empty showEmptyState ELSE renderBooks
if (!result.works || result.works.length === 0){
  showEmptyState();
} else {
  renderBooks(appState.books, appState.currentCategory, appState.worksCount);
} } catch (error) {
  showError('Ops! Qualcosa è andato storto!');
} finally {
  //hide loader
  hideLoader(); 
}
}

//card click management
async function handleBookDetails(key) {
  //save the selected book in appState.selectedBook
  appState.selectedBook = appState.books.find(book => book.key === key);
  //in appState.books I have title, authors, cover id and key
  //show loader
  showLoader();
  try {
    //call bookDetails(key)
    const details = await bookDetails(key);
    //receive workTitle, workDecription and linkOL
    showModal(appState.selectedBook, details.workDescription);
  } catch (error) {
    showError('Ops! Qualcosa è andato storto!');
  } finally {
    //hide loader
    hideLoader();
  }
  //call showModal with book data
  //if error: showError
}

export {init};