//funzioni di utilità — funzioni pure, facili da testare


export function formatAuthors(authors) { 
  
  if (!authors) {
    return 'Error in searching for the authors'
  } else if (authors.length === 0) {
    return 'No authors found';
  } else {
    const authorsNames = authors.map(author => author.name).join(',');
    return authorsNames;
  }

}

export function extractDescription(description) { 
 if (!description) {
  return 'No description available';
 } else if (typeof(description) === 'object') {
  return description.value;
 } else {
  return description;
 }
}


