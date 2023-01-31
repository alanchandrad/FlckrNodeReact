import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`/search?query=${query}&page=${page}`);
      const data = await response.json();
      setImages(data.photos.photo);
      setTotalPages(data.photos.pages);
    };

    fetchImages();
  }, [query, page]);

  return (
    <div class="container" className='App'>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">AIA Test Program</h1>
      </header>
      <div class="row">
        <div class="col">
          <h4 class="text-white">a</h4>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
          <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <button type="button" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
          <h4 class="text-white">a</h4>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ul className="center">
            {images.map(image => (
              <div class="card" key={image.id} className="center" alt="Card image cap">
                <img src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} className="pictureClass" alt={image.title} />
                <div class="card-body">
                <p>{image.title}</p>
                <h6 class="text-white">a</h6>
              </div>
            </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;