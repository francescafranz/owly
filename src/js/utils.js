//funzioni di utilità — funzioni pure, facili da testare


export function formatAuthors(authors) { 
  
  if (!authors || authors.length === 0) {
    return 'Nessun autore trovato';
  } else {
    const authorsNames = authors.map(author => author.name).join(', ');
    return authorsNames;
  }

}

export function extractDescription(description) { 
 if (!description) {
  return 'Nessuna descrizione disponibile';
 } else if (typeof(description) === 'object') {
  return description.value;
 } else {
  return description;
 }
}

export function generatePageNumber(currentPage, totalPages) {
  let pageNumbers = [];
  if (totalPages <= 7) {
    for (let i = 1; i<= totalPages; i++){
      pageNumbers.push(i);
    }
    return pageNumbers;
  } else if (totalPages > 7) {
    pageNumbers.push(1);
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    const start = Math.max(currentPage - 1, 2);
    const end= Math.min(currentPage + 1, totalPages - 1);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    pageNumbers.push(totalPages);
    return pageNumbers;
  }
}
