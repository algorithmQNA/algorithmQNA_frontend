import React, { MouseEventHandler } from 'react';
import CommentList from '../components/CommentView/CommentList';
import CommentView from '../components/CommentView/Comment';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPostRequest } from '../apis/postApi';

function CommentTest() {
  const { postId } = useParams();
  const selectedComment = -1;
  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => {
      if (postId) return getPostRequest(+postId);
      return getPostRequest(2000);
    },
    onSuccess: (t) => console.log(t),
  });

  const marginLeft: { [key: string]: string } = {
    0: 'ml-0',
    1: 'ml-6',
    2: 'ml-12',
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    window.history.replaceState(
      null,
      '',
      'http://localhost:3000/comment/2000?3000'
    );
  };

  if (data?.data.comments) {
    return (
      <>
        <button onClick={handleClick}>채택된 답변으로</button>
        <div className="w-full p-4 flex flex-col">
          {data.data.comments.map((t) => {
            return t.isPinned ? (
              <div className="order-first mb-4 ">
                <div className="border-b-2 border-secondary text-secondary text-sm">
                  질문자 채택
                </div>
                <CommentView {...t} key={t.commentId} />
              </div>
            ) : (
              <div className={`${marginLeft[t.depth]}`}>
                <CommentView {...t} key={t.commentId} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return <div>잘못된 페이지입니다</div>;
}

export default CommentTest;
