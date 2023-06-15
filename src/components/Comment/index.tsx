import React from 'react';
import Controller from './Controller';
import CommentWrite from './CommentWrite';
import CommentView from './CommentView/CommentView';
import CommentList from './CommentList';

function CommentSection() {
  return (
    <div className="w-full relative -top-[125px]">
      <section className="main-content px-4">
        <CommentWrite />
        <CommentList />
        {/* <CommentView></CommentView> */}
      </section>
      <Controller />
    </div>
  );
}

export default CommentSection;
