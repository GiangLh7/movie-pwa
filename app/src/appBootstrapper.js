import React from 'react';
import * as ReactDOM from 'react-dom';
import MovieService from './services/movie.service';

class AppBootstrapper {
  run() {
    this.startServices();
    //this.store = configureStore();
    this.displayUI();
  }
  
  startServices() {
  
  }
  
  displayUI() {
    const store = this.store;
    
    ReactDOM.render(
      <div>
        Hello world
      </div>,
      document.getElementById('root')
    );
  }
}

const shouldRunBootstrapped = location.pathname === '/' && location.hash.length === 0;
if (shouldRunBootstrapped) {
  new AppBootstrapper().run();
}