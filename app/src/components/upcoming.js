import React, {Component} from 'react';
import PostBoard from '../components/posts/postboard';

class Upcoming extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="">
        <PostBoard />
      </div>
    );
  }
}

export default Upcoming;