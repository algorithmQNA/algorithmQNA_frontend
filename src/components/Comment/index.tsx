import React, { useEffect } from 'react';
import Controller from './Controller';
import CommentList from './CommentList';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getHightlightCommentListRequest } from '../../apis/postApi';
import HighlightStatusAtom from '../../storage/Highlight/Highlight';
import { useRecoilState } from 'recoil';

function CommentSection() {
  const [highlightSetting, setHighlightSetting] =
    useRecoilState(HighlightStatusAtom);
  const queryClient = useQueryClient();
  const { pid = 0 } = useParams();
  const location = useLocation();
  const commentId = location.state?.commentId || undefined;

  useEffect(() => {
    if (commentId)
      setHighlightSetting((prev) => ({
        ...prev,
        highlightingMode: true,
      }));
  }, [commentId, setHighlightSetting]);

  useEffect(() => {
    if (highlightSetting.highlightingMode && commentId) {
      const goToHightlight = () => {
        const pinnedElement = document.getElementById(`${commentId}`);
        if (pinnedElement) {
          pinnedElement.scrollIntoView({ behavior: 'smooth' });
          pinnedElement.style.backgroundColor = '#fffec9';
        }
        setHighlightSetting((prev) => ({ ...prev, highlightingMode: false }));
        setTimeout(() => {
          if (pinnedElement) pinnedElement.style.backgroundColor = '';
        }, 800);
      };
      setTimeout(goToHightlight, 200);
    }
  }, [highlightSetting.highlightingMode, commentId, setHighlightSetting]);

  const hasValidCommentId = !isNaN(+commentId);

  const { data } = useQuery(
    ['highlight', +pid, +commentId],
    () => getHightlightCommentListRequest(+pid, +commentId),
    {
      onSuccess: (res) => {
        const oneDepthCommentList = res.data.data.commentList || [];
        const page = res.data.data.page;
        queryClient.setQueryData(['comment', +pid, +page], oneDepthCommentList);
        oneDepthCommentList.forEach((comment) => {
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
                          // nextPage: comment?.page + 1,
                          // prevPage: comment?.page - 1,
                          // isLast: !comment.next,
                          // isFirst: !comment.prev,
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
        }));
      },
      enabled: hasValidCommentId,
    }
  );

  return (
    <div className="w-full relative -top-[125px]">
      <section className="main-content px-4">
        <CommentList />
      </section>
      <Controller />
    </div>
  );
}

export default CommentSection;
