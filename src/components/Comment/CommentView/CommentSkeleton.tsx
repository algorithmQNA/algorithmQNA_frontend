import React from 'react';

function CommentSkeleton() {
  const count = [1, 2, 3, 4, 5];
  return (
    <div className="w-full flex flex-col my-4 gap-4">
      {count.map((t) => (
        <div className={`w-full h-[200px] border border-border`} key={t}>
          <div className="bg-box-bg border p-4 border-border"></div>
          <div className="flex flex-col h-[70%] gap-4 p-4 animate-pulse">
            <p className="bg-gray-200 w-[100%] h-[70%] rounded-lg"></p>
            <p className="bg-gray-200 w-[10%] h-[30%] rounded-lg"></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentSkeleton;
