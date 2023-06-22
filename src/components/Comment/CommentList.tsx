import React, { useEffect, useRef } from 'react';
import CommentView from './CommentView/CommentView';
import useGetParams from '../../hooks/useGetParams';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPostRequest } from '../../apis/postApi';

import CommentWrapper from './CommentWrapper';
import { getCommentByPostid } from '../../apis/commentApi';
import MessageBox from '../MessageBox';
import CommentWrite from './CommentWrite';

/** 대댓글의 최대 depth 3*/

function CommentList() {
  // const datas = completeFlatten as never as CommentViewProps[];
  const queryClient = useQueryClient();
  const { pid = -1 } = useParams();
  const page = useGetParams('page') || 0;
  const entryPage = useRef<number | null>(null);

  useEffect(() => {
    entryPage.current = +page;
  }, []);

  //For comment api call dependent
  const { isFetching, isLoading } = useQuery(
    ['post-view', +pid],
    () => getPostRequest(+pid),
    {
      onSuccess: (res) => {
        const commentList = res.data.data.commentList || [];
        queryClient.setQueryData(['comment', +pid, +page], commentList);
        // 대댓글도 캐싱
        commentList.forEach((comment) => {
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
          }
        });
      },
    }
  );

  const { data: commentList } = useQuery({
    queryKey: ['comment', +pid, +page],
    queryFn: async ({ queryKey }) => {
      const pid = queryKey[1] as number;
      const page = queryKey[2] as number;
      const res = await getCommentByPostid({ postId: +pid, page: +page });
      return res.data.data.commentList;
    },
    refetchOnMount: true,
    enabled: !isFetching,
  });

  /** skeleton 적용 */
  if (isLoading) return <></>;

  if (!!commentList?.length)
    return (
      <section>
        <CommentWrite />
        {commentList.map((data, idx) => (
          <CommentWrapper depth={data.depth} key={`${data.commentId}${idx}`}>
            <CommentView {...data} />
          </CommentWrapper>
        ))}
      </section>
    );
  return (
    <section>
      <CommentWrite />
      <MessageBox msg={`🥲 댓글이 없어요! 댓글을 달아 지식을 공유해주세요`} />
    </section>
  );
}

export default CommentList;
