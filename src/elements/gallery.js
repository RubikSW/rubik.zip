import React from 'react';
import '../styles/gallery.css';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { NavLink } from 'react-router-dom';

function Gallery({ state, album, imageContext }) {

  if (state === "preview") {
    const imageContext = require.context('/images/Urbex', false, /\.(png|jpg|jpeg|gif|svg)$/);
    const imagePaths = imageContext.keys();
    const firstFourImages = imagePaths.sort(() => Math.random() - 0.5).slice(0, 4);

    return (
      <div>
        <div className="preview-container">
          {firstFourImages.map((imagePath, index) => (
            <div key={index} className="preview-image">
              <div>
                <NavLink to="/gallery" style={{ textDecoration: 'none' }}>
                  <img src={imageContext(imagePath)} alt={`Image ${index + 1}`} loading="lazy" />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === "all") {
    const imagesInAlbum = (album && imageContext.keys().filter((key) => key.includes(album))) || imageContext.keys();
    const imagePaths = imagesInAlbum.map((key) => imageContext(key));

    const thumbnailItems = imagePaths.map((path) => ({
      original: path,
      thumbnail: path,
      loading: 'lazy',
    }));

    return (
      <div>
        <div className="preview-container" id='gallery'>
          <ImageGallery items={thumbnailItems} lazyLoad={true} thumbnailPosition='bottom' />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Gallery;
