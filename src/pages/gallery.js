import React from 'react';
import '../App.css';
import Albums from '../elements/albums.js';
import '../styles/gallery.css';

function PhotoGallery() {

  return (
    <div className="App">
      <body>
        <div className="main">
          <div>
            <Albums />
          </div>
        </div>
        
      </body>
    </div>
  );
}

export default PhotoGallery;
