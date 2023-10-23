import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCode, faCodeBranch, faCamera, faPaperPlane, faHistory, faCodeCommit, faHand, faHeadphones, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "@fontsource/ibm-plex-mono";

import '../App.css';
import me from '../me.png'
import RadioStreams from '../elements/radiostreams';
import GitHubRepos from '../utils/GitHub';
import Gallery from '../elements/gallery.js';

function Home() {

  const constrain = 3;
  const ex1LayerRef = useRef(null);

  const transforms = (x, y, el) => {
    const imageRect = el.getBoundingClientRect();
    const imageCenterX = imageRect.left + imageRect.width / 2;
    const imageCenterY = imageRect.top + imageRect.height / 2;
    const deltaX = x - imageCenterX;
    const deltaY = y - imageCenterY;

    const calcX = -(deltaY / imageRect.height) * constrain;
    const calcY = (deltaX / imageRect.width) * constrain;

    return `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
  };

  const transformElement = (el, x, y) => {
    if (!el) return;
    el.style.transform = transforms(x, y, el);
  };

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    transformElement(ex1LayerRef.current, x, y);
  };

  useEffect(() => {
    if (window.innerWidth > 1145) { document.addEventListener('mousemove', handleMouseMove) }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className="App">

      <div className="MainFrame">

        <div className="main">

          <div className='HeadBlock'>
            <div style={{ width: '100%' }}>
              <div id='links'>
                <a style={{ fontSize: '36px', fontWeight: '600' }}><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHand} />Hi, I'm Rubik</a>
                <nav>
                  <ul>
                    <a href="mailto:sbsrubik@outlook.com" target="_blank"><li><FontAwesomeIcon icon={faEnvelope} /></li></a>
                    <a href="https://discordapp.com/users/195929315899080705/" target="_blank" title="Contact me on Discord"><li><FontAwesomeIcon icon={faDiscord} /></li></a>
                    <a href="https://github.com/RubikSW" target="_blank" title="GitHub"><li><FontAwesomeIcon icon={faGithub} /></li></a>
                    <a href="https://rubik.zip/dev" target="_blank" title="Portfolio"><li><FontAwesomeIcon icon={faCode} /></li></a>
                  </ul>
                </nav>
              </div>
              <div id="headtext">
                <a style={{ fontSize: '19px', margin: '20px 0' }}>I see you've taken a leap of faith and opened <span id='GreenCode' style={{ color: '#8dffba' }}>rubik.zip</span>.
                  You may use, copy or modify any of my photos or github projects for non-commercial purposes. I can be reached via Discord, or by email at sbsrubik@outlook.com
                </a>
              </div>



            </div>


            <div id="ex1" onMouseMove={handleMouseMove}>
              <div ref={ex1LayerRef} id="ex1-layer">
                <div className="avatar">
                  <img src={me}></img>
                </div>
              </div>
            </div>

          </div>

          <div id='section'>
            <NavLink to="/gallery" style={{ textDecoration: 'none' }}>
              <h1><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCamera} /> Gallery</h1>
            </NavLink>
            <Gallery state="preview" albumId="72157719558194921" />
          </div>

          <div id='section'>
            <h1 className='RadioTitle'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHeadphones} title='Continuous audio streams using Icecast & ffmpeg running as a PM2 process.' /> Radio</h1>
            <RadioStreams />
          </div>

          <div id='section'>
            <h1><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCodeCommit} /> Projects</h1>
            <GitHubRepos username="rubiksw" />
          </div>

        </div>


       

      </div>

    </div>
  );
}

export default Home;
