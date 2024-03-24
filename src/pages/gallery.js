import React from 'react';
import '../App.css';
import Albums from '../elements/albums.js';
import '../styles/gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function PhotoGallery() {

  return (
    <div className="App">
      <body>
        <div className="main">
          <div>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <div style={{margin: '20px 0'}}><FontAwesomeIcon style={{marginRight: '5px'}} icon={faHouse} />Home</div>
              </NavLink>
            <Albums />
          </div>
        </div>
        
      </body>
    </div>
  );
}

export default PhotoGallery;
