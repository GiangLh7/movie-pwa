import React from 'react';
import PropTypes from 'prop-types';
import EditableLabel from '../common/EditLabel';
import noop from 'lodash/noop';

const canVote = (post, currentUser) => {
  return post.likes.indexOf(currentUser) === -1 &&
    post.dislikes.indexOf(currentUser) === -1 &&
    post.user !== currentUser;
}

const canEdit = (post, currentUser) => {
  return post.user === currentUser;
};

const renderVoteButton = (post, currentUser, type, iconClass, onClick) => {
  const canUserVote = canVote(post, currentUser);
  const votes = post[type].length;
  const label = votes ? votes.toString() : '-';
  const visible = canUserVote || votes > 0;
  if (!visible) {
    return null;
  }
  return (
    <button className={`btn m-1 ${canUserVote? '' : 'disabled'}`} onClick={onClick}>
      <span className={iconClass}></span>
      {label}
    </button>
  );
};

const renderDeleteButton = (post, currentUser, onDelete, strings) => {
  if (currentUser === post.user) {
    return (
      <button className="btn m-1" onClick={onDelete}>
        <span className="oi oi-trash"></span>
        {strings.deleteButton}
      </button>
    );
  }
  return null;
};

const Post = ({post, currentUser, onEdit, onLike, onDislike, onDelete, strings}) => (
  
    <div className="card m-3">
      <div className="card-body">
        <p className="card-text">
          <EditableLabel value={post.content}
                         readOnly={!canEdit(post, currentUser)}
                         placeholder={strings.noContent}
                         onChange={editedContent => onEdit(post, editedContent)}/>
        </p>
        {renderVoteButton(post, currentUser, 'likes', 'oi oi-thumb-up', onLike)}
        {renderVoteButton(post, currentUser, 'dislikes', 'oi oi-thumb-down', onDislike)}
        {renderDeleteButton(post, currentUser, onDelete, strings)}
      </div>
    </div>
  
);

Post.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  OnDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
  strings: PropTypes.object
};

Post.defaultProps = {
  post: null,
  currentUser: null,
  onDelete: noop,
  onEdit: noop,
  onLike: noop,
  onDislike: noop,
  strings: {
    deleteButton: 'Delete',
    noContent: 'This post has no content'
  }
};

export default Post;