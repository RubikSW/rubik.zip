

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/gallery.css';
import Gallery from './gallery';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumThumbnails, setAlbumThumbnails] = useState({});

  useEffect(() => {
    const flickrApiKey = '23800984d654ba9afc70ae7d1440cabc';
    const getPhotosetsApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${flickrApiKey}&user_id=50712197@N03&format=json&nojsoncallback=1`;
    fetch(getPhotosetsApiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.photosets && data.photosets.photoset) {
          setAlbums(data.photosets.photoset);
          setSelectedAlbum(data.photosets.photoset[0].id);
        }
      })
      .catch(error => {
        console.error("Error fetching albums from Flickr API:", error);
      });
  }, []);

  const setFirstImageAsThumbnail = (albumId) => {
    const flickrApiKey = '23800984d654ba9afc70ae7d1440cabc';
    const getAlbumThumbnailApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${flickrApiKey}&format=json&nojsoncallback=1&photoset_id=${albumId}&per_page=1`;
    fetch(getAlbumThumbnailApiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.photoset && data.photoset.photo && data.photoset.photo[0]) {
          const thumbnailPhoto = data.photoset.photo[0];
          const thumbnailUrl = `https://farm${thumbnailPhoto.farm}.staticflickr.com/${thumbnailPhoto.server}/${thumbnailPhoto.id}_${thumbnailPhoto.secret}_m.jpg`;
          setAlbumThumbnails(prevThumbnails => ({
            ...prevThumbnails,
            [albumId]: thumbnailUrl,
          }));
        }
      })
      .catch(error => {
        console.error("Error fetching album thumbnail from Flickr API:", error);
      });
  };

  useEffect(() => {
    albums.forEach(album => {
      setFirstImageAsThumbnail(album.id);
    });
  }, [albums]);

  return (
    <div>
      <div className='GalleryBody'>

          <div className="AlbumsFrame">
            <span className='AlbumsHead'><FontAwesomeIcon style={{marginRight: '5px'}} icon={faPhotoFilm} />Albums</span>
            <div className="albumsList">
              {albums.map((album, index) => (
                <div
                  key={index}
                  className="preview-image" id='albums'
                  onClick={() => {
                    setSelectedAlbum(album.id);
                  }}
                >
                  <div>
                    <span className='image-caption'>{album.title._content}</span>
                    {albumThumbnails[album.id] && (
                      <img
                        src={albumThumbnails[album.id]}
                        alt={`Thumbnail for ${album.title._content}`}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

                      
          <div className="GalleryFrame">
            <div className='GalleryText'>
              {selectedAlbum && <span>{albums.find(album => album.id === selectedAlbum).title._content}</span>}
            </div>
            <Gallery state="all" albumId={selectedAlbum} />
          </div>


      </div>
    </div>
  );
}

export default Albums;
