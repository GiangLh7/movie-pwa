import React from 'react';
import Post from './post';
import PostAdd from './postadd';

const PostCategory = ({currentUser, posts, type, title, onAdd, onDelete, onLike, onUnlike, onEdit}) => (
  <div className="post-cat col-md-4 col-sm-12">
    <PostAdd onAdd={text => onAdd(type, text)} title={title} />
      {posts.map((post, index) => (
        <Post key={index}
              currentUser={currentUser}
              post={post}
              onDelete={onDelete}
              onLike={onLike}
              onDislike={onUnlike}
              onEdit={onEdit}
        />
      ))}
  </div>
);

export default PostCategory;