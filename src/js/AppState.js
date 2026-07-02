class AppState {
  #books = [];
  #currentCategory = '';
  #loadedNumber = 0;
  #worksCount = 0;
  #selectedBook = null;
  #isLoading = false;

  constructor() {}

  //#books
  get books() {
    return JSON.parse(JSON.stringify(this.#books));
  }

  set books(books) {
    if (!Array.isArray(books)) {
      throw new Error('books must be an array');
    } else {
      this.#books = JSON.parse(JSON.stringify(books));
    }
  }
  
  //#currentCategory
  get currentCategory() {
    return this.#currentCategory;
  }

  set currentCategory(currentCategory) {
    if (typeof currentCategory !== 'string') {
      throw new Error('currentCategory must be a string');
    } else {
      this.#currentCategory = currentCategory;
      }
  }

  //#loadedNumber
  get loadedNumber() {
    return this.#loadedNumber;
  }

  set loadedNumber(loadedNumber) {
    if (typeof loadedNumber !== 'number') {
      throw new Error('loadedNumber must be a number');
    } else {
      this.#loadedNumber = loadedNumber;
      }
  }

  //#worksCount
  get worksCount() {
    return this.#worksCount;
  }

  set worksCount(worksCount) {
    if (typeof worksCount !== 'number') {
      throw new Error('worksCount must be a number');
    } else {
      this.#worksCount = worksCount;
      }
  }


  //#selectedBook
  get selectedBook() {
    if (this.#selectedBook === null) {
      return null;
    } else {
      return JSON.parse(JSON.stringify(this.#selectedBook));
    }
  }

  set selectedBook(selectedBook) {
    if (selectedBook === null) {
      this.#selectedBook = null;
    } else if (typeof selectedBook !== 'object') {
      throw new Error('selectedBook must be an object')
    } else {
      this.#selectedBook = JSON.parse(JSON.stringify(selectedBook));
    }
  }


  //#isLoading
  get isLoading() {
    return this.#isLoading;
  }

  set isLoading(isLoading) {
  if (typeof isLoading !== 'boolean') {
      throw new Error('isLoading must be a boolean')
    } else {
      this.#isLoading = isLoading;
      }
  }

} 
  
const appState = new AppState();
export { appState };

/*
In altri file
```
import { appState } from './AppState';

appState.books = [{ title: 'Book 1' }, { title: 'Book 2' }];
``à
*/
