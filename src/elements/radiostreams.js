import React, { useState, useEffect } from 'react';
import '../styles/radio.css';

function RadioStreams() {
  const streams = [
    {
      url: 'https://radio.titsrp.com/homebass/',
      title: 'HomeBass',
      desc: 'Electronic & Dance',
      audio: null,
      color: '#83056a',
      img: 'https://titsrp.com/radio/static/media/bg_edm.6827fc0a35f3e1448105.jpg',
    },
    {
      url: 'https://radio.titsrp.com/thetrap/',
      title: 'THE TRAP',
      desc: 'Hip-Hop & RnB',
      audio: null,
      color: 'rgb(220, 83, 83)',
      img: 'https://titsrp.com/radio/static/media/bg_trap.fd3d728bd2eebc2e0ca8.jpg',
    },
    {
      url: 'https://radio.titsrp.com/thelounge/',
      title: 'The Lounge',
      desc: 'Chill & Pop Hits',
      audio: null,
      color: '#8c7be4',
      img: 'https://titsrp.com/radio/static/media/bg_lounge.3f148e31eb751dc3c0f4.jpg',
    },
    {
      url: 'https://radio.titsrp.com/thebasement/',
      title: 'The Basement',
      desc: 'Alternative',
      audio: null,
      color: '#888a8b',
      img: 'https://titsrp.com/radio/static/media/bg_basement.57def204798013bc1cac.jpg',
    },
    {
      url: 'https://radio.titsrp.com/brainfuel/',
      title: 'BrainFuel',
      desc: 'Hardstyle & Trance',
      audio: null,
      color: '#41b8d4',
      img: 'https://titsrp.com/radio/static/media/bg_brain.0c9d4f5430d8a873248a.jpg',
    },
  ];

  const [activeStream, setActiveStream] = useState(null);

  const playStream = (stream, title) => {
    if (activeStream) {
      if (activeStream == stream) {
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
        <div id={stream.title} onClick={() => playStream(stream.audio, stream.title)} style={{backgroundImage: `url(${stream.img}`}} className='StreamBlock' key={index}>
          <audio ref={(ref) => (stream.audio = ref)} preload="auto">
            <source src={stream.url} type="audio/mpeg" />
          </audio>
          <div className='StreamTitle' style={{background: `linear-gradient(90deg, ${stream.color}, transparent)`}}>
            {stream.title}
          </div>
          <div className='StreamDesc'>
            {stream.desc}
          </div>
          <div className='MusicBars' style={{ display: document.getElementById(stream.title)?.classList.contains("pulse") && 'inline-flex' || 'none' }}>

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