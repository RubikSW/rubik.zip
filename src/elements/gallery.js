import React, { useEffect, useState } from 'react';
import '../styles/gallery.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { NavLink } from 'react-router-dom';

function Gallery({ state, albumId }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (state === "preview" || state === "all") {
      const flickrApiKey = '23800984d654ba9afc70ae7d1440cabc';
      const getPhotosApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${flickrApiKey}&extras=original_format&format=json&nojsoncallback=1&photoset_id=${albumId}&per_page=10`;
      fetch(getPhotosApiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.photoset && data.photoset.photo) {
            const photoArray = data.photoset.photo;
            const photoUrls = photoArray.map(photo => {
              return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_o.${photo.originalformat}`;
            });
            setImages(photoUrls);
          }
        })
        .catch(error => {
          console.error("Error fetching images from Flickr API:", error);
        });
    }
  }, [state, albumId]);

  if (state === "preview") {
    const firstFiveImages = images.slice(0, 5);
    return (
      <div>
        <div className="preview-container">
          {firstFiveImages.map((imageUrl, index) => (
            <div key={index} className="preview-image">
              <div>
                <NavLink to="/gallery" style={{ textDecoration: 'none' }}>
                  <img src={imageUrl} alt={`${index + 1}`} loading="lazy" />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === "all") {
    const thumbnailItems = images.map((imageUrl, index) => ({
      original: imageUrl,
      thumbnail: imageUrl,
      loading: 'lazy',
    }));
    return (
      <div>
        <div className="preview-container" id='gallery'>
          <ImageGallery items={thumbnailItems} lazyLoad={true} thumbnailPosition='top' />
        </div>
      </div>
    );
  }
  return null;
}

export default Gallery;
