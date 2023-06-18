import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { getSpreadCommentByCommentId } from '../../../apis/commentApi';
import CommentView from './CommentView';
import CommentWrapper from '../CommentWrapper';
import IconButton from '../../Button/IconButton';
import CommentSkeleton from './CommentSkeleton';

function ReplyComment({
  commentId,
  page = 0,
  commentMode = 'normal',
}: {
  commentId: number;
  page?: number;
  commentMode?: 'hightlight' | 'normal';
}) {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['reply', commentId],
    queryFn: async ({ pageParam = page }) => {
      const res = await getSpreadCommentByCommentId({
        commentId,
        page: pageParam,
      });
      const data = res.data.data;
      return {
        result: data.childCommentList || [],
        nextPage: pageParam + 1,
        prevPage: pageParam - 1,
        isLast: !data.next,
        isFirst: !data.prev,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) {
        return lastPage.nextPage;
      }
      return undefined; //더이상 로드X
    },
    getPreviousPageParam: (firstPage, pages) => {
      if (firstPage.isFirst) return undefined;
      return firstPage.prevPage;
    },
  });
  if (isLoading) return <CommentSkeleton />;
  return (
    <>
      {isFetchingPreviousPage && <div>...</div>}
      {hasPreviousPage && (
        <IconButton Icon={<></>} onClick={() => fetchPreviousPage()}>
          이전 댓글 불러오기
        </IconButton>
      )}
      {data?.pages.map((page) =>
        page.result.map((child) => (
          <CommentWrapper depth={child.depth} key={child.commentId}>
            <CommentView
              {...child}
              commentMode={commentMode}
              parentId={commentId}
            />
          </CommentWrapper>
        ))
      )}
      {hasNextPage && (
        <IconButton Icon={<></>} onClick={() => fetchNextPage()}>
          댓글 불러오기
        </IconButton>
      )}
      {isFetchingNextPage && <CommentSkeleton />}
    </>
  );
}

export default ReplyComment;
