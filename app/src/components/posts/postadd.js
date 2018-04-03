import React from 'react';

const PostAdd = ({onAdd, title}) => (
  <div className="form-group">
    <label htmlFor="post_comment">{title}</label>
    <input type="text" className="form-control" name="post_comment" placeholder="New comment" onChange={onAdd} />
  </div>
);

export default PostAdd;
