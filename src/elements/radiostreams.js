import React, { useState } from 'react';
import '../styles/radio.css';
import HomeBassImg from '../assets/homebass.jpg';
import TheTrapImg from '../assets/thetrap.jpg';
import LoungeImg from '../assets/thelounge.jpg';
import BasementImg from '../assets/basement.jpg';
import BrainfuelImg from '../assets/brainfuel.jpg';
import toast, { Toaster } from 'react-hot-toast';

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
  const playStream = (stream, title, index) => {
    const backgroundElements = document.querySelectorAll('.background');
    backgroundElements.forEach(element => {
      element.style.filter = 'blur(4px) saturate(0)';
    });

    document.getElementsByClassName('RadioTitleInternal')[0].innerText = `Radio`;

    if (activeStream) {
      if (activeStream === stream) {
        setActiveStream(false);
        activeStream.pause();
        return;
      }
      activeStream.pause();
    }

    setActiveStream(stream);

    toast.promise(stream.play(), {
      loading: (data) => {
        const message = `Loading: ${title}`;
        document.getElementsByClassName('RadioTitleInternal')[0].innerText = `Radio`;
        document.getElementsByClassName('background')[index].style.filter = 'blur(0px) saturate(1)';
        return message;
      },
      success: (data) => {
        const message = `Playing: ${title}`;
        document.getElementsByClassName('RadioTitleInternal')[0].innerText = `Radio - Now Playing: ${title}`;
        return message;
      },
      error: (data) => {
        const message = `Failed: ${title}`;
        document.getElementsByClassName('RadioTitleInternal')[0].innerText = `Radio`;
        document.getElementsByClassName('background')[index].style.filter = 'blur(4px) saturate(0)';
        return message;
      },
    });
  };


  return (
    <div className='RadioStreams'>
      {streams.map((stream, index) => (
        <div id={stream.title} onClick={() => playStream(stream.audio, stream.title, index)} className='StreamBlock' key={index}>
          <div className="background" style={{ backgroundImage: `url(${stream.img}` }}></div>
          <audio ref={(ref) => (stream.audio = ref)} preload="none">
            <source src={stream.url} type="audio/mpeg" />
          </audio>
          <div className='StreamTitle'>
            {stream.title} <span style={{ fontSize: '14px', fontWeight: '300', top: '-2px', position: 'relative' }}>{stream.desc}</span>
          </div>
        </div>
      ))}

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#36383d',
            border: '1px solid #ffffff24',
            boxShadow: '0 0 20px #00000063',
            color: 'white'
          },
        }}

      />

    </div>
  );
}

export default RadioStreams;