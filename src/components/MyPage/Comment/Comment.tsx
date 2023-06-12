import React from 'react';
import MyPageTableRow from '../../TableRow/MyPageTableRow';
import Pagination from '../../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMyComments } from '../../../apis/authApi';

function Comment() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const myComments = useQuery(['mycomment', page], () => getMyComments(+page));
  const comments = myComments.data?.data.data;

  if (!!comments?.comments?.length)
    return (
      <div className="flex flex-col gap-2">
        {comments.comments.map((comment) => (
          <MyPageTableRow
            createdAt={comment.createdAt}
            postId={comment.commentId}
            postTitle={`${comment.postId}에 작성한 ${comment.commentId}번 댓글`}
            totalCommentCnt={1}
            views={0}
            comment={true}
            key={comment.commentId}
          />
        ))}

        <Pagination
          listLength={comments.size}
          postLength={comments.totalPageSize}
        />
      </div>
    );
  return <div>작성한 댓글이 없습니다.</div>;
}

export default Comment;
