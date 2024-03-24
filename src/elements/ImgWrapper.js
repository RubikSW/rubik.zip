import React, { useState, useEffect, useRef } from 'react';

function ImgWrapper({ url, title, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const imgWrapperRef = useRef(null);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isVisible && imgWrapperRef.current && !imgWrapperRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible]);

  useEffect(() => {
    const img = new Image();
    img.src = url;
  }, [url]);

  if (url && isVisible) {
    return (
      <div className='ImgWrapper'>
        <div id='imgWrapperFrm' ref={imgWrapperRef}>
          <div id='head'>
            <span>{title.substring(0,26)}</span>
            <span onClick={handleClose} style={{ cursor: 'pointer' }}>X </span>
          </div>
          <img src={url} alt="Expanded" />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ImgWrapper;
