import React from 'react';
import { FaRegSadTear } from 'react-icons/fa';

function NoBadges() {
  return (
    <div className="flex flex-col min-h-[600px] items-center justify-center">
      <p className="text-slate-50">아직 획득한 뱃지가 없어요</p>
      <FaRegSadTear size={200} fill={'#EEEEEE'} />
      <article>
        뱃지 획득은 이렇게 할 수 있어요!
        <ol
          className="list-decimal list-inside"
          style={{ listStyle: 'decimal' }}
        >
          <li>댓글을 50개 이상 작성</li>
          <li>게시글을 50개 이상 작성</li>
          <li>좋아요를 50개 이상 획득</li>
        </ol>
      </article>
    </div>
  );
}

export default NoBadges;
