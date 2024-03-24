import React, { useEffect, useState } from 'react';
import '../styles/gallery.css';
import Masonry from 'react-masonry-css';
import { NavLink } from 'react-router-dom';
import ImgWrapper from '../elements/ImgWrapper';

function Gallery({ state, albumId }) {
  const [images, setImages] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [ExpandedImageTitle, setExpandedImageTitle] = useState(null);

  useEffect(() => {
    if (state === "preview" || state === "all") {
      const flickrApiKey = '23800984d654ba9afc70ae7d1440cabc';
      const getPhotosApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${flickrApiKey}&extras=original_format&format=json&nojsoncallback=1&photoset_id=${albumId}&per_page=0`;

      fetch(getPhotosApiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.photoset && data.photoset.photo) {
            const photoArray = data.photoset.photo;
            const images = photoArray.map(photo => {
              const imgTitle = photo.title || '';
              const fullResUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_o.${photo.originalformat}`;
              const thumbnailUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_t.${photo.originalformat}`;
              const mediumUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_m.${photo.originalformat}`;
              return { fullRes: fullResUrl, thumbnail: thumbnailUrl, medium: mediumUrl, title: imgTitle };
            });
            setImages(images);
          }
        })
        .catch(error => {
          console.error("Error fetching images from Flickr API:", error);
        });
    }
  }, [state, albumId]);

  const handleImageClick = (url, title) => {
    setExpandedImage(url);
    setExpandedImageTitle(title)
  };

  const handleClose = () => {
    setExpandedImage(null);
  };

  if (state === "preview") {
    const firstFiveImages = images.slice(0, 4);
    return (
        <div className="preview-container">
          {firstFiveImages.map((img, index) => (
            <div key={index} className="preview-image">
              <div>
                <NavLink to="/gallery" style={{ textDecoration: 'none' }}>
                  <img src={img.medium} alt={`${index + 1}`} loading="lazy" />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
    );
  }

  if (state === "all") {
    const breakpointColumnsObj = {
      default: 3, // Number of columns at the default breakpoint
      1100: 3,   // Number of columns at 1100px and above
      700: 2,    // Number of columns at 700px and above
      500: 1     // Number of columns at 500px and above
    };

    const imageElements = images.map((img, index) => (
      <img
        style={{ cursor: 'zoom-in' }}
        key={index}
        src={expandedImage === img.fullRes ? img.fullRes : img.medium}
        alt={`${index + 1}`}
        loading='lazy'
        className="masonry-image"
        onClick={() => handleImageClick(img.fullRes, img.title)}
      />
    ));

    return (
      <div className="Gallery">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-column"
          >
            {imageElements}
          </Masonry>
          {expandedImage && <ImgWrapper url={expandedImage} title={ExpandedImageTitle} onClose={handleClose} />}
        </div>

    );
  }

  return null;
}

export default Gallery;
