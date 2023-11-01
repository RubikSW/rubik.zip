import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCode, faCamera, faCodeCommit, faHand, faHeadphones, faGamepad, faTerminal, faHeadset, faMusic, faPlaneDeparture, faVideoCamera, faBlog } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "@fontsource/ibm-plex-mono";
import '../App.css';
import me from '../me.png'
import RadioStreams from '../elements/radiostreams';
import RoleIcon from '../elements/role';
import GitHubRepos from '../utils/GitHub';
import BlogPosts from '../utils/Blog';
import Gallery from '../elements/gallery.js';

function Home() {
  return (
    <div className="App">
      <div className="MainFrame">
        <div className="main">
          <div className='HeadBlock'>
            <div style={{ width: '100%' }}>
              <div id='links'>
                <span style={{ fontSize: '20px' }}><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHand} />Hi, I'm Rubik</span>
                <nav>
                  <ul>
                    <a href="mailto:sbsrubik@outlook.com" target="_blank" rel="noreferrer"><li><FontAwesomeIcon icon={faEnvelope} /></li></a>
                    <a href="https://discordapp.com/users/195929315899080705/" target="_blank" rel="noreferrer" title="Contact me on Discord"><li><FontAwesomeIcon icon={faDiscord} /></li></a>
                    <a href="https://github.com/RubikSW" target="_blank" rel="noreferrer" title="GitHub"><li><FontAwesomeIcon icon={faGithub} /></li></a>
                    <a href="https://rubik.zip/dev" target="_blank" rel="noreferrer" title="Portfolio"><li><FontAwesomeIcon icon={faCode} /></li></a>
                  </ul>
                </nav>
              </div>
              <div id="headtext">
                <span style={{ fontSize: '17px', margin: '20px 0' }}>I see you've taken a leap of faith and opened <span id='GreenCode' style={{ color: '#8dffba' }}>rubik.zip</span>.
                  You may use, copy or modify any of my photos or github projects for non-commercial purposes. I can be reached via Discord, or by email at sbsrubik@outlook.com
                </span>
                <div className='roles'>
                  <RoleIcon title="Server Owner" ico={faGamepad} />
                  <RoleIcon title="Programmer" ico={faTerminal} />
                  <RoleIcon title="Bug Hunter" ico={faDiscord} />
                  <RoleIcon title="Gamer" ico={faHeadset} url="https://steamcommunity.com/id/hitlher" />
                  <RoleIcon title="Audiophile" ico={faMusic} />
                  <RoleIcon title="Traveler" ico={faPlaneDeparture} />
                  <RoleIcon title="Photographer" ico={faCamera} url="https://rubik.zip/gallery" />
                  <RoleIcon title="Technical Director" ico={faVideoCamera} />
                </div>
              </div>
            </div>
          </div>
          <div id='section' className='GallerySection'>
            <NavLink to="/gallery" style={{ textDecoration: 'none' }}>
              <div className='head'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCamera} /> Gallery</div>
            </NavLink>
            <Gallery state="preview" albumId="72177720312330726" />
          </div>
          <div id='section'>
            <div className='RadioTitle'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHeadphones} title='Continuous audio streams using Icecast & ffmpeg running as a PM2 process.' /> Radio</div>
            <RadioStreams />
          </div>
          <div id='section'>
            <div className='head'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faBlog} /> Blog</div>
            <BlogPosts />
          </div>
          <div id='section'>
            <div className='head'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCodeCommit} /> Projects</div>
            <GitHubRepos username="rubiksw" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
