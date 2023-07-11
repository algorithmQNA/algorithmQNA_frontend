import React, { useEffect, useRef, useState } from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import { useQuery, useQueryClient } from 'react-query';
import { getHightlightCommentListRequest } from '../../apis/postApi';
import CommentWrapper from './CommentWrapper';
import CommentView from './CommentView/CommentView';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import HighlightStatusAtom from '../../storage/Highlight/Highlight';
import { GENERAL_COMMENT, PINNED_COMMENT } from '../../constants/CommentType';

type PinnedCommentViewProps = {
  commentId: number;
  pid: number;
};

function PinnedCommentList({ commentId, pid }: PinnedCommentViewProps) {
  const [show, setShow] = useState(false);
  const [runEndAnimation, setRunEndAnimation] = useState(false);
  const [, setHighlightSetting] = useRecoilState(HighlightStatusAtom);
  const queryClient = useQueryClient();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClickViewBtn = () => {
    if (commentId > -1) {
      setShow(true);
      setRunEndAnimation(false);
    } else alert('채택된 답글이 없습니다!');
  };

  const { data: commentList, isLoading } = useQuery(
    ['pin', +pid, +commentId],
    async () => {
      const res = await getHightlightCommentListRequest(+pid, +commentId);
      return res.data.data.commentList.reverse();
    },
    {
      onSuccess: (data) => {
        console.log('SUCCESS', data);
        data.forEach((comment) => {
          if (!!comment.childSize) {
            queryClient.setQueryData(['reply', +comment.commentId], (prev) => {
              return {
                pages: [
                  {
                    result: [...(comment.childCommentList as [])],
                    nextPage: 1,
                    prevPage: -1,
                    isLast: !comment.next,
                    isFirst: !comment.prev,
                  },
                ],
                pageParams: 0,
              };
            });

            comment.childCommentList?.forEach((comment) => {
              if (!!comment.childSize) {
                queryClient.setQueryData(
                  ['reply', +comment.commentId],
                  (prev) => {
                    return {
                      pages: [
                        {
                          result: [...(comment.childCommentList as [])],
                          nextPage: 1,
                          prevPage: -1,
                          isLast: false,
                          isFirst: true,
                        },
                      ],
                    };
                  }
                );
              }
            });
          }
        });
        setHighlightSetting((prev) => ({
          ...prev,
          highlightingMode: true,
          commentType: PINNED_COMMENT,
        }));
      },
      enabled: show && commentId > -1,
    }
  );

  useEffect(() => {
    const goToHightlight = () => {
      if (show && !isLoading) {
        const pinnedElement = document.getElementById(`PIN-${commentId}`);
        if (pinnedElement) {
          pinnedElement.scrollIntoView({ behavior: 'smooth' });
          pinnedElement.style.backgroundColor = '#fffec9';
        }

        setTimeout(() => {
          if (pinnedElement) pinnedElement.style.backgroundColor = '';
          setHighlightSetting((prev) => ({
            ...prev,
            highlightingMode: false,
            commentType: GENERAL_COMMENT,
          }));
        }, 800);
      }
    };
    const timeoutId = setTimeout(goToHightlight, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, show, commentId]);

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
        className={`h-screen w-full md:w-3/4 lg:w-1/2  bg-white shadow-xl fixed top-0 right-0 duration-150 z-50s overflow-y-auto ${
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
        <div className="sticky flex justify-between items-center top-0 left-0 border-b p-2 z-[1000] bg-white">
          <p className="font-semibold">채택된 답변</p>
          <button className="w-fit" onClick={() => setShow(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-2">
          {commentList?.map((comment) => (
            <CommentWrapper
              depth={comment.depth}
              key={`highlight-${comment.commentId}`}
            >
              <CommentView {...comment} commentType="PIN" />
            </CommentWrapper>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PinnedCommentList;
