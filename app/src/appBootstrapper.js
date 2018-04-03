import React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import RootContainer from './container/root-container';
import configureStore from './configureStore';

class AppBootstrapper {
  run() {
    this.startServices();
    this.store = configureStore({
      user: {
        name: 'gile'
      },
      board: {
        wellPosts: [
          {
            content: 'Gile comment',
            likes: ['dale', 'hungph', 'quantr'],
            dislikes: ['dale', 'hungph'],
            user: 'gile'
          },
          {
            content: 'Hung comment',
            likes: ['dale'],
            dislikes: ['gile'],
            user: 'hungph'
          }
        ],
        badPosts: [
          {
            content: 'Dale comment',
            likes: ['gile'],
            dislikes: [],
            user: 'dale'
          }
        ],
        couldBeBetterPosts: [
          {
            content: 'Quan comment',
            likes: [],
            dislikes: [],
            user: 'quantr'
          }
        ]
      }
    });
    this.displayUI();
  }
  
  startServices() {
  
  }
  
  displayUI() {
    const store = this.store;
    
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <RootContainer />
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  }
}

new AppBootstrapper().run();