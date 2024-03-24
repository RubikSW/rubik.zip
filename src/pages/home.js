import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCode, faCamera, faCodeCommit, faHand, faHeadphones, faTerminal, faMusic, faPlaneDeparture, faBlog } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import React from 'react';
import { NavLink } from 'react-router-dom';
import "@fontsource/ibm-plex-mono";
import '../App.css';
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
                <div className='roles' style={{ marginTop: '20px' }}>
                  <RoleIcon title="Programmer" ico={faTerminal} />
                  <RoleIcon title="Traveler" ico={faPlaneDeparture} />
                  <RoleIcon title="Audiophile" ico={faMusic} />
                  <NavLink to="/gallery" style={{ textDecoration: 'none' }}>
                    <RoleIcon title="Photographer" ico={faCamera} url="https://rubik.zip/gallery" />
                  </NavLink>
                  <RoleIcon title="Bug Hunter" ico={faDiscord} />

                </div>
              </div>
            </div>
          </div>
          <div id='section' className='GallerySection'>
            <NavLink to="/gallery" style={{ textDecoration: 'none' }}>
              <div className='head'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCamera} />Photo Gallery</div>
            </NavLink>
            <Gallery state="preview" albumId="72177720311627253" />
          </div>
          <div id='section'>
            <div className='RadioTitle'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHeadphones} /> <span className='RadioTitleInternal'>Radio Streams</span></div>
            <RadioStreams />
          </div>
          <div id='section'>
            <div className='head'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faBlog} />My Blog</div>
            <BlogPosts />
          </div>
          <div id='section'>
            <div className='head'><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCodeCommit} />Projects</div>
            <GitHubRepos username="rubiksw" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
