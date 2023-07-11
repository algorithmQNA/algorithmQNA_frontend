import React, { useEffect, useRef, useState } from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import { useQuery, useQueryClient } from 'react-query';
import { getHightlightCommentListRequest } from '../../apis/postApi';
import CommentWrapper from './CommentWrapper';
import CommentView from './CommentView/CommentView';

type PinnedCommentViewProps = {
  commentId: number;
  pid: number;
};

function PinnedCommentList({ commentId, pid }: PinnedCommentViewProps) {
  const [show, setShow] = useState(false);
  const [runEndAnimation, setRunEndAnimation] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClickViewBtn = () => {
    if (commentId > -1) {
      setShow(true);
      setRunEndAnimation(false);
    } else alert('채택된 답글이 없습니다!');
  };

  const { data, isLoading } = useQuery(
    ['highlight', +pid, +commentId],
    () => getHightlightCommentListRequest(+pid, +commentId),
    {
      enabled: show && commentId > -1 && show,
    }
  );

  const commentList = data?.data.data.commentList;

  useEffect(() => {
    const goToHightlight = () => {
      const pinnedElement = document.getElementById(`${commentId}`);
      if (pinnedElement) {
        pinnedElement.scrollIntoView({ behavior: 'smooth' });
        pinnedElement.style.backgroundColor = '#fffec9';
      }

      setTimeout(() => {
        if (pinnedElement) pinnedElement.style.backgroundColor = '';
      }, 800);
    };
    const timeoutId = setTimeout(goToHightlight, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, show]);

  return (
    <div>
      {commentId && (
        <div className="hover:scale-105 hover:-translate-x-2 hover:duration-100">
          <ButtonComponent onClick={handleClickViewBtn}>
            채택보기
          </ButtonComponent>
        </div>
      )}

      <section
        className={`h-screen w-full md:w-1/2 z-50 bg-white shadow-xl fixed top-0 right-0 duration-150 p-2 overflow-y-auto ${
          show ? 'translate-x-0' : 'translate-x-full'
        } `}
        onTransitionEnd={() => {
          if (runEndAnimation) {
            setRunEndAnimation(false);
            setShow(false);
          }
        }}
        ref={sectionRef}
      >
        <header className="sticky top-0 left-0">
          <p>채택된 답변</p>
          <button className="p-2 w-fit" onClick={() => setShow(false)}>
            닫기
          </button>
        </header>
        <div>
          {commentList?.map((comment) => (
            <CommentWrapper
              depth={comment.depth}
              key={`highlight-${comment.commentId}`}
            >
              <CommentView {...comment} />
            </CommentWrapper>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PinnedCommentList;
