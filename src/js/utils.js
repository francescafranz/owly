// utils - pure utility functions for data formatting and transformation


export function formatAuthors(authors) { 
  
  if (!authors || authors.length === 0) {
    return 'Nessun autore trovato';
  } else {
    const authorsNames = authors.map(author => author.name).join(', ');
    return authorsNames;
  }

}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

export function extractDescription(description) { 
 if (!description) {
  return 'Nessuna descrizione disponibile';
 } else if (typeof(description) === 'object') {
  return stripHtml(description.value);
 } else {
  return stripHtml(description);
 }
}

export function generatePageNumber(currentPage, totalPages) {
  const pageNumbers = [];
  if (totalPages <= 7) {
    for (let i = 1; i<= totalPages; i++){
      pageNumbers.push(i);
    }
    return pageNumbers;
  } else {
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
