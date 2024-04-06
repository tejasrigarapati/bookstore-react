import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async (query) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes=${query}`);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchBooks(searchQuery);
    } else {
      fetchBooks('');
    }
  };
  return (
    <div className="Bookstore">
      <header>
        <h1>My Bookstore</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search for books..."  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <main>
        {books.map((book) => (
          <div key={book.id} className="book-card">
            {book.volumeInfo.imageLinks && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            )}
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
            <div className="buttons">
              <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                Read Now
              </a>
              <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;