# Owly Books
A book search app built with Vanilla JS, Vite and Open Library API.
Developed as a JS study project for start2impact (https://www.start2impact.it).

Owly is an accessible educational platform that supports both teachers and students - this project focuses on incentivizing reading by integrating the Open Library service via the Owly Book web app.

[Try Owly Books Live](https://owly-books-webapp.netlify.app)


## Features

- Search books by category with Open Library API
- Books result list with title and authors
- Book details modal with book description
- Pagination for browsing results
- Responsive design
- Accessible interface (ARIA labels, focus management, screen reader support)
- Loading spinner, error messages and empty state feedback


## Built with

- **JavaScript**(ES6+) - Core logic
- **Vite** - Bundling and dev server
- **Vitest** - Unit testing
- **Axios** - HTTP requests to Open Library API
- **SCSS** - Styling with variables, nesting, and media queries
- **Git** - Version control
- **Netlify** - Deployment


## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
git clone https://github.com/francesca/owly.git
cd owly
npm install
```

### Development

```bash
npm run dev #http://localhost:3000
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```


## Project structure

```bash
owly/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── img/
│   │   │   ├── png/
│   │   │   └── svg/
│   │   └── scss/
│   │       ├── _variables.scss
│   │       └── style.scss
│   ├── js/
│   │   ├── AppState.js
│   │   ├── OwlyModel.js
│   │   ├── OwlyView.js
│   │   ├── OwlyController.js
│   │   └── utils.js
│   └── main.js
├── tests/
│   ├── utils.test.js
│   └── OwlyModel.test.js
├── index.html
├── package.json
└── vite.config.js
```


## Architecture

The project follows the MVC (Model-View-Controller) pattern, combined with a Singleton for state management. 

API calls(Model), DOM manipulation (View), and user interaction (Controller) are isolated in different files. This makes the codebase easier to test, maintain and debug:

- **Model** (OwlyModel.js) - Handles all API communication with OpenLibrary. No DOM logic.
- **View** (OwlyView.js) - Renders the UI without calling the API directly.
- **Controller** (OwlyController.js) - Coordinates Model and View: listens user events, calls the API via Model and updates the View.
- **AppState** (AppState.js) - The singleton pattern ensures a single source of truth for shared state. Uses private fields with validation via getters/setters.


## Data Flow

```bash User -> Controller -> Model(API) -> Controller -> View(DOM) ```


## API Reference

The app uses the Open Library API (https://openlibrary.org/developers/api).

Search books by category - endpoint:
```bash
GET /subjects/{category}.json?limit=10&offset={offset}
```

Get book details - endpoint:
```bash
GET /works/{id}.json
```

Book cover images - endpoint:
```bash
https://covers.openlibrary.org/b/id/{cover_id}-M.jpg
```


## Testing

Unit tests are written with **Vitest**.

- utils.test.js - Tests for formatAuthors, extractDescription, generatePageNumber
- OwlyModel.test.js - Tests for searchByCategory and bookDetails with mocked Axios

All tests passing.

## Accessibility

- Semantic HTML
- In the modal: role="dialog", aria-modal="true", focus trap, Escape to close, focus restoration
- For pagination: aria-label on nav, aria-current="page", prev/next button labels
- In the search input: aria-label, visible focus indicators using :focus-visible
- Live region: aria-live="polite" on results for screen reader updates
- Image fallbacks: alt text with "Copertina di {title}"

## Author 

Francesca Franz

## AI used 

MiMo V2.5 on OpenCode in Terminal for study support. All the code has been implemented by the author.

## License

This project is licensed under the MIT License.