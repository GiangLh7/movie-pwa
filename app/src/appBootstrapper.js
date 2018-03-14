import React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import RootContainer from './container/root-container';

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
      <Router>
        <RootContainer />
      </Router>,
      document.getElementById('root')
    );
  }
}

new AppBootstrapper().run();