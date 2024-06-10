import React, { useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import './BookSearch.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const BookSearch = ({ onAddToBookshelf }) => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const[loading,setloading]=useState();

    const handleSearch = async () => {
        if (query) {
            setloading(true);
            const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
            setBooks(response.data.docs);
            setloading(false);
        } else {
            setBooks([]);
        }
    };

    return (
        <div>
            <h2 className='heading'>Search By Book Name</h2>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for books..." 
            />
            <button onClick={handleSearch} className="search-Button"><FontAwesomeIcon icon={faSearch} /></button>
            {
                  loading ? (<>Loading...</>) :(<div className="book-results">
                  {books.map(book => (
                      <BookCard key={book.key} book={book} onAddToBookshelf={onAddToBookshelf} />
                  ))}
              </div>)
            }
        </div>
    );
};

export default BookSearch;
