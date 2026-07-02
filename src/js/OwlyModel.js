import axios from 'axios';

const limit = 10;

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

async function bookDetails (key) {
  const urlOpenLibraryBookKey = `https://openlibrary.org/${key}.json`;
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

export {searchByCategory, bookDetails};