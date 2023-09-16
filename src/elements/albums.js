// Albums.js
import React, { useState, useEffect } from 'react';
import '../styles/gallery.css';
import Gallery from './gallery';

function Albums() {
  const imageContext = require.context('../../images', true, /\.(png|jpg|jpeg|gif|svg)$/);

  const folderNames = imageContext.keys().map((key) => {
    const folderPath = key.split('/').slice(1, -1).join('/');
    return folderPath;
  });

  const uniqueFolderNames = [...new Set(folderNames)];
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumThumbnails, setAlbumThumbnails] = useState({});

  const setRandomThumbnail = (folderName) => {
    const imagesInFolder = imageContext.keys().filter((key) => key.includes(folderName));
    const randomImage = imagesInFolder[Math.floor(Math.random() * imagesInFolder.length)];
    setAlbumThumbnails((prevThumbnails) => ({
      ...prevThumbnails,
      [folderName]: randomImage,
    }));
  };

  useEffect(() => {
    uniqueFolderNames.forEach((folderName) => {
      setRandomThumbnail(folderName);
    });
  }, []);

  return (
    <div>
      <div className="preview-container">
        {uniqueFolderNames.map((folderName, index) => (
          <div
            key={index}
            className="preview-image"
            onClick={() => {
              setSelectedAlbum(folderName);
            }}
          >
            <div>
              <span className='image-caption'>{folderName}</span>
              {albumThumbnails[folderName] && (
                <img
                  src={imageContext(albumThumbnails[folderName])}
                  alt={`Thumbnail for ${folderName}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <Gallery state="all" album={selectedAlbum} imageContext={imageContext} />
    </div>
  );
}

export default Albums;
