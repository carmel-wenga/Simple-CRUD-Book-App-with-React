import React from 'react';

import './statics/css/library.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/menu'

import LibRoutes from './components/routes';

function Library() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Library</h1>
      </header>
      <main> 
        <Menu />
        <LibRoutes />
      </main>
    </div>
  );
}

export default Library;
