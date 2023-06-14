import React from 'react';
import Controller from './Controller';
import CommentWrite from './CommentWrite';

function CommentSection() {
  return (
    <div className="w-full relative -top-[125px]">
      <section className="main-content px-4">
        <CommentWrite />
      </section>
      <Controller />
    </div>
  );
}

export default CommentSection;
