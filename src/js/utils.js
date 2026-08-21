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


