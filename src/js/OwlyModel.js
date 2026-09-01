import axios from 'axios';
//books per page
const limit = 10;

//API for searching books by category
async function searchByCategory (category, offset) {
  const urlOpenLibraryCategory = `https://openlibrary.org/subjects/${category}.json?limit=${limit}&offset=${offset}`;
  let bookList;
  try { 
    bookList = await axios.get(urlOpenLibraryCategory);
  } catch (error) {
    throw error;
  }

  return {
    works: bookList.data.works, 
    workCount: bookList.data.work_count
  };
}

//API for book details
async function bookDetails (key) {
  const urlOpenLibraryBookKey = `https://openlibrary.org${key}.json`;
  let bookDetailsResponse;
  try {
    bookDetailsResponse = await axios.get(urlOpenLibraryBookKey);
  } catch (error) {
    throw error;
  }

  return {
    workTitle: bookDetailsResponse.data.title,
    workDescription: bookDetailsResponse.data.description,
    linkOL: `https://openlibrary.org${key}`
  }
}

export {searchByCategory, bookDetails, limit};