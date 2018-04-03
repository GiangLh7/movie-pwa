import React, {Component} from 'react';
import PostCategory from './postcategory';
import {connect} from 'react-redux';
import noop from 'lodash/noop';

const stateToProps = state => ({
  currentUser: state.user.name,
  wellPosts: state.board.wellPosts,
  badPosts: state.board.badPosts,
  couldBeBetterPosts: state.board.couldBeBetterPosts
});

const actionsToProps = dispatch => ({
  addPost: noop,
  deletePost: noop,
  like: noop,
  dislike: noop,
  editPost: noop
});

class PostBoard extends Component {
  constructor(props) {
    super(props);
    this.renderColumn = this.renderColumn.bind(this);
  }
  
  renderColumn(postCat, index) {
   return (
     <PostCategory key={index}
                   title={postCat.title}
                   posts={postCat.posts}
                   currentUser={this.props.currentUser}
                   type={postCat.type}
                   onAdd={this.props.addPost}
                   onDelete={this.props.deletePost}
                   onLike={this.props.like}
                   onUnlike={this.props.dislike}
                   onEdit={this.props.editPost}
     />
   );
  }
  
  render() {
    const {wellPosts, badPosts, couldBeBetterPosts} = this.props;
    const types = [
      {
        type: 'good',
        posts: wellPosts,
        title: 'What went well?'
      },
      {
        type: 'bad',
        posts: badPosts,
        title: 'What went bad?'
      },
      {
        type: 'couldBeBetter',
        posts: couldBeBetterPosts,
        title: 'What could be improved?'
      }
    ];
    
    return (
      <div className="row">
        {
          types.map(this.renderColumn)
        }
      </div>
    )
  }
}

export default connect(stateToProps, actionsToProps)(PostBoard);