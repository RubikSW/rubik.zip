import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PhotoGallery from './pages/gallery';

import './index.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<PhotoGallery />} />
      </Routes>
    );
  }
}