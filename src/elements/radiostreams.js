import React, { useState } from 'react';
import '../styles/radio.css';
import HomeBassImg from '../assets/homebass.jpg';
import TheTrapImg from '../assets/thetrap.jpg';
import LoungeImg from '../assets/thelounge.jpg';
import BasementImg from '../assets/basement.jpg';
import BrainfuelImg from '../assets/brainfuel.jpg';

function RadioStreams() {
  const streams = [
    {
      url: 'https://radio.titsrp.com/homebass/',
      title: 'HomeBass',
      desc: 'Electronic',
      audio: null,
      color: '#83056a',
      img: HomeBassImg,
    },
    {
      url: 'https://radio.titsrp.com/thetrap/',
      title: 'The Trap',
      desc: 'Hip-Hop & RnB',
      audio: null,
      color: 'rgb(220, 83, 83)',
      img: TheTrapImg,
    },
    {
      url: 'https://radio.titsrp.com/thelounge/',
      title: 'The Lounge',
      desc: 'Chill & Pop Hits',
      audio: null,
      color: '#8c7be4',
      img: LoungeImg,
    },
    {
      url: 'https://radio.titsrp.com/thebasement/',
      title: 'The Basement',
      desc: 'Alternative',
      audio: null,
      color: '#888a8b',
      img: BasementImg,
    },
    {
      url: 'https://radio.titsrp.com/brainfuel/',
      title: 'BrainFuel',
      desc: 'Hardstyle & Trance',
      audio: null,
      color: '#41b8d4',
      img: BrainfuelImg,
    },
  ];

  const [activeStream, setActiveStream] = useState(null);

  const playStream = (stream, title) => {
    if (activeStream) {
      if (activeStream === stream) {
        setActiveStream(false)
        activeStream.pause();
        const Pulses = document.querySelectorAll('.pulse');
        Pulses.forEach(element => {
          element.classList.remove('pulse');
        });
        return
      }
      activeStream.pause();
    }
    const Pulses = document.querySelectorAll('.pulse');
    Pulses.forEach(element => {
      element.classList.remove('pulse');
    });
    stream.play();
    setActiveStream(stream);
    document.getElementById(title).classList.add("pulse");
  };
  
  return (
    <div className='RadioStreams'>
      {streams.map((stream, index) => (
        <div id={stream.title} onClick={() => playStream(stream.audio, stream.title)} className='StreamBlock' key={index}>
          <div className="background" style={{backgroundImage: `url(${stream.img}`}}></div>
          <audio ref={(ref) => (stream.audio = ref)} preload="none" crossOrigin="anonymous">
            <source src={stream.url} type="audio/mpeg" />
          </audio>
          <div className='StreamTitle'>
            {stream.title} <span style={{fontSize:'10px', fontWeight:'200', top: '-2px',position:'relative'}}>{stream.desc}</span>
          </div>
          <div className='MusicBars' style={{ display: (document.getElementById(stream.title)?.classList.contains("pulse") && 'inline-flex') || 'none' }}>

            {Array.apply(null, { length: 25 }).map((e, i) => (
              <span />
            ))}

          </div>
        </div>
      ))}
    </div>
  );
}

export default RadioStreams;