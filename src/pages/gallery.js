import React from 'react';
import '../App.css';
import Albums from '../elements/albums.js';
import '../styles/gallery.css';

function PhotoGallery() {

  return (
    <div className="App">
      <body>
        <div className="main">
          <div id='section'>
            <Albums />
          </div>
        </div>
        <div className="footer">
          <i className="far fa-copyright"></i>
          <span>2023 | rubik.zip</span>
        </div>
      </body>
    </div>
  );
}

export default PhotoGallery;
