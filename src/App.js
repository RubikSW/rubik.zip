import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCode, faCodeBranch, faCamera, faPaperPlane, faHistory, faCodeCommit, faHand } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import React, { useRef, useEffect } from 'react';
import './App.css';
import me from './me.png'
import GitHubRepos from './utils/GitHub';
import BlogPosts from './utils/Blog';

function App() {

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

      <body>
        <div className="main">

          <div className='HeadBlock'>
            <div>
              <div id='links'>
                <a style={{ fontSize: '36px', fontWeight: '600' }}><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHand} />Hi, I'm Rubik</a>
                <nav>
                  <ul>
                    <a href="mailto:sbsrubik@outlook.com" target="_blank"><li><FontAwesomeIcon icon={faEnvelope} /></li></a>
                    <a href="https://discordapp.com/users/195929315899080705/" target="_blank" title="Contact me on Discord"><li><FontAwesomeIcon icon={faDiscord} /></li></a>
                    <a href="https://github.com/rubik7711" target="_blank" title="GitHub"><li><FontAwesomeIcon icon={faGithub} /></li></a>
                    <a href="https://rubik.zip/dev" target="_blank" title="Portfolio"><li><FontAwesomeIcon icon={faCode} /></li></a>
                  </ul>
                </nav>
              </div>
              <div id="headtext">
                <a style={{ fontSize: '19px', margin: '20px 0' }}>I see you've taken a leap of faith and opened <a id='GreenCode' style={{ color: '#8dffba' }}>rubik.zip</a></a>
                <a id="aboutme">I'm a self-taught programmer and web developer from the US. I started programming software and games full time in 2017. In my free time I enjoy listening to music and traveling as much as possible. If you need support for one of our game servers, please direct your inquires to Discord.</a>
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


          <div className="subs">
            <div>
              <h1><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faHistory} />History</h1>
              <div className="commits">
                <ul>
                  <li id='Code' ><span></span><div id='Code' className="origin-dev"><FontAwesomeIcon id="fa-dev" icon={faCodeBranch} /> 2023/dev</div> Owner at RUBIK S/W, LLC</li>
                  <li id='Code' ><span></span><div id='Code' className="origin-media"><FontAwesomeIcon id="fa-media" icon={faCamera} /> 2021/media</div> Technical Director at Nexstar Media Group, Inc</li>
                  <li id='Code' ><span></span><div id='Code' className="origin-dev"><FontAwesomeIcon id="fa-dev" icon={faCodeBranch} /> 2018/dev</div> Game Programmer & Web Developer at Solid Block Studios, LLC</li>
                  <li id='Code' ><span></span><div id='Code' className="origin-dev"><FontAwesomeIcon id="fa-dev" icon={faCodeBranch} /> 2009/dev</div> Full-Stack Web Developer at Real Life Plus, Inc.</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="blogfrm">
            <h1><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faPaperPlane} />Blog</h1>
            <BlogPosts username="rubiksw" />
          </div>

          <div id='projfrm'>
            <h1><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCodeCommit} /> Projects</h1>
            <GitHubRepos username="rubiksw" />
          </div>

        </div>


        <div className="footer">
          <i className="far fa-copyright"></i>
          <span>2023 | rubik.zip</span>
        </div>

      </body>

    </div>
  );
}

export default App;
